'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'

// Demo products - در نسخه نهایی از دیتابیس می‌آید
const products = [
  {
    id: '1',
    titleFa: 'دوربین مداربسته آویژیلون H5A',
    titleEn: 'Avigilon H5A Camera',
    slug: 'avigilon-h5a-camera',
    shortDesc: 'دوربین هوشمند با تکنولوژی تشخیص چهره و آنالیز ویدیو',
    image: '/images/products/avigilon-h5a.jpg',
    category: { nameFa: 'دوربین مداربسته', slug: 'cctv' },
    brand: { name: 'Avigilon', slug: 'avigilon' },
  },
  {
    id: '2',
    titleFa: 'بی‌سیم موتورولا DP4800e',
    titleEn: 'Motorola DP4800e',
    slug: 'motorola-dp4800e',
    shortDesc: 'بی‌سیم دیجیتال حرفه‌ای با قابلیت GPS و بلوتوث',
    image: '/images/products/motorola-dp4800e.jpg',
    category: { nameFa: 'بی‌سیم', slug: 'wireless' },
    brand: { name: 'Motorola', slug: 'motorola' },
  },
  {
    id: '3',
    titleFa: 'اکسس‌پوینت کمبیوم ePMP 3000',
    titleEn: 'Cambium ePMP 3000',
    slug: 'cambium-epmp-3000',
    shortDesc: 'اکسس‌پوینت با ظرفیت بالا برای شبکه‌های وایرلس',
    image: '/images/products/cambium-epmp-3000.jpg',
    category: { nameFa: 'شبکه', slug: 'wireless' },
    brand: { name: 'Cambium', slug: 'cambium' },
  },
  {
    id: '4',
    titleFa: 'سیستم پیجینگ ایندوسترونیک PA-500',
    titleEn: 'Industronic PA-500',
    slug: 'industronic-pa-500',
    shortDesc: 'سیستم پیجینگ صنعتی با کیفیت صدای بالا',
    image: '/images/products/industronic-pa-500.jpg',
    category: { nameFa: 'پیجینگ', slug: 'paging' },
    brand: { name: 'Industronic', slug: 'industronic' },
  },
  {
    id: '5',
    titleFa: 'کنترل دسترسی آویژیلون ACM',
    titleEn: 'Avigilon ACM',
    slug: 'avigilon-acm',
    shortDesc: 'نرم‌افزار مدیریت کنترل دسترسی یکپارچه',
    image: '/images/products/avigilon-acm.jpg',
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
    brand: { name: 'Avigilon', slug: 'avigilon' },
  },
  {
    id: '6',
    titleFa: 'بی‌سیم موتورولا SL2600',
    titleEn: 'Motorola SL2600',
    slug: 'motorola-sl2600',
    shortDesc: 'بی‌سیم باریک و سبک با طراحی ظریف',
    image: '/images/products/motorola-sl2600.jpg',
    category: { nameFa: 'بی‌سیم', slug: 'wireless' },
    brand: { name: 'Motorola', slug: 'motorola' },
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

export default function FeaturedProducts() {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              محصولات برگزیده
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-subtitle"
            >
              محبوب‌ترین و پرفروش‌ترین محصولات ما
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              همه محصولات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
