import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { Breadcrumb, Pagination } from '@/components/common'

export const metadata: Metadata = {
  title: 'وبلاگ',
  description: 'مقالات و اخبار کرمان هاتف ارتباط در زمینه تجهیزات مخابراتی و امنیتی',
}

const mockPosts = [
  {
    id: '1',
    titleFa: 'راهنمای انتخاب دوربین مداربسته مناسب',
    slug: 'choosing-right-cctv',
    excerpt: 'در این مقاله به بررسی نکات مهم در انتخاب دوربین مداربسته برای محیط‌های مختلف می‌پردازیم.',
    image: '/images/blog/cctv-guide.jpg',
    author: 'تیم فنی',
    publishedAt: '۱۴۰۲/۰۹/۱۵',
    category: 'راهنما',
  },
  {
    id: '2',
    titleFa: 'مزایای سیستم‌های کنترل دسترسی هوشمند',
    slug: 'smart-access-control-benefits',
    excerpt: 'سیستم‌های کنترل دسترسی هوشمند چه مزایایی نسبت به سیستم‌های سنتی دارند؟',
    image: '/images/blog/access-control.jpg',
    author: 'تیم فنی',
    publishedAt: '۱۴۰۲/۰۸/۲۰',
    category: 'مقاله',
  },
  {
    id: '3',
    titleFa: 'معرفی تجهیزات جدید موتورولا',
    slug: 'new-motorola-products',
    excerpt: 'آشنایی با جدیدترین تجهیزات بی‌سیم موتورولا و ویژگی‌های آنها.',
    image: '/images/blog/motorola-new.jpg',
    author: 'تیم فنی',
    publishedAt: '۱۴۰۲/۰۷/۱۰',
    category: 'اخبار',
  },
]

export default function BlogPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'وبلاگ', url: '/blog' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-dark text-center">وبلاگ</h1>
          <p className="text-gray-500 text-center mt-3">آخرین مقالات و اخبار</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video">
                <Image
                  src={post.image}
                  alt={post.titleFa}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.titleFa}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  ادامه مطلب
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Pagination currentPage={1} totalPages={3} baseUrl="/blog" />
        </div>
      </div>
    </div>
  )
}
