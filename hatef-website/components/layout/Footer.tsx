import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle,
} from 'lucide-react'
import { siteConfig } from '@/lib/seo'

const footerLinks = {
  products: {
    title: 'محصولات',
    links: [
      { name: 'دوربین مداربسته', href: '/products/category/cctv' },
      { name: 'کنترل دسترسی', href: '/products/category/access-control' },
      { name: 'تجهیزات بی‌سیم', href: '/products/category/wireless' },
      { name: 'سیستم پیجینگ', href: '/products/category/paging' },
      { name: 'همه محصولات', href: '/products' },
    ],
  },
  company: {
    title: 'شرکت',
    links: [
      { name: 'درباره ما', href: '/about' },
      { name: 'خدمات', href: '/services' },
      { name: 'پروژه‌ها', href: '/projects' },
      { name: 'گواهینامه‌ها', href: '/certificates' },
      { name: 'تماس با ما', href: '/contact' },
    ],
  },
  resources: {
    title: 'منابع',
    links: [
      { name: 'کاتالوگ‌ها', href: '/catalog' },
      { name: 'وبلاگ', href: '/blog' },
      { name: 'سوالات متداول', href: '/faq' },
      { name: 'مقایسه محصولات', href: '/compare' },
    ],
  },
  brands: {
    title: 'برندها',
    links: [
      { name: 'Motorola', href: '/brands/motorola' },
      { name: 'Avigilon', href: '/brands/avigilon' },
      { name: 'Cambium Networks', href: '/brands/cambium' },
      { name: 'Industronic', href: '/brands/industronic' },
    ],
  },
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1">
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-bold">{siteConfig.name}</h2>
                <p className="text-xs text-gray-400">{siteConfig.nameEn}</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              نمایندگی رسمی موتورولا، آویژیلون، کمبیوم و ایندوسترونیک در ایران
              با بیش از {siteConfig.experience} سال سابقه
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">{siteConfig.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="p-2 bg-dark-700 rounded-lg text-gray-400 hover:text-white hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-dark-700 rounded-lg text-gray-400 hover:text-white hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-700 rounded-lg text-gray-400 hover:text-white hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {siteConfig.name}. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                حریم خصوصی
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                قوانین استفاده
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
