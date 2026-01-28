'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Scale, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getImageUrl } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    titleFa: string
    titleEn?: string | null
    slug: string
    shortDesc?: string | null
    image?: string | null
    category?: { nameFa: string; slug: string } | null
    brand?: { name: string; slug: string } | null
  }
  showCompare?: boolean
  onCompareClick?: (id: string) => void
  isInCompare?: boolean
  className?: string
}

export default function ProductCard({
  product,
  showCompare = true,
  onCompareClick,
  isInCompare = false,
  className,
}: ProductCardProps) {
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onCompareClick?.(product.id)
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={getImageUrl(product.image)}
          alt={product.titleFa}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Brand Badge */}
        {product.brand && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-white/90 backdrop-blur rounded text-xs font-medium text-dark shadow-sm">
              {product.brand.name}
            </span>
          </div>
        )}

        {/* Compare Button */}
        {showCompare && (
          <button
            onClick={handleCompareClick}
            className={cn(
              'absolute top-3 left-3 p-2 rounded-lg transition-all duration-200',
              isInCompare
                ? 'bg-primary text-white'
                : 'bg-white/90 backdrop-blur text-gray-600 hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100'
            )}
            title={isInCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
          >
            <Scale className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-primary font-medium">
            {product.category.nameFa}
          </span>
        )}

        {/* Title */}
        <h3 className="text-dark font-bold mt-1 mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.titleFa}
        </h3>

        {product.titleEn && (
          <p className="text-gray-400 text-sm mb-2" dir="ltr">
            {product.titleEn}
          </p>
        )}

        {/* Description */}
        {product.shortDesc && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {product.shortDesc}
          </p>
        )}

        {/* CTA */}
        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
          مشاهده جزئیات
          <ArrowLeft className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
