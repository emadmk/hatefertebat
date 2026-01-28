import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for product query
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  category: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['newest', 'oldest', 'title']).default('newest'),
})

// Mock products data
const mockProducts = [
  {
    id: '1',
    titleFa: 'صفحه کلید هوشمند استاندارد',
    titleEn: 'Smart Keypad Standard',
    slug: 'smart-keypad-standard',
    shortDescription: 'ریدر کنترل دسترسی حرفه‌ای',
    image: '/images/products/keypad.png',
    category: { id: '1', slug: 'access-control', nameFa: 'کنترل دسترسی' },
    brand: { id: '1', slug: 'motorola', name: 'Motorola' },
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    titleFa: 'VIDEO INTERCOM READER PRO',
    titleEn: 'Video Intercom Reader Pro',
    slug: 'video-intercom-reader-pro',
    shortDescription: 'دستگاه ویدیو اینترکام حرفه‌ای',
    image: '/images/products/intercom.png',
    category: { id: '1', slug: 'access-control', nameFa: 'کنترل دسترسی' },
    brand: { id: '1', slug: 'motorola', name: 'Motorola' },
    createdAt: '2024-01-14T00:00:00Z',
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse and validate query params
    const query = querySchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      category: searchParams.get('category'),
      brand: searchParams.get('brand'),
      search: searchParams.get('search'),
      sort: searchParams.get('sort'),
    })

    // Filter products
    let filteredProducts = [...mockProducts]

    if (query.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.slug === query.category
      )
    }

    if (query.brand) {
      filteredProducts = filteredProducts.filter(
        (p) => p.brand.slug === query.brand
      )
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.titleFa.toLowerCase().includes(searchLower) ||
          p.titleEn.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    switch (query.sort) {
      case 'oldest':
        filteredProducts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
      case 'title':
        filteredProducts.sort((a, b) => a.titleFa.localeCompare(b.titleFa, 'fa'))
        break
      default:
        filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }

    // Paginate
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / query.limit)
    const offset = (query.page - 1) * query.limit
    const products = filteredProducts.slice(offset, offset + query.limit)

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages,
        },
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid query parameters', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
