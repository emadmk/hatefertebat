'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Phone,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/seo'
import { trackPhoneClick } from '@/lib/analytics'

const navigation = [
  { name: 'خانه', href: '/' },
  {
    name: 'محصولات',
    href: '/products',
    children: [
      { name: 'همه محصولات', href: '/products' },
      { name: 'دوربین مداربسته', href: '/products/category/cctv' },
      { name: 'کنترل دسترسی', href: '/products/category/access-control' },
      { name: 'بی‌سیم و مخابراتی', href: '/products/category/wireless' },
      { name: 'پیجینگ', href: '/products/category/paging' },
    ],
  },
  {
    name: 'برندها',
    href: '/brands',
    children: [
      { name: 'Motorola', href: '/brands/motorola' },
      { name: 'Avigilon', href: '/brands/avigilon' },
      { name: 'Cambium Networks', href: '/brands/cambium' },
      { name: 'Industronic', href: '/brands/industronic' },
    ],
  },
  { name: 'خدمات', href: '/services' },
  { name: 'کاتالوگ', href: '/catalog' },
  { name: 'وبلاگ', href: '/blog' },
  { name: 'تماس با ما', href: '/contact' },
  { name: 'درباره ما', href: '/about' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const handlePhoneClick = () => {
    trackPhoneClick()
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
        isScrolled ? 'shadow-md py-2' : 'py-3'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Right Side */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-14">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-dark leading-tight">{siteConfig.name}</h1>
              <p className="text-xs text-gray-400">{siteConfig.nameEn}</p>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1',
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  )}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-dropdown py-2 animate-slide-down border border-gray-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-orange-50 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Phone - Left Side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={handlePhoneClick}
              className="hidden md:flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span className="text-sm font-bold" dir="ltr">{siteConfig.phone}</span>
              <Phone className="w-5 h-5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-dark"
              aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t mt-2 animate-slide-down">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'block px-4 py-2.5 rounded-lg font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-orange-50 text-primary'
                      : 'text-dark hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="mr-4 mt-1 space-y-1 border-r-2 border-orange-200 pr-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Phone */}
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={handlePhoneClick}
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg mt-4"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium" dir="ltr">{siteConfig.phone}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
