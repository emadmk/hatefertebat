import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Building2, Calendar } from 'lucide-react'
import { Breadcrumb, Pagination } from '@/components/common'

export const metadata: Metadata = {
  title: 'پروژه‌های انجام شده',
  description: 'نمونه پروژه‌های اجرا شده توسط کرمان هاتف ارتباط در زمینه سیستم‌های امنیتی و مخابراتی',
}

const projects = [
  {
    id: '1',
    title: 'نصب سیستم مداربسته مجتمع تجاری پارسیان',
    slug: 'parsian-mall-cctv',
    description: 'نصب و راه‌اندازی سیستم دوربین مداربسته پیشرفته Avigilon با قابلیت تشخیص چهره',
    image: '/images/projects/project-1.jpg',
    location: 'تهران',
    client: 'مجتمع تجاری پارسیان',
    completedAt: '۱۴۰۲/۰۶',
    category: 'دوربین مداربسته',
  },
  {
    id: '2',
    title: 'سیستم ارتباط بی‌سیم معدن گل‌گهر',
    slug: 'golghohar-mine-radio',
    description: 'پیاده‌سازی شبکه ارتباط بی‌سیم موتورولا در سطح معدن با پوشش کامل',
    image: '/images/projects/project-2.jpg',
    location: 'سیرجان',
    client: 'شرکت معدنی گل‌گهر',
    completedAt: '۱۴۰۲/۰۴',
    category: 'بی‌سیم و مخابراتی',
  },
  {
    id: '3',
    title: 'کنترل دسترسی برج‌های مسکونی آفتاب',
    slug: 'aftab-towers-access',
    description: 'نصب سیستم کنترل دسترسی هوشمند با قابلیت تشخیص کارت و اثر انگشت',
    image: '/images/projects/project-3.jpg',
    location: 'تهران',
    client: 'برج‌های مسکونی آفتاب',
    completedAt: '۱۴۰۲/۰۳',
    category: 'کنترل دسترسی',
  },
  {
    id: '4',
    title: 'شبکه وایرلس دانشگاه آزاد کرمان',
    slug: 'azad-university-wireless',
    description: 'راه‌اندازی شبکه وایرلس Cambium Networks در محوطه دانشگاه',
    image: '/images/projects/project-4.jpg',
    location: 'کرمان',
    client: 'دانشگاه آزاد کرمان',
    completedAt: '۱۴۰۲/۰۱',
    category: 'شبکه',
  },
  {
    id: '5',
    title: 'سیستم پیجینگ کارخانه فولاد مبارکه',
    slug: 'foolad-mobarake-paging',
    description: 'نصب سیستم اعلان عمومی و پیجینگ صنعتی Industronic',
    image: '/images/projects/project-5.jpg',
    location: 'اصفهان',
    client: 'فولاد مبارکه',
    completedAt: '۱۴۰۱/۱۱',
    category: 'پیجینگ',
  },
  {
    id: '6',
    title: 'سیستم نظارتی بندر شهید رجایی',
    slug: 'rajaee-port-surveillance',
    description: 'پروژه جامع نظارت تصویری با دوربین‌های مداربسته Avigilon',
    image: '/images/projects/project-6.jpg',
    location: 'بندرعباس',
    client: 'بندر شهید رجایی',
    completedAt: '۱۴۰۱/۰۹',
    category: 'دوربین مداربسته',
  },
]

export default function ProjectsPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'پروژه‌ها', url: '/projects' },
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
          <h1 className="text-3xl font-bold text-dark text-center">پروژه‌های انجام شده</h1>
          <p className="text-gray-500 text-center mt-3">نمونه‌ای از پروژه‌های موفق ما</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl font-bold mb-1">+۵۰۰</div>
              <div className="text-sm opacity-80">پروژه موفق</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">+۲۰۰</div>
              <div className="text-sm opacity-80">مشتری راضی</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">+۱۵</div>
              <div className="text-sm opacity-80">سال تجربه</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">+۳۰</div>
              <div className="text-sm opacity-80">استان</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {project.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.completedAt}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Pagination currentPage={1} totalPages={3} baseUrl="/projects" />
        </div>
      </div>
    </div>
  )
}
