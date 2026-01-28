'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/seo'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-bl from-dark via-dark-800 to-dark-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Orange Accent */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/10 to-transparent" />

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              بیش از {siteConfig.experience} سال تجربه
            </span>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              راهکارهای حرفه‌ای
              <br />
              <span className="text-primary">امنیت و ارتباطات</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              نمایندگی رسمی برندهای موتورولا، آویژیلون، کمبیوم و ایندوسترونیک در ایران.
              ارائه‌دهنده تجهیزات مخابراتی، دوربین مداربسته و سیستم‌های امنیتی پیشرفته.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                مشاهده محصولات
                <ArrowLeft className="w-5 h-5" />
              </Link>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                <Phone className="w-5 h-5" />
                درخواست مشاوره
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-primary">+200</div>
                <div className="text-gray-400 text-sm mt-1">محصول</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">+500</div>
                <div className="text-gray-400 text-sm mt-1">پروژه موفق</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-gray-400 text-sm mt-1">برند معتبر</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />

              {/* Main Image */}
              <div className="absolute inset-16 rounded-2xl overflow-hidden shadow-2xl animate-float">
                <Image
                  src="/images/hero-product.png"
                  alt="تجهیزات امنیتی"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-10 right-0 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-sm font-bold text-dark">نمایندگی رسمی</div>
                <div className="text-xs text-gray-500">Motorola</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-20 left-0 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-sm font-bold text-dark">پشتیبانی</div>
                <div className="text-xs text-gray-500">۲۴/۷ آنلاین</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
