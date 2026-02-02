'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowLeft, Camera, Radio, Shield, Speaker, Folder } from 'lucide-react'

interface Category {
  id: string
  nameFa: string
  nameEn: string | null
  slug: string
  description: string | null
  image: string | null
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'cctv': Camera,
  'camera': Camera,
  'access-control': Shield,
  'wireless': Radio,
  'paging': Speaker,
}

const colorMap: Record<string, string> = {
  'cctv': 'from-blue-500 to-blue-600',
  'camera': 'from-blue-500 to-blue-600',
  'access-control': 'from-green-500 to-green-600',
  'wireless': 'from-purple-500 to-purple-600',
  'paging': 'from-orange-500 to-orange-600',
}

const imageMap: Record<string, string> = {
  'cctv': '/images/cctv.webp',
  'camera': '/images/cctv.webp',
  'access-control': '/images/telecomunication.webp',
  'wireless': '/images/Microwave.webp',
  'paging': '/images/paging.webp',
  'radio': '/images/radio.webp',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          // Take only parent categories (first level)
          const parentCategories = data.data.filter((c: Category & { parentId?: string | null }) => !c.parentId)
          setCategories(parentCategories.slice(0, 5))
        }
      })
      .catch(console.error)
  }, [])

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            دسته‌بندی محصولات
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle mx-auto"
          >
            تجهیزات امنیتی و مخابراتی در دسته‌بندی‌های مختلف
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {categories.map((category, index) => {
            const Icon = iconMap[category.slug] || Folder
            const color = colorMap[category.slug] || ['from-gray-500 to-gray-600', 'from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600'][index % 4]
            const categoryImage = category.image || imageMap[category.slug]

            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={`/products/category/${category.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {categoryImage ? (
                      <Image
                        src={categoryImage}
                        alt={category.nameFa}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-16 h-16 text-white opacity-50" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                          {category.nameFa}
                        </h3>
                        {category.nameEn && (
                          <p className="text-sm text-gray-400">{category.nameEn}</p>
                        )}
                      </div>
                      <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                    </div>
                    {category.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
          >
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
