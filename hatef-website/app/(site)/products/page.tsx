import { Metadata } from 'next'
import ProductCard from '@/components/products/ProductCard'
import { Breadcrumb, Pagination } from '@/components/common'
import CategorySidebar from '@/components/products/CategorySidebar'

export const metadata: Metadata = {
  title: 'محصولات',
  description: 'مشاهده تمامی محصولات کرمان هاتف ارتباط شامل دوربین مداربسته، کنترل دسترسی، تجهیزات بی‌سیم و سیستم پیجینگ',
}

// Mock data - will be replaced with database queries
const mockProducts = [
  {
    id: '1',
    titleFa: 'صفحه کلید هوشمند استاندارد',
    titleEn: 'Smart Keypad Standard',
    slug: 'smart-keypad-standard',
    shortDesc: 'ریدر کنترل دسترسی حرفه‌ای Smart Keypad Reader موتورولا با دسترسی مبتنی بر PIN، تاریخچه ورود/خروج به صورت کامل و قابلیت تعریف بیش از ۲۰۰۰ کاربر.',
    image: '/images/products/keypad.png',
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
    brand: { name: 'Motorola', slug: 'motorola' },
  },
  {
    id: '2',
    titleFa: 'VIDEO INTERCOM READER PRO',
    slug: 'video-intercom-reader-pro',
    shortDesc: 'دستگاه ویدیو اینترکام حرفه‌ای با قابلیت تشخیص چهره، ارتباط تصویری دوطرفه و اتصال به سیستم‌های کنترل دسترسی.',
    image: '/images/products/intercom.png',
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
  },
  {
    id: '3',
    titleFa: 'VIDEO READER PRO',
    slug: 'video-reader-pro',
    shortDesc: 'ریدر ویدیویی پیشرفته با صفحه نمایش لمسی، قابلیت خواندن کارت RFID و اتصال به شبکه IP.',
    image: '/images/products/reader.png',
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
  },
  {
    id: '4',
    titleFa: 'خوانده هوشمند استاندارد',
    slug: 'smart-reader-standard',
    shortDesc: 'ریدر کنترل دسترسی با قابلیت خواندن کارت‌های MIFARE و NFC، طراحی ضد آب و مقاوم در برابر ضربه.',
    image: '/images/products/smart-reader.png',
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
  },
  {
    id: '5',
    titleFa: 'کنترلر تک درب',
    slug: 'single-door-controller',
    shortDesc: 'کنترلر یک درب با قابلیت اتصال به شبکه، پشتیبانی از پروتکل‌های مختلف و ظرفیت ذخیره‌سازی بالا.',
    image: '/images/products/controller.png',
    category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
  },
  {
    id: '6',
    titleFa: 'سنسور هوشمند HALO',
    slug: 'halo-smart-sensor',
    shortDesc: 'سنسور هوشمند تشخیص محیطی با قابلیت تشخیص دود، صدا و حرکت، مناسب برای محیط‌های آموزشی.',
    image: '/images/products/halo.png',
    category: { nameFa: 'سنسورها', slug: 'sensors' },
  },
]

const mockCategories = [
  { id: '1', nameFa: 'Security Cameras', slug: 'security-cameras', count: 45 },
  { id: '2', nameFa: 'Access Control', slug: 'access-control', count: 32 },
  { id: '3', nameFa: 'CCTV', slug: 'cctv', count: 28 },
]

export default function ProductsPage() {
  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'محصولات', url: '/products' },
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
          <h1 className="text-3xl font-bold text-dark text-center">محصولات</h1>
          <p className="text-gray-500 text-center mt-2">
            در این قسمت می‌توانید تمامی محصولات را مشاهده نمایید
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <CategorySidebar categories={mockCategories} />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={false} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination currentPage={1} totalPages={5} baseUrl="/products" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
