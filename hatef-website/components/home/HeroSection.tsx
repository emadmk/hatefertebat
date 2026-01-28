'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
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
              {/* Main Image */}
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/hero-motorola.png"
                  alt="Motorola Radio"
                  fill
                  className="object-contain"
                  priority
                />
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
            <Link href="/brands/industronic" className="group">
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <Image
                  src="/images/brands/industronic.png"
                  alt="Industronic"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/brands/cambium" className="group">
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <Image
                  src="/images/brands/cambium.png"
                  alt="Cambium Networks"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/brands/motorola" className="group">
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <Image
                  src="/images/brands/motorola.png"
                  alt="Motorola"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/brands/avigilon" className="group">
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <Image
                  src="/images/brands/avigilon.png"
                  alt="Avigilon"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
