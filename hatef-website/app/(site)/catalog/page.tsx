import { Metadata } from 'next'
import Link from 'next/link'
import { FileDown, FileText } from 'lucide-react'
import { Breadcrumb } from '@/components/common'

export const metadata: Metadata = {
  title: 'کاتالوگ محصولات',
  description: 'دانلود کاتالوگ محصولات کرمان هاتف ارتباط - تجهیزات مخابراتی، دوربین مداربسته، کنترل دسترسی',
}

const catalogs = [
  {
    id: '1',
    title: 'کاتالوگ دوربین‌های مداربسته Avigilon',
    description: 'معرفی کامل محصولات دوربین مداربسته برند Avigilon شامل مشخصات فنی و قابلیت‌ها',
    fileSize: '۵.۲ مگابایت',
    category: 'دوربین مداربسته',
    downloadUrl: '/catalogs/avigilon-cctv.pdf',
  },
  {
    id: '2',
    title: 'کاتالوگ بی‌سیم‌های موتورولا',
    description: 'راهنمای کامل محصولات بی‌سیم و مخابراتی Motorola Solutions',
    fileSize: '۳.۸ مگابایت',
    category: 'بی‌سیم و مخابراتی',
    downloadUrl: '/catalogs/motorola-radios.pdf',
  },
  {
    id: '3',
    title: 'کاتالوگ سیستم‌های کنترل دسترسی',
    description: 'معرفی انواع سیستم‌های کنترل دسترسی و اکسس کنترل',
    fileSize: '۲.۵ مگابایت',
    category: 'کنترل دسترسی',
    downloadUrl: '/catalogs/access-control.pdf',
  },
  {
    id: '4',
    title: 'کاتالوگ تجهیزات شبکه Cambium',
    description: 'محصولات شبکه بی‌سیم و نقطه به نقطه Cambium Networks',
    fileSize: '۴.۱ مگابایت',
    category: 'شبکه',
    downloadUrl: '/catalogs/cambium-network.pdf',
  },
  {
    id: '5',
    title: 'کاتالوگ سیستم‌های پیجینگ Industronic',
    description: 'سیستم‌های اعلان عمومی و پیجینگ صنعتی Industronic',
    fileSize: '۳.۲ مگابایت',
    category: 'پیجینگ',
    downloadUrl: '/catalogs/industronic-paging.pdf',
  },
  {
    id: '6',
    title: 'کاتالوگ جامع محصولات شرکت',
    description: 'معرفی کامل تمامی محصولات و خدمات کرمان هاتف ارتباط',
    fileSize: '۸.۵ مگابایت',
    category: 'عمومی',
    downloadUrl: '/catalogs/hatef-complete.pdf',
  },
]

const categories = ['همه', 'دوربین مداربسته', 'بی‌سیم و مخابراتی', 'کنترل دسترسی', 'شبکه', 'پیجینگ', 'عمومی']

export default function CatalogPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'کاتالوگ', url: '/catalog' },
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
          <h1 className="text-3xl font-bold text-dark text-center">کاتالوگ محصولات</h1>
          <p className="text-gray-500 text-center mt-3">دانلود کاتالوگ و بروشور محصولات</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === 'همه'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((catalog) => (
            <div
              key={catalog.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-primary font-medium">{catalog.category}</span>
                  <h3 className="font-bold text-dark mt-1 mb-2">{catalog.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{catalog.description}</p>
                  <span className="text-xs text-gray-400">حجم فایل: {catalog.fileSize}</span>
                </div>
              </div>

              <Link
                href={catalog.downloadUrl}
                className="flex items-center justify-center gap-2 w-full mt-4 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                <FileDown className="w-5 h-5" />
                دانلود کاتالوگ
              </Link>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-dark mb-3">
            به کاتالوگ خاصی نیاز دارید؟
          </h2>
          <p className="text-gray-600 mb-6">
            در صورت نیاز به کاتالوگ محصول خاصی با ما تماس بگیرید
          </p>
          <Link
            href="/contact"
            className="inline-block bg-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </div>
  )
}
