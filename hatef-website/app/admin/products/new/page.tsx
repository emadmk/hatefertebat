'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Upload, X, Plus } from 'lucide-react'

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [attributes, setAttributes] = useState([{ key: '', value: '' }])

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }])
  }

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-dark">افزودن محصول جدید</h1>
      </div>

      <form className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">اطلاعات اصلی</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان محصول (فارسی) *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="مثال: بی‌سیم موتورولا DP4801e"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان محصول (انگلیسی)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Motorola DP4801e"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسلاگ (URL)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="dp4801e"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    توضیحات کوتاه
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="توضیح کوتاه برای نمایش در لیست محصولات"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    توضیحات کامل
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="توضیحات کامل محصول..."
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">تصاویر محصول</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute -top-2 -left-2 p-1 bg-red-500 text-white rounded-full z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-orange-50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">آپلود تصویر</span>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </label>
              </div>
            </div>

            {/* Attributes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-dark">مشخصات فنی</h2>
                <button
                  type="button"
                  onClick={addAttribute}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  افزودن مشخصه
                </button>
              </div>

              <div className="space-y-3">
                {attributes.map((attr, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="نام مشخصه"
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={attr.key}
                      onChange={(e) => {
                        const newAttrs = [...attributes]
                        newAttrs[index].key = e.target.value
                        setAttributes(newAttrs)
                      }}
                    />
                    <input
                      type="text"
                      placeholder="مقدار"
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={attr.value}
                      onChange={(e) => {
                        const newAttrs = [...attributes]
                        newAttrs[index].value = e.target.value
                        setAttributes(newAttrs)
                      }}
                    />
                    {attributes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAttribute(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">انتشار</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وضعیت
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="draft">پیش‌نویس</option>
                    <option value="active">فعال</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    ذخیره
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    پیش‌نویس
                  </button>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">دسته‌بندی</h2>

              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">انتخاب دسته‌بندی</option>
                <option value="cctv">دوربین مداربسته</option>
                <option value="wireless">بی‌سیم و مخابراتی</option>
                <option value="access">کنترل دسترسی</option>
                <option value="paging">پیجینگ</option>
                <option value="network">شبکه</option>
              </select>
            </div>

            {/* Brand */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">برند</h2>

              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">انتخاب برند</option>
                <option value="motorola">Motorola</option>
                <option value="avigilon">Avigilon</option>
                <option value="cambium">Cambium Networks</option>
                <option value="industronic">Industronic</option>
              </select>
            </div>

            {/* Catalog */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">کاتالوگ</h2>

              <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-orange-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">آپلود کاتالوگ PDF</p>
                  <p className="text-xs text-gray-400">حداکثر ۱۰ مگابایت</p>
                </div>
                <input type="file" className="hidden" accept=".pdf" />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
