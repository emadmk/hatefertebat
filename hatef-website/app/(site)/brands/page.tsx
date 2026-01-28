import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/common'

export const metadata: Metadata = {
  title: 'برندها',
  description: 'نمایندگی رسمی برندهای Motorola، Avigilon، Cambium Networks و Industronic در ایران',
}

const brands = [
  {
    id: '1',
    name: 'Motorola',
    slug: 'motorola',
    logo: '/images/brands/motorola.png',
    description: 'نمایندگی رسمی موتورولا در ایران - تجهیزات ارتباطی و بی‌سیم حرفه‌ای',
    productCount: 45,
  },
  {
    id: '2',
    name: 'Avigilon',
    slug: 'avigilon',
    logo: '/images/brands/avigilon.png',
    description: 'سیستم‌های نظارت تصویری و آنالیز ویدیویی پیشرفته',
    productCount: 32,
  },
  {
    id: '3',
    name: 'Cambium Networks',
    slug: 'cambium',
    logo: '/images/brands/cambium.png',
    description: 'راهکارهای شبکه بی‌سیم و زیرساخت ارتباطی',
    productCount: 28,
  },
  {
    id: '4',
    name: 'Industronic',
    slug: 'industronic',
    logo: '/images/brands/industronic.png',
    description: 'سیستم‌های پیجینگ و اطلاع‌رسانی صنعتی',
    productCount: 15,
  },
]

export default function BrandsPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'برندها', url: '/brands' },
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
          <h1 className="text-3xl font-bold text-dark text-center">برندها</h1>
          <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto">
            نمایندگی رسمی برندهای معتبر جهانی در ایران
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="relative w-40 h-24 mb-6 grayscale group-hover:grayscale-0 transition-all">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                {brand.name}
              </h2>

              <p className="text-gray-600 mb-4">{brand.description}</p>

              <span className="text-sm text-gray-400 mb-4">
                {brand.productCount} محصول
              </span>

              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                مشاهده محصولات
                <ArrowLeft className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
