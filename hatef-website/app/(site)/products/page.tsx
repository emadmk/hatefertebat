import { Metadata } from 'next'
import ProductCard from '@/components/products/ProductCard'
import { Breadcrumb, Pagination } from '@/components/common'
import CategorySidebar from '@/components/products/CategorySidebar'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'محصولات',
  description: 'مشاهده تمامی محصولات کرمان هاتف ارتباط شامل دوربین مداربسته، کنترل دسترسی، تجهیزات بی‌سیم و سیستم پیجینگ',
}

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

async function getProducts(page: number = 1, limit: number = 12) {
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, nameFa: true, nameEn: true, slug: true } },
        brand: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where: { status: 'PUBLISHED' } }),
  ])

  return {
    products,
    totalPages: Math.ceil(total / limit),
  }
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { nameFa: 'asc' },
  })

  return categories.map((cat) => ({
    id: cat.id,
    nameFa: cat.nameFa,
    slug: cat.slug,
    count: cat._count.products,
  }))
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)

  const [{ products, totalPages }, categories] = await Promise.all([
    getProducts(currentPage),
    getCategories(),
  ])

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
            <CategorySidebar categories={categories} />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={false} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/products" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
