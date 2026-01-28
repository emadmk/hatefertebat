'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Download, FileText, Upload } from 'lucide-react'

const mockCatalogs = [
  {
    id: '1',
    title: 'کاتالوگ دوربین‌های مداربسته Avigilon',
    filename: 'avigilon-cctv.pdf',
    size: '۵.۲ مگابایت',
    category: 'دوربین مداربسته',
    downloads: 156,
    createdAt: '۱۴۰۲/۰۹/۱۰',
  },
  {
    id: '2',
    title: 'کاتالوگ بی‌سیم‌های موتورولا',
    filename: 'motorola-radios.pdf',
    size: '۳.۸ مگابایت',
    category: 'بی‌سیم و مخابراتی',
    downloads: 234,
    createdAt: '۱۴۰۲/۰۸/۲۵',
  },
  {
    id: '3',
    title: 'کاتالوگ سیستم‌های کنترل دسترسی',
    filename: 'access-control.pdf',
    size: '۲.۵ مگابایت',
    category: 'کنترل دسترسی',
    downloads: 89,
    createdAt: '۱۴۰۲/۰۸/۱۵',
  },
]

export default function CatalogsPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">کاتالوگ‌ها</h1>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن کاتالوگ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                کاتالوگ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                دسته‌بندی
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                حجم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                دانلود
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
            {mockCatalogs.map((catalog) => (
              <tr key={catalog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark">{catalog.title}</h3>
                      <p className="text-xs text-gray-400">{catalog.filename}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {catalog.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {catalog.size}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {catalog.downloads} بار
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {catalog.createdAt}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="دانلود"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="ویرایش"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-dark">افزودن کاتالوگ</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="کاتالوگ محصولات..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  دسته‌بندی
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">انتخاب دسته‌بندی</option>
                  <option value="cctv">دوربین مداربسته</option>
                  <option value="wireless">بی‌سیم و مخابراتی</option>
                  <option value="access">کنترل دسترسی</option>
                  <option value="general">عمومی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="توضیحات کوتاه..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فایل PDF *
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-orange-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">آپلود فایل PDF</p>
                    <p className="text-xs text-gray-400">حداکثر ۱۰ مگابایت</p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf" />
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  ذخیره
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
