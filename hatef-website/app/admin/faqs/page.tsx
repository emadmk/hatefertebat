'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, GripVertical, ChevronDown } from 'lucide-react'

const mockFaqs = [
  {
    id: '1',
    question: 'چگونه می‌توانم سفارش ثبت کنم؟',
    answer: 'برای ثبت سفارش می‌توانید از طریق فرم استعلام قیمت در صفحه محصول مورد نظر اقدام کنید یا با شماره تلفن ما تماس بگیرید.',
    category: 'سفارش',
    order: 1,
  },
  {
    id: '2',
    question: 'آیا محصولات دارای گارانتی هستند؟',
    answer: 'بله، تمامی محصولات ما دارای گارانتی اصالت و گارانتی خدمات پس از فروش هستند.',
    category: 'گارانتی',
    order: 2,
  },
  {
    id: '3',
    question: 'هزینه نصب و راه‌اندازی چقدر است؟',
    answer: 'هزینه نصب و راه‌اندازی بسته به نوع پروژه و تجهیزات متفاوت است. برای دریافت قیمت دقیق، لطفاً با کارشناسان ما تماس بگیرید.',
    category: 'خدمات',
    order: 3,
  },
]

export default function FaqsAdminPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingFaq, setEditingFaq] = useState<typeof mockFaqs[0] | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const openAddModal = () => {
    setEditingFaq(null)
    setShowModal(true)
  }

  const openEditModal = (faq: typeof mockFaqs[0]) => {
    setEditingFaq(faq)
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">سوالات متداول</h1>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن سوال
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {mockFaqs.map((faq) => (
          <div key={faq.id} className="p-4">
            <div className="flex items-start gap-3">
              <button className="cursor-grab text-gray-400 hover:text-gray-600 mt-1">
                <GripVertical className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between text-right"
                >
                  <div>
                    <span className="text-xs text-primary font-medium">{faq.category}</span>
                    <h3 className="font-medium text-dark">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === faq.id && (
                  <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(faq)}
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
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-dark">
                {editingFaq ? 'ویرایش سوال' : 'افزودن سوال'}
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
                  دسته‌بندی
                </label>
                <select
                  defaultValue={editingFaq?.category}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  <option value="سفارش">سفارش</option>
                  <option value="گارانتی">گارانتی</option>
                  <option value="خدمات">خدمات</option>
                  <option value="پرداخت">پرداخت</option>
                  <option value="عمومی">عمومی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سوال *
                </label>
                <input
                  type="text"
                  defaultValue={editingFaq?.question}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="سوال را وارد کنید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  پاسخ *
                </label>
                <textarea
                  rows={4}
                  defaultValue={editingFaq?.answer}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="پاسخ را وارد کنید..."
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
