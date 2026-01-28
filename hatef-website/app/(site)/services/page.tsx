import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Settings, Truck, Wrench, Cpu, ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/common'

export const metadata: Metadata = {
  title: 'خدمات',
  description: 'خدمات کرمان هاتف ارتباط شامل راه‌اندازی، تامین تجهیزات، نصب و مهندسی سیستم‌های مخابراتی و امنیتی',
}

const services = [
  {
    id: '1',
    titleFa: 'راه اندازی',
    slug: 'installation',
    shortDesc: 'راه‌اندازی و پیکربندی کامل سیستم‌های امنیتی و مخابراتی',
    icon: Settings,
    image: '/images/services/installation.jpg',
  },
  {
    id: '2',
    titleFa: 'تامین تجهیزات',
    slug: 'equipment',
    shortDesc: 'تامین تجهیزات اصلی از برندهای معتبر جهانی',
    icon: Truck,
    image: '/images/services/equipment.jpg',
  },
  {
    id: '3',
    titleFa: 'نصب',
    slug: 'setup',
    shortDesc: 'نصب حرفه‌ای توسط تیم متخصص با تضمین کیفیت',
    icon: Wrench,
    image: '/images/services/setup.jpg',
  },
  {
    id: '4',
    titleFa: 'مهندسی',
    slug: 'engineering',
    shortDesc: 'طراحی و مهندسی سیستم‌های یکپارچه امنیتی',
    icon: Cpu,
    image: '/images/services/engineering.jpg',
  },
]

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'خدمات', url: '/services' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-dark text-center">خدمات ما</h1>
          <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto">
            با بیش از ۱۸ سال تجربه در زمینه تجهیزات مخابراتی و امنیتی، خدمات جامعی را به مشتریان خود ارائه می‌دهیم
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.titleFa}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                        {service.titleFa}
                      </h2>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {service.shortDesc}
                    </p>

                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      اطلاعات بیشتر
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
