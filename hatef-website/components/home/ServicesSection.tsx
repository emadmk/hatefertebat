'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Wrench, Package, Settings, Users } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'مهندسی و مشاوره',
    slug: 'engineering',
    description: 'ارائه مشاوره تخصصی و طراحی سیستم‌های امنیتی و مخابراتی متناسب با نیاز شما',
    icon: Settings,
  },
  {
    id: 2,
    title: 'تامین تجهیزات',
    slug: 'supply',
    description: 'تامین انواع تجهیزات امنیتی و مخابراتی از برندهای معتبر جهانی',
    icon: Package,
  },
  {
    id: 3,
    title: 'نصب و راه‌اندازی',
    slug: 'installation',
    description: 'نصب و راه‌اندازی حرفه‌ای سیستم‌ها توسط تیم متخصص و مجرب',
    icon: Wrench,
  },
  {
    id: 4,
    title: 'پشتیبانی و نگهداری',
    slug: 'support',
    description: 'خدمات پشتیبانی و نگهداری دوره‌ای برای عملکرد بهینه سیستم‌ها',
    icon: Users,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4"
          >
            خدمات ما
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            خدمات تخصصی هاتف ارتباط
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            ارائه خدمات جامع از مشاوره تا پشتیبانی
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block bg-gray-50 rounded-2xl p-6 hover:bg-primary transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-dark group-hover:text-white mb-2 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 text-sm leading-relaxed mb-4 transition-colors">
                    {service.description}
                  </p>

                  {/* Link */}
                  <span className="inline-flex items-center gap-2 text-primary group-hover:text-white text-sm font-medium transition-colors">
                    اطلاعات بیشتر
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
