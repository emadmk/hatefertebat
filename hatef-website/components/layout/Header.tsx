'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/seo'
import { trackPhoneClick } from '@/lib/analytics'

// Product categories with hierarchy based on WordPress menu
const productCategories = [
  {
    name: 'CCTV',
    slug: 'cctv',
    children: [
      { name: 'Access Control', slug: 'access-control' },
      { name: 'Security Cameras', slug: 'security-cameras' },
    ],
  },
  {
    name: 'Microwave',
    slug: 'microwave',
    children: [
      { name: 'Hardware Products', slug: 'hardware-products' },
      { name: 'Software Products', slug: 'software-products' },
    ],
  },
  {
    name: 'Paging',
    slug: 'paging',
    children: [
      { name: 'Explosion-Proof', slug: 'explosion-proof' },
      { name: 'Indoor', slug: 'indoor' },
      { name: 'Outdoor', slug: 'outdoor' },
    ],
  },
  {
    name: 'Radio',
    slug: 'radio',
    children: [
      { name: 'DMR', slug: 'dmr' },
      { name: 'MOTOTRBO', slug: 'mototrbo' },
      { name: 'TETRA', slug: 'tetra' },
      { name: 'Portable Radios', slug: 'portable-radios' },
      { name: 'Mobile Radios', slug: 'mobile-radios' },
      { name: 'Project 25 Radios', slug: 'project-25-radios' },
    ],
  },
  {
    name: 'Wireless',
    slug: 'wireless',
    children: [
      { name: 'MESH', slug: 'mesh' },
      { name: 'Point to Multipoint', slug: 'point-to-multipoint' },
      { name: 'Point to Point', slug: 'point-to-point' },
      { name: 'WLAN', slug: 'wlan' },
    ],
  },
]

const brands = [
  { name: 'Avigilon', slug: 'avigilon' },
  { name: 'Cambium Networks', slug: 'cambium-networks' },
  { name: 'Motorola', slug: 'motorola' },
  { name: 'Siae Microelettronica', slug: 'siae-microelettronica' },
]

const navigation = [
  { name: 'خانه', href: '/' },
  { name: 'محصولات', href: '/products', hasMegaMenu: 'products' },
  { name: 'برندها', href: '/brands', hasMegaMenu: 'brands' },
  { name: 'خدمات', href: '/services' },
  { name: 'کاتالوگ', href: 'https://hatef.ctdg.ir/', external: true },
  { name: 'وبلاگ', href: '/blog' },
  { name: 'تماس با ما', href: '/contact' },
  { name: 'درباره ما', href: '/about' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setOpenDropdown(itemName)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

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
                src="/images/hatef-logo.webp"
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
                onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.name)}
                onMouseLeave={() => item.hasMegaMenu && handleMouseLeave()}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 text-gray-600 hover:text-primary"
                  >
                    {item.name}
                  </a>
                ) : (
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
                    {item.hasMegaMenu && (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </Link>
                )}

                {/* Products Mega Menu */}
                {item.hasMegaMenu === 'products' && openDropdown === item.name && (
                  <div className="absolute top-full right-0 pt-2">
                    <div className="bg-white rounded-lg shadow-dropdown p-4 animate-slide-down border border-gray-100 min-w-[500px]">
                      <Link
                        href="/products"
                        className="block px-3 py-2 mb-2 text-sm font-bold text-primary hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        همه محصولات
                      </Link>
                      <div className="grid grid-cols-2 gap-4">
                        {productCategories.map((category) => (
                          <div key={category.slug} className="space-y-1">
                            <Link
                              href={`/products/category/${category.slug}`}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-dark hover:text-primary transition-colors"
                            >
                              <ChevronLeft className="w-3 h-3" />
                              {category.name}
                            </Link>
                            {category.children && (
                              <div className="mr-4 space-y-0.5 border-r-2 border-orange-200 pr-2">
                                {category.children.map((child) => (
                                  <Link
                                    key={child.slug}
                                    href={`/products/category/${child.slug}`}
                                    className="block px-3 py-1.5 text-xs text-gray-600 hover:text-primary transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Brands Dropdown */}
                {item.hasMegaMenu === 'brands' && openDropdown === item.name && (
                  <div className="absolute top-full right-0 pt-2 w-56">
                    <div className="bg-white rounded-lg shadow-dropdown py-2 animate-slide-down border border-gray-100">
                      <Link
                        href="/brands"
                        className="block px-4 py-2.5 text-sm font-bold text-primary hover:bg-orange-50 transition-colors border-b border-gray-100 mb-1"
                      >
                        همه برندها
                      </Link>
                      {brands.map((brand) => (
                        <Link
                          key={brand.slug}
                          href={`/brands/${brand.slug}`}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-orange-50 transition-colors"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
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
        <div className="lg:hidden bg-white border-t mt-2 animate-slide-down max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 rounded-lg font-medium transition-colors text-dark hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ) : (
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
                )}

                {/* Mobile Products Menu */}
                {item.hasMegaMenu === 'products' && (
                  <div className="mr-4 mt-1 space-y-2 border-r-2 border-orange-200 pr-2">
                    {productCategories.map((category) => (
                      <div key={category.slug}>
                        <Link
                          href={`/products/category/${category.slug}`}
                          className="block px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors"
                        >
                          {category.name}
                        </Link>
                        {category.children && (
                          <div className="mr-4 space-y-0.5 border-r border-gray-200 pr-2">
                            {category.children.map((child) => (
                              <Link
                                key={child.slug}
                                href={`/products/category/${child.slug}`}
                                className="block px-3 py-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile Brands Menu */}
                {item.hasMegaMenu === 'brands' && (
                  <div className="mr-4 mt-1 space-y-1 border-r-2 border-orange-200 pr-2">
                    {brands.map((brand) => (
                      <Link
                        key={brand.slug}
                        href={`/brands/${brand.slug}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {brand.name}
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
