'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react'

const mockCategories = [
  {
    id: '1',
    nameFa: 'دوربین مداربسته',
    nameEn: 'CCTV',
    slug: 'cctv',
    productCount: 45,
  },
  {
    id: '2',
    nameFa: 'بی‌سیم و مخابراتی',
    nameEn: 'Wireless',
    slug: 'wireless',
    productCount: 32,
  },
  {
    id: '3',
    nameFa: 'کنترل دسترسی',
    nameEn: 'Access Control',
    slug: 'access-control',
    productCount: 18,
  },
  {
    id: '4',
    nameFa: 'پیجینگ',
    nameEn: 'Paging',
    slug: 'paging',
    productCount: 12,
  },
  {
    id: '5',
    nameFa: 'شبکه',
    nameEn: 'Network',
    slug: 'network',
    productCount: 18,
  },
]

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(null)

  const openAddModal = () => {
    setEditingCategory(null)
    setShowModal(true)
  }

  const openEditModal = (category: typeof mockCategories[0]) => {
    setEditingCategory(category)
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">دسته‌بندی‌ها</h1>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن دسته‌بندی
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase w-12">
                ترتیب
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                نام فارسی
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                نام انگلیسی
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                اسلاگ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تعداد محصول
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical className="w-5 h-5" />
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-dark">
                  {category.nameFa}
                </td>
                <td className="px-6 py-4 text-gray-500" dir="ltr">
                  {category.nameEn}
                </td>
                <td className="px-6 py-4 text-gray-500" dir="ltr">
                  {category.slug}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {category.productCount} محصول
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(category)}
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
              <h2 className="font-bold text-dark">
                {editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی'}
              </h2>
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
                  نام فارسی *
                </label>
                <input
                  type="text"
                  defaultValue={editingCategory?.nameFa}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="دوربین مداربسته"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام انگلیسی
                </label>
                <input
                  type="text"
                  defaultValue={editingCategory?.nameEn}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="CCTV"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسلاگ
                </label>
                <input
                  type="text"
                  defaultValue={editingCategory?.slug}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="cctv"
                  dir="ltr"
                />
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
