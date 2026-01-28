import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Settings, Truck, Cpu, Radio } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import ServiceRequestForm from '@/components/forms/ServiceRequestForm'

// Mock data
const servicesData: Record<string, {
  id: string
  titleFa: string
  slug: string
  shortDesc: string
  fullDesc: string
  image: string
  icon: string
}> = {
  setup: {
    id: '1',
    titleFa: 'نصب',
    slug: 'setup',
    shortDesc: 'تیم تکنسین های مجرب این شرکت می توانند تجهیزات را در سایت ...',
    fullDesc: 'تیم تکنسین های مجرب این شرکت می توانند تجهیزات را در سایت مشتری نصب کنند و از تنظیم و پیکربندی صحیح آن اطمینان حاصل کنند.',
    image: '/images/services/setup.jpg',
    icon: 'wrench',
  },
  installation: {
    id: '2',
    titleFa: 'راه اندازی',
    slug: 'installation',
    shortDesc: 'راه‌اندازی و پیکربندی کامل سیستم‌های امنیتی و مخابراتی',
    fullDesc: 'تیم متخصص ما با تجربه گسترده در راه‌اندازی سیستم‌های پیچیده، تمامی مراحل نصب و پیکربندی را به صورت حرفه‌ای انجام می‌دهد.',
    image: '/images/services/installation.jpg',
    icon: 'settings',
  },
  equipment: {
    id: '3',
    titleFa: 'تامین تجهیزات',
    slug: 'equipment',
    shortDesc: 'تامین تجهیزات اصلی از برندهای معتبر جهانی',
    fullDesc: 'با نمایندگی رسمی برندهای موتورولا، آویژیلون، کمبیوم و ایندوسترونیک، تجهیزات اصل با گارانتی معتبر را تامین می‌کنیم.',
    image: '/images/services/equipment.jpg',
    icon: 'truck',
  },
  engineering: {
    id: '4',
    titleFa: 'مهندسی',
    slug: 'engineering',
    shortDesc: 'طراحی و مهندسی سیستم‌های یکپارچه امنیتی',
    fullDesc: 'تیم مهندسی ما با تحلیل نیازهای شما، بهترین راهکار فنی را طراحی و پیاده‌سازی می‌کند.',
    image: '/images/services/engineering.jpg',
    icon: 'cpu',
  },
}

const otherServices = [
  { titleFa: 'راه اندازی', slug: 'installation', icon: Settings },
  { titleFa: 'تامین تجهیزات', slug: 'equipment', icon: Truck },
  { titleFa: 'مهندسی', slug: 'engineering', icon: Cpu },
]

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = servicesData[params.slug]

  if (!service) {
    return { title: 'خدمت یافت نشد' }
  }

  return {
    title: service.titleFa,
    description: service.shortDesc,
  }
}

export default function ServicePage({ params }: PageProps) {
  const service = servicesData[params.slug]

  if (!service) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'خدمات', url: '/services' },
    { name: service.titleFa, url: `/services/${service.slug}` },
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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-dark text-center">{service.titleFa}</h1>
          <p className="text-gray-500 text-center mt-2">{service.shortDesc}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={service.titleFa}
                fill
                className="object-cover"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-primary rounded-2xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Icon */}
            <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <Radio className="w-10 h-10 text-primary" />
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {service.fullDesc}
            </p>

            {/* Other Services */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-dark mb-4">دیگر خدمات :</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherServices
                  .filter((s) => s.slug !== params.slug)
                  .map((s) => {
                    const IconComponent = s.icon
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary hover:shadow-sm transition-all group"
                      >
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-dark font-medium group-hover:text-primary transition-colors">
                          {s.titleFa}
                        </span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-dark mb-2 text-center">درخواست خدمات</h2>
            <p className="text-gray-500 text-center mb-8">
              برای درخواست خدمات {service.titleFa}، فرم زیر را تکمیل کنید
            </p>
            <ServiceRequestForm serviceTitle={service.titleFa} />
          </div>
        </div>
      </div>
    </div>
  )
}
