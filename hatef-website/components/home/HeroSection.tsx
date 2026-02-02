'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    id: 1,
    brandName: 'Avigilon',
    image: '/images/01.webp',
    title: 'شرکت هاتف ارائه دهنده انواع محصولات از برند',
    titleBrand: 'Avigilon',
    description: 'Avigilon، امنیت را با اعتمادی بی‌نظیر تجربه کنید. فناوری‌های پیشرفته و راهکارهای نوآورانه این برند، تضمین‌کننده حفاظتی بی‌همتا می‌باشند.',
    productsLink: '/products',
    servicesLink: '/services',
  },
  {
    id: 2,
    brandName: 'SIAE',
    image: '/images/02.webp',
    title: 'تجربه ارتباطات با بالاترین سطح با برند',
    titleBrand: 'SIAE',
    description: 'SIAE، اطمینان بی‌نظیر را تجربه کنید. راهکارهای حفاظتی پیشرفته و سیستم‌های نوآورانه آن به شما امنیتی بی‌مانند ارائه می‌دهند.',
    productsLink: '/products',
    servicesLink: '/services',
  },
  {
    id: 3,
    brandName: 'Motorola',
    image: '/images/03.webp',
    title: 'از جدیدترین تجهیزات بهترین تجربه را با',
    titleBrand: 'Motorola',
    titleSuffix: 'تجربه کنید',
    description: 'سفر تکنولوژی با طراحی مدرن، اتصالات پرسرعت و کارایی بی‌نظیر، ما به عنوان همراه قابل اعتمادتان، همیشه در کنار شما هستیم. از جدیدترین تجهیزات بهترین تجربه را با Motorola تجربه کنید.',
    productsLink: '/products',
    servicesLink: '/services',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slide = slides[currentSlide]

  return (
    <section className="relative bg-gradient-to-bl from-gray-100 via-gray-50 to-white overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-200/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-8 lg:py-16 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[500px] lg:min-h-[600px]">

          {/* Brand Name - Vertical on left side */}
          <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.brandName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="text-gray-300 text-6xl xl:text-7xl font-bold tracking-wider"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)'
                }}
              >
                {slide.brandName}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Image - Left Side */}
          <div className="relative order-1 lg:order-1 flex justify-center lg:justify-start lg:pr-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={slide.image}
                    alt={slide.brandName}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content - Right Side */}
          <div className="order-2 lg:order-2 text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark leading-tight mb-6">
                  {slide.title}{' '}
                  <span className="text-primary">{slide.titleBrand}</span>
                  {slide.titleSuffix && (
                    <>
                      <br />
                      {slide.titleSuffix}
                    </>
                  )}
                </h1>

                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-xl mr-auto">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4 justify-end">
                  <Link
                    href={slide.productsLink}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    محصولات
                  </Link>
                  <Link
                    href={slide.servicesLink}
                    className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    خدمات
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8 lg:mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`رفتن به اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Brand Name */}
      <div className="lg:hidden absolute bottom-24 left-4 z-10">
        <span className="text-gray-200 text-4xl font-bold tracking-wider opacity-50">
          {slide.brandName}
        </span>
      </div>
    </section>
  )
}
