import { Metadata } from 'next'
import Image from 'next/image'
import { Award, ExternalLink } from 'lucide-react'
import { Breadcrumb } from '@/components/common'

export const metadata: Metadata = {
  title: 'گواهینامه‌ها و مجوزها',
  description: 'گواهینامه‌ها و مجوزهای رسمی کرمان هاتف ارتباط - نمایندگی رسمی برندهای معتبر',
}

const certificates = [
  {
    id: '1',
    title: 'نمایندگی رسمی Motorola Solutions',
    description: 'نمایندگی رسمی فروش و خدمات پس از فروش محصولات Motorola Solutions در ایران',
    image: '/images/certificates/motorola-cert.jpg',
    issuer: 'Motorola Solutions',
    year: '۲۰۲۳',
  },
  {
    id: '2',
    title: 'نمایندگی رسمی Avigilon',
    description: 'نمایندگی رسمی سیستم‌های نظارت تصویری و دوربین‌های مداربسته Avigilon',
    image: '/images/certificates/avigilon-cert.jpg',
    issuer: 'Avigilon Corporation',
    year: '۲۰۲۳',
  },
  {
    id: '3',
    title: 'نمایندگی Cambium Networks',
    description: 'نمایندگی رسمی تجهیزات شبکه بی‌سیم Cambium Networks',
    image: '/images/certificates/cambium-cert.jpg',
    issuer: 'Cambium Networks',
    year: '۲۰۲۳',
  },
  {
    id: '4',
    title: 'نمایندگی Industronic',
    description: 'نمایندگی رسمی سیستم‌های پیجینگ و اعلان عمومی Industronic',
    image: '/images/certificates/industronic-cert.jpg',
    issuer: 'Industronic GmbH',
    year: '۲۰۲۳',
  },
  {
    id: '5',
    title: 'گواهی عضویت اتاق بازرگانی',
    description: 'عضویت در اتاق بازرگانی، صنایع، معادن و کشاورزی تهران',
    image: '/images/certificates/chamber-cert.jpg',
    issuer: 'اتاق بازرگانی تهران',
    year: '۱۴۰۲',
  },
  {
    id: '6',
    title: 'گواهی ثبت شرکت',
    description: 'گواهی ثبت شرکت در اداره ثبت شرکت‌ها و موسسات غیرتجاری',
    image: '/images/certificates/company-cert.jpg',
    issuer: 'اداره ثبت شرکت‌ها',
    year: '۱۳۹۹',
  },
]

export default function CertificatesPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'گواهینامه‌ها', url: '/certificates' },
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
          <h1 className="text-3xl font-bold text-dark text-center">گواهینامه‌ها و مجوزها</h1>
          <p className="text-gray-500 text-center mt-3">نمایندگی‌های رسمی و مجوزهای فعالیت</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12 text-center">
          <Award className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-dark mb-3">
            نمایندگی رسمی برندهای معتبر جهانی
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            کرمان هاتف ارتباط با داشتن نمایندگی رسمی از برندهای معتبر جهانی، تضمین کننده
            اصالت کالا و ارائه خدمات پس از فروش استاندارد است.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 left-4 p-2 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-primary" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary font-medium">{cert.issuer}</span>
                  <span className="text-xs text-gray-400">{cert.year}</span>
                </div>
                <h3 className="font-bold text-dark mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
