import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Building2, Calendar, ArrowLeft, CheckCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/common'

const mockProjects = [
  {
    id: '1',
    title: 'نصب سیستم مداربسته مجتمع تجاری پارسیان',
    slug: 'parsian-mall-cctv',
    description: 'نصب و راه‌اندازی سیستم دوربین مداربسته پیشرفته Avigilon با قابلیت تشخیص چهره برای مجتمع تجاری پارسیان. این پروژه شامل نصب بیش از ۲۰۰ دوربین مداربسته با کیفیت 4K و سیستم ذخیره‌سازی پیشرفته بود.',
    fullDescription: `
      <p>در این پروژه، سیستم نظارت تصویری کامل برای مجتمع تجاری پارسیان طراحی و اجرا شد. هدف از این پروژه ایجاد امنیت کامل برای بازدیدکنندگان و فروشگاه‌ها بود.</p>

      <h3>ویژگی‌های پروژه:</h3>
      <ul>
        <li>نصب بیش از ۲۰۰ دوربین مداربسته Avigilon</li>
        <li>سیستم تشخیص چهره پیشرفته</li>
        <li>قابلیت جستجوی هوشمند تصاویر</li>
        <li>ذخیره‌سازی تصاویر به مدت ۹۰ روز</li>
        <li>مانیتورینگ ۲۴ ساعته</li>
      </ul>

      <h3>نتایج:</h3>
      <p>پس از راه‌اندازی این سیستم، میزان سرقت و تخلفات در مجتمع به طور چشمگیری کاهش یافت و رضایت مشتریان افزایش پیدا کرد.</p>
    `,
    images: [
      '/images/projects/project-1.jpg',
      '/images/projects/project-1-2.jpg',
      '/images/projects/project-1-3.jpg',
    ],
    location: 'تهران',
    client: 'مجتمع تجاری پارسیان',
    completedAt: '۱۴۰۲/۰۶',
    category: 'دوربین مداربسته',
    features: [
      'نصب بیش از ۲۰۰ دوربین',
      'سیستم تشخیص چهره',
      'ذخیره‌سازی ۹۰ روزه',
      'مانیتورینگ ۲۴ ساعته',
      'گارانتی ۲ ساله',
    ],
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = mockProjects.find((p) => p.slug === slug)

  if (!project) {
    return { title: 'پروژه یافت نشد' }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = mockProjects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'پروژه‌ها', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} - تصویر ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-2xl font-bold text-dark mb-4">{project.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-primary" />
                  {project.client}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  {project.completedAt}
                </span>
              </div>

              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">اطلاعات پروژه</h2>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">کارفرما:</span>
                  <span className="text-dark font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">موقعیت:</span>
                  <span className="text-dark font-medium">{project.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">دسته‌بندی:</span>
                  <span className="text-dark font-medium">{project.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">تاریخ اتمام:</span>
                  <span className="text-dark font-medium">{project.completedAt}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">ویژگی‌های پروژه</h2>

              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-xl p-6 text-white text-center">
              <h3 className="font-bold text-lg mb-2">پروژه مشابه نیاز دارید؟</h3>
              <p className="text-sm opacity-90 mb-4">
                با کارشناسان ما مشورت کنید
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                تماس با ما
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
