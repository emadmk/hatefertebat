import { MetadataRoute } from 'next'
import prisma from '@/lib/db'

const baseUrl = 'https://hatefertebat.ir'

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return products
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return categories
  } catch {
    return []
  }
}

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isActive: true,
        publishedAt: { not: null },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return posts
  } catch {
    return []
  }
}

async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return brands
  } catch {
    return []
  }
}

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return projects
  } catch {
    return []
  }
}

async function getCertificates() {
  try {
    const certificates = await prisma.certificate.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return certificates
  } catch {
    return []
  }
}

async function getCatalogs() {
  try {
    const catalogs = await prisma.catalog.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return catalogs
  } catch {
    return []
  }
}

async function getFaqs() {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isActive: true },
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return faqs
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all data from database
  const [products, categories, posts, brands, projects, certificates, catalogs, faqs] = await Promise.all([
    getProducts(),
    getCategories(),
    getPosts(),
    getBrands(),
    getProjects(),
    getCertificates(),
    getCatalogs(),
    getFaqs(),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Products
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Categories
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/products/category/${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Blog posts
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Brands
  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(brand.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Projects
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Certificates
  const certificatePages: MetadataRoute.Sitemap = certificates.map((certificate) => ({
    url: `${baseUrl}/certificates/${certificate.slug}`,
    lastModified: new Date(certificate.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  // Catalogs
  const catalogPages: MetadataRoute.Sitemap = catalogs.map((catalog) => ({
    url: `${baseUrl}/catalog/${catalog.slug}`,
    lastModified: new Date(catalog.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...postPages,
    ...brandPages,
    ...projectPages,
    ...certificatePages,
    ...catalogPages,
  ]
}
