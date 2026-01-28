import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import { Breadcrumb, Pagination } from '@/components/common'
import CategorySidebar from '@/components/products/CategorySidebar'

// Mock data
const mockCategories = [
  { id: '1', nameFa: 'Security Cameras', nameEn: 'Security Cameras', slug: 'security-cameras', count: 45, description: 'دوربین‌های امنیتی با کیفیت بالا' },
  { id: '2', nameFa: 'Access Control', nameEn: 'Access Control', slug: 'access-control', count: 32, description: 'سیستم‌های کنترل دسترسی' },
  { id: '3', nameFa: 'CCTV', nameEn: 'CCTV', slug: 'cctv', count: 28, description: 'سیستم‌های دوربین مداربسته' },
]

const mockProducts = [
  {
    id: '1',
    titleFa: 'صفحه کلید هوشمند استاندارد',
    slug: 'smart-keypad-standard',
    shortDesc: 'ریدر کنترل دسترسی حرفه‌ای Smart Keypad Reader موتورولا با دسترسی مبتنی بر PIN.',
    image: '/images/products/keypad.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '2',
    titleFa: 'VIDEO INTERCOM READER PRO',
    slug: 'video-intercom-reader-pro',
    shortDesc: 'دستگاه ویدیو اینترکام حرفه‌ای با قابلیت تشخیص چهره.',
    image: '/images/products/intercom.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '3',
    titleFa: 'VIDEO READER PRO',
    slug: 'video-reader-pro',
    shortDesc: 'ریدر ویدیویی پیشرفته با صفحه نمایش لمسی.',
    image: '/images/products/reader.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '4',
    titleFa: 'خوانده هوشمند استاندارد',
    slug: 'smart-reader-standard',
    shortDesc: 'ریدر کنترل دسترسی با قابلیت خواندن کارت‌های MIFARE.',
    image: '/images/products/smart-reader.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '5',
    titleFa: 'کنترلر تک درب',
    slug: 'single-door-controller',
    shortDesc: 'کنترلر یک درب با قابلیت اتصال به شبکه.',
    image: '/images/products/controller.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '6',
    titleFa: 'صفحه کلید هوشمند MULLION',
    slug: 'mullion-smart-keypad',
    shortDesc: 'صفحه کلید باریک مخصوص نصب در فضاهای محدود.',
    image: '/images/products/mullion.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '7',
    titleFa: 'MULLION SMART READER',
    slug: 'mullion-smart-reader',
    shortDesc: 'ریدر هوشمند باریک با طراحی مدرن.',
    image: '/images/products/mullion-reader.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
  {
    id: '8',
    titleFa: 'سنسور هوشمند HALO',
    slug: 'halo-smart-sensor',
    shortDesc: 'سنسور تشخیص محیطی هوشمند.',
    image: '/images/products/halo.png',
    category: { nameFa: 'CCTV', slug: 'cctv' },
  },
]

interface PageProps {
  params: { cat: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = mockCategories.find((c) => c.slug === params.cat)

  if (!category) {
    return { title: 'دسته‌بندی یافت نشد' }
  }

  return {
    title: category.nameFa,
    description: category.description || `مشاهده محصولات دسته ${category.nameFa}`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const category = mockCategories.find((c) => c.slug === params.cat)

  if (!category) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'محصولات', url: '/products' },
    { name: category.nameFa, url: `/products/category/${category.slug}` },
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
          <h1 className="text-3xl font-bold text-dark text-center">{category.nameFa}</h1>
          <p className="text-gray-500 text-center mt-2">
            در این قسمت می‌توانید تمامی محصولات را مشاهده نمایید
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <CategorySidebar categories={mockCategories} currentSlug={params.cat} />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={false} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination currentPage={1} totalPages={3} baseUrl={`/products/category/${params.cat}`} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
