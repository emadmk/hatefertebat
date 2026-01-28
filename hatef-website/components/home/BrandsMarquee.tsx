'use client'

import Image from 'next/image'
import Link from 'next/link'

const brands = [
  { name: 'Motorola', slug: 'motorola', logo: '/images/brands/motorola.png' },
  { name: 'Avigilon', slug: 'avigilon', logo: '/images/brands/avigilon.png' },
  { name: 'Cambium Networks', slug: 'cambium', logo: '/images/brands/cambium.png' },
  { name: 'Industronic', slug: 'industronic', logo: '/images/brands/industronic.png' },
]

export default function BrandsMarquee() {
  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <section className="bg-white py-8 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-gray-500 text-sm font-medium">نمایندگی رسمی برندها</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee">
          {duplicatedBrands.map((brand, index) => (
            <Link
              key={`${brand.slug}-${index}`}
              href={`/brands/${brand.slug}`}
              className="flex-shrink-0 mx-8 lg:mx-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <div className="relative w-32 h-16">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
