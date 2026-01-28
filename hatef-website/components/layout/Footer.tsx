import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle,
} from 'lucide-react'
import { siteConfig } from '@/lib/seo'

const footerLinks = [
  { name: 'محصولات', href: '/products' },
  { name: 'خدمات', href: '/services' },
  { name: 'درباره ما', href: '/about' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* About Section - Right */}
          <div>
            <h3 className="font-bold text-lg mb-4">درباره ما</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              این شرکت در زمینه تجهیزات مخابراتی فعالیت دارد. با استفاده از تجهیزات مدرن، دوربین مداربسته می‌تواند خدمات امنیتی و نظارتی را ارائه دهد. همچنین خدمات ارتباطی و پیام رسانی را در زمینه مخابرات عرضه می‌کند.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              این شرکت با داشتن تخصص و تجربه فنی قوی، ارتباط موثر و پایداری با مشتریان خود برقرار کرده و در صنعت مخابرات و ارتباطات به رتبه بسیار بالایی دست یافته است.
            </p>
          </div>

          {/* Links Section - Center */}
          <div>
            <h3 className="font-bold text-lg mb-4">پیوندها</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo & Social - Left */}
          <div className="flex flex-col items-start lg:items-end">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2.5 bg-slate-700 rounded text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-slate-700 rounded text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-700 rounded text-gray-300 hover:text-white hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            {/* Copyright - Right */}
            <p className="text-gray-400">
              طراحی خارجی سایت و حق کپی‌رایت ®{' '}
              <span className="text-primary">آی‌سرویس</span> از ۱۳۹۹
            </p>

            {/* Contact Info - Center */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-300">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="text-primary">شماره تماس:</span>
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
            </div>

            {/* Address - Left */}
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs">
                تهران، رسالت، مجیدیه شمالی، خ اردکانی، کوچه مهتابی پور، پلاک ۲۸
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
