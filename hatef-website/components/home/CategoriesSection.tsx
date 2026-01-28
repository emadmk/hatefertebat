'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Radio, Shield, Speaker } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'دوربین مداربسته',
    nameEn: 'CCTV',
    slug: 'cctv',
    description: 'دوربین‌های امنیتی با کیفیت بالا و قابلیت‌های هوشمند',
    icon: Camera,
    image: '/images/categories/cctv.jpg',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    name: 'کنترل دسترسی',
    nameEn: 'Access Control',
    slug: 'access-control',
    description: 'سیستم‌های کنترل تردد و احراز هویت پیشرفته',
    icon: Shield,
    image: '/images/categories/access-control.jpg',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    name: 'بی‌سیم و مخابراتی',
    nameEn: 'Wireless',
    slug: 'wireless',
    description: 'تجهیزات بی‌سیم و شبکه‌های مخابراتی',
    icon: Radio,
    image: '/images/categories/wireless.jpg',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    name: 'سیستم پیجینگ',
    nameEn: 'Paging',
    slug: 'paging',
    description: 'سیستم‌های صوتی و پیجینگ صنعتی',
    icon: Speaker,
    image: '/images/categories/paging.jpg',
    color: 'from-orange-500 to-orange-600',
  },
]

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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={`/products/category/${category.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white opacity-50" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-400">{category.nameEn}</p>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {category.description}
                    </p>
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
