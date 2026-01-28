import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Download, Printer, FileText } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import ProductCard from '@/components/products/ProductCard'
import InquiryForm from '@/components/forms/InquiryForm'
import ProductGallery from '@/components/products/ProductGallery'
import { getImageUrl } from '@/lib/utils'
import { generateProductSchema } from '@/lib/seo'

// Mock data
const mockProduct = {
  id: '1',
  titleFa: 'صفحه کلید هوشمند استاندارد',
  titleEn: 'Smart Keypad Standard',
  slug: 'smart-keypad-standard',
  shortDesc: 'توضیحات کوتاه',
  fullDesc: `<p>ریدر کنترل دسترسی حرفه‌ای Smart Keypad Reader موتورولا با دسترسی مبتنی بر PIN، تاریخچه ورود/خروج به صورت کامل و قابلیت تعریف بیش از ۲۰۰۰ کاربر برای تمامی محیط‌ها طراحی شده است.</p>
  <p>این دستگاه با بدنه مستحکم و مقاوم در برابر آب و گرد و غبار، برای نصب در محیط‌های داخلی و خارجی مناسب است.</p>`,
  image: '/images/products/keypad.png',
  gallery: ['/images/products/keypad.png', '/images/products/keypad-2.png'],
  catalogFile: '/catalogs/smart-keypad.pdf',
  category: { nameFa: 'کنترل دسترسی', slug: 'access-control' },
  brand: { name: 'Motorola', slug: 'motorola' },
  attributes: [
    { key: 'دسترسی بدون تماس با', value: '"Wave to Unlock"' },
    { key: 'احراز هویت چندعاملی', value: '(Multi-factor authentication)' },
    { key: 'دسترسی با', value: 'PIN' },
    { key: 'قابلیت قفل آنی', value: '(Lockdown)' },
  ],
}

const relatedProducts = [
  {
    id: '2',
    titleFa: 'VIDEO INTERCOM READER PRO',
    slug: 'video-intercom-reader-pro',
    shortDesc: 'دستگاه ویدیو اینترکام حرفه‌ای با قابلیت تشخیص چهره، ارتباط تصویری دوطرفه.',
    image: '/images/products/intercom.png',
  },
  {
    id: '3',
    titleFa: 'خوانده هوشمند استاندارد',
    slug: 'smart-reader-standard',
    shortDesc: 'ریدر کنترل دسترسی با قابلیت خواندن کارت‌های MIFARE و NFC.',
    image: '/images/products/smart-reader.png',
  },
  {
    id: '4',
    titleFa: 'کنترلر تک درب',
    slug: 'single-door-controller',
    shortDesc: 'کنترلر یک درب با قابلیت اتصال به شبکه و ظرفیت بالا.',
    image: '/images/products/controller.png',
  },
]

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params: _params }: PageProps): Promise<Metadata> {
  // In real app, fetch from database using _params.slug
  const product = mockProduct

  if (!product) {
    return { title: 'محصول یافت نشد' }
  }

  return {
    title: product.titleFa,
    description: product.shortDesc,
  }
}

export default function ProductPage({ params: _params }: PageProps) {
  // In real app, fetch from database using _params.slug
  const product = mockProduct

  if (!product) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'محصولات', url: '/products' },
    ...(product.category ? [{ name: product.category.nameFa, url: `/products/category/${product.category.slug}` }] : []),
    { name: product.titleFa, url: `/products/${product.slug}` },
  ]

  const productSchema = generateProductSchema({
    name: product.titleFa,
    description: product.shortDesc || '',
    image: getImageUrl(product.image),
    brand: product.brand?.name,
    category: product.category?.nameFa,
    url: `https://hatefertebat.ir/products/${product.slug}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Gallery - Right Side */}
              <div>
                <ProductGallery images={product.gallery || [product.image || '']} title={product.titleFa} />
              </div>

              {/* Info - Left Side */}
              <div>
                {/* Category Badge */}
                {product.category && (
                  <Link
                    href={`/products/category/${product.category.slug}`}
                    className="inline-block text-sm text-primary bg-orange-50 px-3 py-1 rounded-full mb-4"
                  >
                    {product.category.nameFa}
                  </Link>
                )}

                {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-dark mb-2">
                  {product.titleFa}
                </h1>

                {product.titleEn && (
                  <p className="text-gray-400 mb-4" dir="ltr">
                    {product.titleEn}
                  </p>
                )}

                {/* Short Description */}
                {product.shortDesc && (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.shortDesc}
                  </p>
                )}

                {/* Full Description */}
                {product.fullDesc && (
                  <div
                    className="prose prose-sm max-w-none text-gray-600 mb-6"
                    dangerouslySetInnerHTML={{ __html: product.fullDesc }}
                  />
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.catalogFile && (
                    <a
                      href={product.catalogFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      دریافت کاتالوگ
                    </a>
                  )}

                  <Link
                    href="#inquiry"
                    className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2.5 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    استعلام قیمت
                  </Link>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    پرینت
                  </button>
                </div>

                {/* Attributes */}
                {product.attributes && product.attributes.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="font-bold text-dark mb-4">ویژگی‌ها:</h3>
                    <ul className="space-y-2">
                      {product.attributes.map((attr, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>
                            {attr.key} {attr.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-dark mb-8">محصولات مشابه</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="inquiry" className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-dark mb-2 text-center">فرم درخواست قیمت</h2>
              <p className="text-gray-500 text-center mb-8">
                برای دریافت قیمت و مشاوره، فرم زیر را تکمیل کنید
              </p>
              <InquiryForm productId={product.id} productTitle={product.titleFa} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
