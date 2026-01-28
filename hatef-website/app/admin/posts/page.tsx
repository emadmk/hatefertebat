'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

const mockPosts = [
  {
    id: '1',
    title: 'راهنمای انتخاب دوربین مداربسته مناسب',
    slug: 'choosing-right-cctv',
    image: '/images/blog/cctv-guide.jpg',
    author: 'تیم فنی',
    category: 'راهنما',
    status: 'published',
    publishedAt: '۱۴۰۲/۰۹/۱۵',
  },
  {
    id: '2',
    title: 'مزایای سیستم‌های کنترل دسترسی هوشمند',
    slug: 'smart-access-control-benefits',
    image: '/images/blog/access-control.jpg',
    author: 'تیم فنی',
    category: 'مقاله',
    status: 'published',
    publishedAt: '۱۴۰۲/۰۸/۲۰',
  },
  {
    id: '3',
    title: 'معرفی تجهیزات جدید موتورولا',
    slug: 'new-motorola-products',
    image: '/images/blog/motorola-new.jpg',
    author: 'تیم فنی',
    category: 'اخبار',
    status: 'draft',
    publishedAt: '-',
  },
]

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-dark">مقالات وبلاگ</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن مقاله
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی مقاله..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">همه دسته‌ها</option>
            <option value="news">اخبار</option>
            <option value="guide">راهنما</option>
            <option value="article">مقاله</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">همه وضعیت‌ها</option>
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  مقاله
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  نویسنده
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  دسته
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
              {mockPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark line-clamp-1">{post.title}</h3>
                        <p className="text-xs text-gray-400">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.author}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.publishedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="مشاهده"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
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
      </div>
    </div>
  )
}
