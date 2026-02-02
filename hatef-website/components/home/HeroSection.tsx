'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Radio } from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  logo: string | null
}

export default function HeroSection() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    fetch('/api/brands')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setBrands(data.data.slice(0, 4))
        }
      })
      .catch(console.error)
  }, [])

  return (
    <section className="relative bg-gray-100 overflow-hidden min-h-[600px]">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-dark leading-tight mb-6">
              از جدیدترین تجهیزات بهترین تجربه را با{' '}
              <span className="text-primary">Motorola</span>
              <br />
              تجربه کنید
            </h1>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              سایت حاضر به شرکت یا فروشگاه است و از تجهیزات مدرن MOTOROLA پشتیبانی می‌کند. برنامه ریزی‌های لازم را تنظیم می‌کند.
            </p>
          </motion.div>

          {/* Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
              {/* Main Image Placeholder */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <Radio className="w-32 h-32 text-primary/30" />
              </div>

              {/* Brand Label */}
              <div className="absolute top-4 left-4 text-gray-400 text-lg font-light tracking-wider rotate-[-90deg] origin-top-left">
                Motorola
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brands Showcase */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-gray-500 text-sm mb-6">دسته بندی محصولات</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {brands.length > 0 ? (
              brands.map((brand) => (
                <Link key={brand.id} href={`/brands/${brand.slug}`} className="group">
                  <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 flex items-center justify-center">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-lg font-medium text-gray-600 group-hover:text-primary transition-colors">
                        {brand.name}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Link href="/brands/motorola" className="group">
                  <div className="relative w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <span className="text-lg font-medium text-gray-600 group-hover:text-primary transition-colors">
                      Motorola
                    </span>
                  </div>
                </Link>
                <Link href="/brands/avigilon" className="group">
                  <div className="relative w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <span className="text-lg font-medium text-gray-600 group-hover:text-primary transition-colors">
                      Avigilon
                    </span>
                  </div>
                </Link>
                <Link href="/brands/cambium" className="group">
                  <div className="relative w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <span className="text-lg font-medium text-gray-600 group-hover:text-primary transition-colors">
                      Cambium
                    </span>
                  </div>
                </Link>
                <Link href="/brands/industronic" className="group">
                  <div className="relative w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <span className="text-lg font-medium text-gray-600 group-hover:text-primary transition-colors">
                      Industronic
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
