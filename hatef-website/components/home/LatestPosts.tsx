'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Demo posts - در نسخه نهایی از دیتابیس می‌آید
const posts = [
  {
    id: '1',
    titleFa: 'مقایسه دوربین‌های IP و آنالوگ: کدام بهتر است؟',
    slug: 'ip-vs-analog-cameras',
    excerpt: 'در این مقاله به بررسی تفاوت‌های اصلی بین دوربین‌های IP و آنالوگ می‌پردازیم و راهنمایی می‌کنیم که کدام نوع برای نیاز شما مناسب‌تر است.',
    image: '/images/blog/ip-vs-analog.jpg',
    publishedAt: new Date('2024-01-15'),
    category: { nameFa: 'دوربین مداربسته', slug: 'cctv' },
  },
  {
    id: '2',
    titleFa: 'راهنمای انتخاب سیستم کنترل دسترسی مناسب',
    slug: 'access-control-guide',
    excerpt: 'انتخاب سیستم کنترل دسترسی مناسب برای سازمان شما می‌تواند چالش‌برانگیز باشد. در این مقاله نکات کلیدی را بررسی می‌کنیم.',
    image: '/images/blog/access-control-guide.jpg',
    publishedAt: new Date('2024-01-10'),
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
  },
  {
    id: '3',
    titleFa: 'مزایای استفاده از بی‌سیم‌های دیجیتال موتورولا',
    slug: 'motorola-digital-radios',
    excerpt: 'بی‌سیم‌های دیجیتال موتورولا چه مزایایی نسبت به مدل‌های آنالوگ دارند؟ در این مقاله به بررسی ویژگی‌های کلیدی می‌پردازیم.',
    image: '/images/blog/motorola-radios.jpg',
    publishedAt: new Date('2024-01-05'),
    category: { nameFa: 'بی‌سیم', slug: 'wireless' },
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

export default function LatestPosts() {
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
              آخرین مطالب وبلاگ
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-subtitle"
            >
              آموزش‌ها و مقالات تخصصی در حوزه امنیت و ارتباطات
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
            >
              همه مطالب
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.article key={post.id} variants={itemVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.titleFa}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium text-dark">
                      {post.category.nameFa}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishedAt.toISOString()}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>

                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {post.titleFa}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    ادامه مطلب
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
