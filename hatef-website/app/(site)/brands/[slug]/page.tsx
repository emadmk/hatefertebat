import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Breadcrumb } from '@/components/common'
import ProductCard from '@/components/products/ProductCard'

const brandsData: Record<string, { name: string; logo: string; description: string }> = {
  motorola: {
    name: 'Motorola',
    logo: '/images/brands/motorola.png',
    description: 'موتورولا یکی از پیشگامان صنعت ارتباطات بی‌سیم است که تجهیزات حرفه‌ای و قابل اعتماد را برای صنایع مختلف ارائه می‌دهد.',
  },
  avigilon: {
    name: 'Avigilon',
    logo: '/images/brands/avigilon.png',
    description: 'آویژیلون ارائه‌دهنده راهکارهای پیشرفته نظارت تصویری با فناوری هوش مصنوعی و آنالیز ویدیویی است.',
  },
  cambium: {
    name: 'Cambium Networks',
    logo: '/images/brands/cambium.png',
    description: 'کمبیوم نتورکز راهکارهای شبکه بی‌سیم و اتصال را برای محیط‌های مختلف ارائه می‌دهد.',
  },
  industronic: {
    name: 'Industronic',
    logo: '/images/brands/industronic.png',
    description: 'ایندوسترونیک تولیدکننده سیستم‌های پیجینگ و اطلاع‌رسانی صنعتی با کیفیت بالا است.',
  },
}

const mockProducts = [
  { id: '1', titleFa: 'محصول نمونه ۱', slug: 'product-1', shortDesc: 'توضیحات محصول', image: '/images/products/keypad.png' },
  { id: '2', titleFa: 'محصول نمونه ۲', slug: 'product-2', shortDesc: 'توضیحات محصول', image: '/images/products/intercom.png' },
  { id: '3', titleFa: 'محصول نمونه ۳', slug: 'product-3', shortDesc: 'توضیحات محصول', image: '/images/products/reader.png' },
]

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const brand = brandsData[params.slug]
  if (!brand) return { title: 'برند یافت نشد' }
  return { title: brand.name, description: brand.description }
}

export default function BrandPage({ params }: PageProps) {
  const brand = brandsData[params.slug]
  if (!brand) notFound()

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'برندها', url: '/brands' },
    { name: brand.name, url: `/brands/${params.slug}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="relative w-48 h-24 mx-auto mb-6">
            <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-dark mb-4">{brand.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{brand.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-dark mb-8">محصولات {brand.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCompare={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
