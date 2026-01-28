import { Metadata } from 'next'
import Image from 'next/image'
import { Award, Users, Building, Calendar } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'درباره ما',
  description: 'آشنایی با کرمان هاتف ارتباط - بیش از ۱۸ سال سابقه در تجهیزات مخابراتی و امنیتی',
}

const stats = [
  { icon: Calendar, label: 'سال تجربه', value: '18+' },
  { icon: Building, label: 'پروژه موفق', value: '500+' },
  { icon: Users, label: 'مشتری راضی', value: '300+' },
  { icon: Award, label: 'برند معتبر', value: '4' },
]

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'درباره ما', url: '/about' },
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
          <h1 className="text-3xl font-bold text-dark text-center">درباره ما</h1>
          <p className="text-gray-500 text-center mt-3">آشنایی با {siteConfig.name}</p>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">درباره هاتف</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              شرکت کرمان هاتف ارتباط با بیش از ۱۸ سال سابقه در زمینه تجهیزات مخابراتی و امنیتی، یکی از پیشگامان این صنعت در ایران است.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              ما به عنوان نماینده رسمی برندهای Motorola، Avigilon، Cambium Networks و Industronic، بهترین تجهیزات را با ضمانت اصالت و خدمات پس از فروش حرفه‌ای ارائه می‌دهیم.
            </p>
            <p className="text-gray-600 leading-relaxed">
              تیم متخصص ما با تجربه و دانش فنی بالا، آماده ارائه مشاوره، طراحی، نصب و پشتیبانی سیستم‌های امنیتی و مخابراتی برای پروژه‌های مختلف است.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/office.jpg"
                alt="دفتر کرمان هاتف ارتباط"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold">18+</div>
              <div className="text-sm opacity-90">سال تجربه</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-dark mb-1">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-dark text-center mb-8">برندهای نمایندگی</h2>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {['motorola', 'avigilon', 'cambium', 'industronic'].map((brand) => (
            <div key={brand} className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all">
              <Image
                src={`/images/brands/${brand}.png`}
                alt={brand}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
