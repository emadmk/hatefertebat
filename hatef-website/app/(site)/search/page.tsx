'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Package, FileText, Wrench } from 'lucide-react'
import { Breadcrumb } from '@/components/common'

const mockResults = {
  products: [
    {
      id: '1',
      title: 'بی‌سیم موتورولا DP4801e',
      slug: 'dp4801e',
      image: '/images/products/dp4801e.jpg',
      category: 'بی‌سیم و مخابراتی',
    },
    {
      id: '2',
      title: 'دوربین مداربسته Avigilon H5A',
      slug: 'avigilon-h5a',
      image: '/images/products/avigilon-h5a.jpg',
      category: 'دوربین مداربسته',
    },
  ],
  posts: [
    {
      id: '1',
      title: 'راهنمای انتخاب دوربین مداربسته مناسب',
      slug: 'choosing-right-cctv',
      excerpt: 'در این مقاله به بررسی نکات مهم در انتخاب دوربین مداربسته می‌پردازیم.',
    },
  ],
  services: [
    {
      id: '1',
      title: 'نصب و راه‌اندازی دوربین مداربسته',
      slug: 'cctv-installation',
      description: 'نصب حرفه‌ای انواع سیستم‌های نظارت تصویری',
    },
  ],
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'جستجو', url: '/search' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setHasSearched(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-dark text-center mb-6">جستجو</h1>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="نام محصول، خدمات یا مقاله را جستجو کنید..."
                className="w-full px-6 py-4 pr-14 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!hasSearched ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              عبارت مورد نظر خود را جستجو کنید
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Products */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-dark">محصولات</h2>
                <span className="text-sm text-gray-400">({mockResults.products.length} نتیجه)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockResults.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="relative aspect-square bg-gray-50">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-primary">{product.category}</span>
                      <h3 className="font-medium text-dark mt-1 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-dark">مقالات</h2>
                <span className="text-sm text-gray-400">({mockResults.posts.length} نتیجه)</span>
              </div>

              <div className="space-y-4">
                {mockResults.posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-dark">خدمات</h2>
                <span className="text-sm text-gray-400">({mockResults.services.length} نتیجه)</span>
              </div>

              <div className="space-y-4">
                {mockResults.services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
