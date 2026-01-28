'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Edit, Trash2, Upload } from 'lucide-react'

const mockCertificates = [
  {
    id: '1',
    title: 'نمایندگی رسمی Motorola Solutions',
    issuer: 'Motorola Solutions',
    image: '/images/certificates/motorola-cert.jpg',
    year: '۲۰۲۳',
    isActive: true,
  },
  {
    id: '2',
    title: 'نمایندگی رسمی Avigilon',
    issuer: 'Avigilon Corporation',
    image: '/images/certificates/avigilon-cert.jpg',
    year: '۲۰۲۳',
    isActive: true,
  },
  {
    id: '3',
    title: 'نمایندگی Cambium Networks',
    issuer: 'Cambium Networks',
    image: '/images/certificates/cambium-cert.jpg',
    year: '۲۰۲۳',
    isActive: true,
  },
]

export default function CertificatesAdminPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">گواهینامه‌ها</h1>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن گواهینامه
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCertificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative aspect-[4/3] bg-gray-50">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-primary font-medium">{cert.issuer}</span>
                <span className="text-xs text-gray-400">{cert.year}</span>
              </div>
              <h3 className="font-medium text-dark mb-3">{cert.title}</h3>
              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
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
              <h2 className="font-bold text-dark">افزودن گواهینامه</h2>
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
                  placeholder="نمایندگی رسمی..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صادرکننده
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Motorola Solutions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سال صدور
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="۲۰۲۳"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تصویر گواهینامه *
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-orange-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">آپلود تصویر</p>
                    <p className="text-xs text-gray-400">JPG, PNG - حداکثر ۲ مگابایت</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
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
