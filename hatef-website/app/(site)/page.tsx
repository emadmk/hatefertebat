import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import BrandsMarquee from '@/components/home/BrandsMarquee'
import CategoriesSection from '@/components/home/CategoriesSection'
import ServicesSection from '@/components/home/ServicesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import AboutSection from '@/components/home/AboutSection'
import LatestPosts from '@/components/home/LatestPosts'
import CtaSection from '@/components/home/CtaSection'

export const metadata: Metadata = {
  title: 'کرمان هاتف ارتباط | تجهیزات مخابراتی و امنیتی',
  description:
    'نمایندگی رسمی موتورولا، آویژیلون، کمبیوم و ایندوسترونیک در ایران. ارائه تجهیزات مخابراتی، دوربین مداربسته، سیستم‌های امنیتی و کنترل دسترسی با بیش از ۱۸ سال سابقه.',
  keywords: [
    'تجهیزات مخابراتی',
    'دوربین مداربسته',
    'سیستم امنیتی',
    'موتورولا',
    'آویژیلون',
    'کمبیوم',
    'ایندوسترونیک',
    'کنترل دسترسی',
    'پیجینگ',
  ],
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsMarquee />
      <CategoriesSection />
      <ServicesSection />
      <FeaturedProducts />
      <AboutSection />
      <LatestPosts />
      <CtaSection />
    </>
  )
}
