/**
 * WordPress to Next.js Migration Script
 * کرمان هاتف ارتباط
 *
 * This script migrates data from WordPress database to Prisma/PostgreSQL
 *
 * Usage:
 * 1. Set up environment variables in .env file
 * 2. Run: npx ts-node scripts/migrate-wordpress.ts
 *
 * Required environment variables:
 * - WP_DB_HOST: WordPress database host
 * - WP_DB_USER: WordPress database username
 * - WP_DB_PASSWORD: WordPress database password
 * - WP_DB_NAME: WordPress database name
 * - WP_TABLE_PREFIX: WordPress table prefix (default: wp_)
 * - DATABASE_URL: Prisma PostgreSQL connection string
 */

import mysql from 'mysql2/promise'
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

// Configuration
const config = {
  wordpress: {
    host: process.env.WP_DB_HOST || 'localhost',
    user: process.env.WP_DB_USER || 'root',
    password: process.env.WP_DB_PASSWORD || '',
    database: process.env.WP_DB_NAME || 'wordpress',
    tablePrefix: process.env.WP_TABLE_PREFIX || 'wp_',
  },
  mediaPath: process.env.WP_MEDIA_PATH || '/var/www/html/wp-content/uploads',
  outputPath: './public/images',
}

const prisma = new PrismaClient()

// Helper to convert Persian/Arabic digits to English
function toEnglishDigits(str: string): string {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

  let result = str
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(persianNumbers[i], 'g'), i.toString())
    result = result.replace(new RegExp(arabicNumbers[i], 'g'), i.toString())
  }
  return result
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Clean HTML content
function cleanHtml(html: string): string {
  if (!html) return ''

  // Remove WordPress shortcodes
  let cleaned = html.replace(/\[.*?\]/g, '')

  // Clean up extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()

  return cleaned
}

// Extract featured image from post meta
async function getFeaturedImage(
  wpConnection: mysql.Connection,
  postId: number
): Promise<string | null> {
  const prefix = config.wordpress.tablePrefix

  const [rows] = await wpConnection.execute<mysql.RowDataPacket[]>(
    `SELECT p.guid FROM ${prefix}posts p
     INNER JOIN ${prefix}postmeta pm ON p.ID = pm.meta_value
     WHERE pm.post_id = ? AND pm.meta_key = '_thumbnail_id'`,
    [postId]
  )

  if (rows.length > 0 && rows[0].guid) {
    // Convert WordPress URL to local path
    const url = rows[0].guid as string
    const filename = path.basename(url)
    return `/images/products/${filename}`
  }

  return null
}

// Migrate Categories
async function migrateCategories(wpConnection: mysql.Connection) {
  console.log('📁 Migrating categories...')
  const prefix = config.wordpress.tablePrefix

  const [rows] = await wpConnection.execute<mysql.RowDataPacket[]>(
    `SELECT t.term_id, t.name, t.slug, tt.description, tt.parent
     FROM ${prefix}terms t
     INNER JOIN ${prefix}term_taxonomy tt ON t.term_id = tt.term_id
     WHERE tt.taxonomy = 'product_cat'`
  )

  let count = 0
  for (const row of rows) {
    try {
      await prisma.category.upsert({
        where: { slug: row.slug },
        update: {
          nameFa: row.name,
          nameEn: row.slug,
          description: row.description || null,
        },
        create: {
          nameFa: row.name,
          nameEn: row.slug,
          slug: row.slug,
          description: row.description || null,
          order: count,
        },
      })
      count++
    } catch (error) {
      console.error(`  ❌ Error migrating category: ${row.name}`, error)
    }
  }

  console.log(`  ✅ Migrated ${count} categories`)
  return count
}

// Migrate Products
async function migrateProducts(wpConnection: mysql.Connection) {
  console.log('📦 Migrating products...')
  const prefix = config.wordpress.tablePrefix

  // Get WooCommerce products
  const [rows] = await wpConnection.execute<mysql.RowDataPacket[]>(
    `SELECT p.ID, p.post_title, p.post_name, p.post_content, p.post_excerpt, p.post_date
     FROM ${prefix}posts p
     WHERE p.post_type = 'product' AND p.post_status = 'publish'`
  )

  let count = 0
  for (const row of rows) {
    try {
      // Get product image
      const image = await getFeaturedImage(wpConnection, row.ID)

      // Get product category
      const [catRows] = await wpConnection.execute<mysql.RowDataPacket[]>(
        `SELECT t.slug FROM ${prefix}terms t
         INNER JOIN ${prefix}term_taxonomy tt ON t.term_id = tt.term_id
         INNER JOIN ${prefix}term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
         WHERE tr.object_id = ? AND tt.taxonomy = 'product_cat'
         LIMIT 1`,
        [row.ID]
      )

      let categoryId: string | undefined
      if (catRows.length > 0) {
        const category = await prisma.category.findUnique({
          where: { slug: catRows[0].slug },
        })
        categoryId = category?.id
      }

      // Get product attributes (meta)
      const [metaRows] = await wpConnection.execute<mysql.RowDataPacket[]>(
        `SELECT meta_key, meta_value FROM ${prefix}postmeta
         WHERE post_id = ? AND meta_key NOT LIKE '\\_%'`,
        [row.ID]
      )

      const attributes = metaRows
        .filter((m) => m.meta_value && m.meta_value.length < 500)
        .map((m) => ({
          key: m.meta_key,
          value: m.meta_value,
        }))

      await prisma.product.upsert({
        where: { slug: row.post_name },
        update: {
          titleFa: row.post_title,
          description: cleanHtml(row.post_content),
          shortDescription: cleanHtml(row.post_excerpt),
          image: image || '/images/products/placeholder.jpg',
          categoryId,
        },
        create: {
          titleFa: row.post_title,
          titleEn: row.post_name,
          slug: row.post_name,
          description: cleanHtml(row.post_content),
          shortDescription: cleanHtml(row.post_excerpt),
          image: image || '/images/products/placeholder.jpg',
          categoryId,
          isActive: true,
          attributes: {
            create: attributes.map((attr) => ({
              key: attr.key,
              value: attr.value,
            })),
          },
        },
      })
      count++
    } catch (error) {
      console.error(`  ❌ Error migrating product: ${row.post_title}`, error)
    }
  }

  console.log(`  ✅ Migrated ${count} products`)
  return count
}

// Migrate Blog Posts
async function migratePosts(wpConnection: mysql.Connection) {
  console.log('📝 Migrating blog posts...')
  const prefix = config.wordpress.tablePrefix

  const [rows] = await wpConnection.execute<mysql.RowDataPacket[]>(
    `SELECT p.ID, p.post_title, p.post_name, p.post_content, p.post_excerpt,
            p.post_date, p.post_author
     FROM ${prefix}posts p
     WHERE p.post_type = 'post' AND p.post_status = 'publish'`
  )

  let count = 0
  for (const row of rows) {
    try {
      const image = await getFeaturedImage(wpConnection, row.ID)

      // Get author name
      const [authorRows] = await wpConnection.execute<mysql.RowDataPacket[]>(
        `SELECT display_name FROM ${prefix}users WHERE ID = ?`,
        [row.post_author]
      )
      const authorName = authorRows[0]?.display_name || 'تیم فنی'

      await prisma.post.upsert({
        where: { slug: row.post_name },
        update: {
          titleFa: row.post_title,
          content: cleanHtml(row.post_content),
          excerpt: cleanHtml(row.post_excerpt),
          image: image || '/images/blog/placeholder.jpg',
        },
        create: {
          titleFa: row.post_title,
          titleEn: row.post_name,
          slug: row.post_name,
          content: cleanHtml(row.post_content),
          excerpt: cleanHtml(row.post_excerpt),
          image: image || '/images/blog/placeholder.jpg',
          author: authorName,
          isPublished: true,
          publishedAt: new Date(row.post_date),
        },
      })
      count++
    } catch (error) {
      console.error(`  ❌ Error migrating post: ${row.post_title}`, error)
    }
  }

  console.log(`  ✅ Migrated ${count} posts`)
  return count
}

// Migrate Pages (for About, Contact, etc.)
async function migratePages(wpConnection: mysql.Connection) {
  console.log('📄 Migrating pages...')
  const prefix = config.wordpress.tablePrefix

  const [rows] = await wpConnection.execute<mysql.RowDataPacket[]>(
    `SELECT p.ID, p.post_title, p.post_name, p.post_content
     FROM ${prefix}posts p
     WHERE p.post_type = 'page' AND p.post_status = 'publish'`
  )

  // Store page content for later use
  const pages: Record<string, { title: string; content: string }> = {}

  for (const row of rows) {
    pages[row.post_name] = {
      title: row.post_title,
      content: cleanHtml(row.post_content),
    }
  }

  // Save to a JSON file for reference
  fs.writeFileSync(
    './scripts/migrated-pages.json',
    JSON.stringify(pages, null, 2)
  )

  console.log(`  ✅ Migrated ${rows.length} pages to migrated-pages.json`)
  return rows.length
}

// Migrate Settings (from WordPress options)
async function migrateSettings(wpConnection: mysql.Connection) {
  console.log('⚙️ Migrating settings...')
  const prefix = config.wordpress.tablePrefix

  const settingsToMigrate = [
    'blogname',
    'blogdescription',
    'admin_email',
    'siteurl',
  ]

  const [rows] = await wpConnection.execute<mysql.RowDataPacket[]>(
    `SELECT option_name, option_value FROM ${prefix}options
     WHERE option_name IN (${settingsToMigrate.map(() => '?').join(',')})`,
    settingsToMigrate
  )

  for (const row of rows) {
    try {
      let key = row.option_name
      if (key === 'blogname') key = 'site_name'
      if (key === 'blogdescription') key = 'site_description'
      if (key === 'admin_email') key = 'email'
      if (key === 'siteurl') key = 'site_url'

      await prisma.setting.upsert({
        where: { key },
        update: { value: row.option_value },
        create: { key, value: row.option_value },
      })
    } catch (error) {
      console.error(`  ❌ Error migrating setting: ${row.option_name}`, error)
    }
  }

  console.log(`  ✅ Migrated ${rows.length} settings`)
  return rows.length
}

// Copy media files
async function copyMediaFiles() {
  console.log('🖼️ Copying media files...')

  const sourcePath = config.mediaPath
  const destPath = config.outputPath

  if (!fs.existsSync(sourcePath)) {
    console.log('  ⚠️ WordPress media path not found, skipping media copy')
    return 0
  }

  // Create destination directories
  const dirs = ['products', 'blog', 'brands', 'projects', 'certificates']
  for (const dir of dirs) {
    const dirPath = path.join(destPath, dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  // Count copied files
  let count = 0

  // Recursively copy files
  function copyDir(src: string, dest: string) {
    if (!fs.existsSync(src)) return

    const entries = fs.readdirSync(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPathFull = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        copyDir(srcPath, destPathFull)
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
        // Only copy images, skip thumbnails
        if (!/-\d+x\d+\./.test(entry.name)) {
          if (!fs.existsSync(path.dirname(destPathFull))) {
            fs.mkdirSync(path.dirname(destPathFull), { recursive: true })
          }
          fs.copyFileSync(srcPath, destPathFull)
          count++
        }
      }
    }
  }

  copyDir(sourcePath, path.join(destPath, 'products'))

  console.log(`  ✅ Copied ${count} media files`)
  return count
}

// Main migration function
async function main() {
  console.log('🚀 Starting WordPress Migration')
  console.log('================================\n')

  let wpConnection: mysql.Connection | null = null

  try {
    // Connect to WordPress database
    console.log('🔌 Connecting to WordPress database...')
    wpConnection = await mysql.createConnection({
      host: config.wordpress.host,
      user: config.wordpress.user,
      password: config.wordpress.password,
      database: config.wordpress.database,
    })
    console.log('  ✅ Connected to WordPress database\n')

    // Run migrations
    const results = {
      categories: await migrateCategories(wpConnection),
      products: await migrateProducts(wpConnection),
      posts: await migratePosts(wpConnection),
      pages: await migratePages(wpConnection),
      settings: await migrateSettings(wpConnection),
      media: await copyMediaFiles(),
    }

    console.log('\n================================')
    console.log('✅ Migration Complete!')
    console.log('================================')
    console.log(`Categories: ${results.categories}`)
    console.log(`Products: ${results.products}`)
    console.log(`Posts: ${results.posts}`)
    console.log(`Pages: ${results.pages}`)
    console.log(`Settings: ${results.settings}`)
    console.log(`Media Files: ${results.media}`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    if (wpConnection) {
      await wpConnection.end()
    }
    await prisma.$disconnect()
  }
}

// Run the migration
main()
