'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

const mockProducts = [
  {
    id: '1',
    title: 'بی‌سیم موتورولا DP4801e',
    slug: 'dp4801e',
    image: '/images/products/dp4801e.jpg',
    category: 'بی‌سیم و مخابراتی',
    brand: 'Motorola',
    status: 'active',
    createdAt: '۱۴۰۲/۱۰/۰۱',
  },
  {
    id: '2',
    title: 'دوربین مداربسته Avigilon H5A',
    slug: 'avigilon-h5a',
    image: '/images/products/avigilon-h5a.jpg',
    category: 'دوربین مداربسته',
    brand: 'Avigilon',
    status: 'active',
    createdAt: '۱۴۰۲/۰۹/۲۵',
  },
  {
    id: '3',
    title: 'رادیو لینک Cambium PTP 550',
    slug: 'cambium-ptp550',
    image: '/images/products/cambium-ptp550.jpg',
    category: 'شبکه',
    brand: 'Cambium Networks',
    status: 'draft',
    createdAt: '۱۴۰۲/۰۹/۲۰',
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-dark">محصولات</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن محصول
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">همه دسته‌بندی‌ها</option>
            <option value="cctv">دوربین مداربسته</option>
            <option value="wireless">بی‌سیم و مخابراتی</option>
            <option value="access">کنترل دسترسی</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">همه برندها</option>
            <option value="motorola">Motorola</option>
            <option value="avigilon">Avigilon</option>
            <option value="cambium">Cambium Networks</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  محصول
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  دسته‌بندی
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  برند
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  وضعیت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  تاریخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark">{product.title}</h3>
                        <p className="text-xs text-gray-400">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {product.status === 'active' ? 'فعال' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="مشاهده"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="ویرایش"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-500">
            نمایش ۱ تا ۳ از ۱۲۵ محصول
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              قبلی
            </button>
            <button className="px-3 py-1 bg-primary text-white rounded">۱</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">۲</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">۳</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
