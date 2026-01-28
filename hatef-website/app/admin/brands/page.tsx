'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Edit, Trash2, Upload } from 'lucide-react'

const mockBrands = [
  {
    id: '1',
    name: 'Motorola',
    slug: 'motorola',
    logo: '/images/brands/motorola.png',
    productCount: 35,
    isActive: true,
  },
  {
    id: '2',
    name: 'Avigilon',
    slug: 'avigilon',
    logo: '/images/brands/avigilon.png',
    productCount: 28,
    isActive: true,
  },
  {
    id: '3',
    name: 'Cambium Networks',
    slug: 'cambium',
    logo: '/images/brands/cambium.png',
    productCount: 22,
    isActive: true,
  },
  {
    id: '4',
    name: 'Industronic',
    slug: 'industronic',
    logo: '/images/brands/industronic.png',
    productCount: 15,
    isActive: true,
  },
]

export default function BrandsPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingBrand, setEditingBrand] = useState<typeof mockBrands[0] | null>(null)

  const openAddModal = () => {
    setEditingBrand(null)
    setShowModal(true)
  }

  const openEditModal = (brand: typeof mockBrands[0]) => {
    setEditingBrand(brand)
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">برندها</h1>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن برند
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockBrands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative aspect-[3/2] bg-gray-50 p-6">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-dark">{brand.name}</h3>
                <span
                  className={`w-2 h-2 rounded-full ${
                    brand.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {brand.productCount} محصول
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(brand)}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  ویرایش
                </button>
                <button className="p-2 border rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-dark">
                {editingBrand ? 'ویرایش برند' : 'افزودن برند'}
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
                  نام برند *
                </label>
                <input
                  type="text"
                  defaultValue={editingBrand?.name}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Motorola"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسلاگ
                </label>
                <input
                  type="text"
                  defaultValue={editingBrand?.slug}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="motorola"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  لوگو
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-orange-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">آپلود لوگو</p>
                    <p className="text-xs text-gray-400">PNG, SVG - حداکثر ۱ مگابایت</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="توضیحات برند..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" defaultChecked={editingBrand?.isActive ?? true} />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  فعال
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
