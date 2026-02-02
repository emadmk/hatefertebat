'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, Users, Building, Calendar, Shield } from 'lucide-react'
import { siteConfig } from '@/lib/seo'

const stats = [
  { icon: Calendar, value: siteConfig.experience, label: 'سال تجربه', suffix: '+' },
  { icon: Building, value: '500', label: 'پروژه موفق', suffix: '+' },
  { icon: Users, value: '1000', label: 'مشتری راضی', suffix: '+' },
  { icon: Award, value: '4', label: 'نمایندگی رسمی', suffix: '' },
]

export default function AboutSection() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-32 h-32 text-primary/20" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-2xl font-bold text-dark mb-2">کرمان هاتف ارتباط</h3>
                <p className="text-gray-600">نمایندگی رسمی برندهای معتبر جهانی</p>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold">{siteConfig.experience}+</div>
              <div className="text-sm opacity-90">سال تجربه</div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
            <div className="absolute -bottom-8 right-20 w-16 h-16 bg-primary/5 rounded-full -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
              درباره ما
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-6">
              شریک قابل اعتماد شما در
              <span className="text-primary"> امنیت و ارتباطات</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              شرکت کرمان هاتف ارتباط با بیش از {siteConfig.experience} سال سابقه در زمینه تجهیزات
              مخابراتی و امنیتی، به عنوان نمایندگی رسمی برندهای موتورولا، آویژیلون، کمبیوم و
              ایندوسترونیک در ایران فعالیت می‌کند.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              ما با ارائه محصولات با کیفیت و خدمات پس از فروش حرفه‌ای، همواره در تلاش هستیم تا
              بهترین راهکارهای امنیتی و مخابراتی را به مشتریان خود ارائه دهیم.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-gray-50 rounded-xl"
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-dark">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
            >
              بیشتر بخوانید
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
