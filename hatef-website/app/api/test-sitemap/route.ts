import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    // Test products - with isActive filter
    const productsActive = await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, slug: true, isActive: true },
      take: 5,
    })

    // Test products - without filter
    const productsAll = await prisma.product.findMany({
      select: { id: true, slug: true, isActive: true },
      take: 5,
    })

    // Test brands
    const brands = await prisma.brand.findMany({
      select: { id: true, slug: true, isActive: true },
      take: 5,
    })

    // Test categories
    const categories = await prisma.category.findMany({
      select: { id: true, slug: true, isActive: true },
      take: 5,
    })

    return NextResponse.json({
      productsWithIsActiveTrue: productsActive,
      productsWithoutFilter: productsAll,
      brands,
      categories,
      counts: {
        productsActive: productsActive.length,
        productsAll: productsAll.length,
        brands: brands.length,
        categories: categories.length,
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Database error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
