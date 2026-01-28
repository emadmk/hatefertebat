'use client'

import { useState } from 'react'
import { Search, Eye, MessageSquare, Check, Trash2 } from 'lucide-react'

const mockInquiries = [
  {
    id: '1',
    name: 'علی محمدی',
    phone: '09121234567',
    email: 'ali@example.com',
    product: 'بی‌سیم موتورولا DP4801e',
    message: 'لطفاً قیمت ۵ عدد از این محصول را اعلام کنید.',
    status: 'pending',
    createdAt: '۱۴۰۲/۱۰/۱۵ - ۱۴:۳۰',
  },
  {
    id: '2',
    name: 'زهرا احمدی',
    phone: '09357654321',
    email: 'zahra@example.com',
    product: 'دوربین مداربسته Avigilon H5A',
    message: 'برای یک پروژه صنعتی به ۲۰ دوربین نیاز داریم. آیا امکان بازدید از محل هست؟',
    status: 'replied',
    createdAt: '۱۴۰۲/۱۰/۱۴ - ۱۰:۱۵',
  },
  {
    id: '3',
    name: 'محمد رضایی',
    phone: '09123456789',
    email: 'mohammad@example.com',
    product: 'سیستم کنترل دسترسی',
    message: 'درخواست مشاوره برای نصب سیستم کنترل دسترسی در ساختمان اداری',
    status: 'pending',
    createdAt: '۱۴۰۲/۱۰/۱۴ - ۰۹:۴۵',
  },
]

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState<typeof mockInquiries[0] | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">استعلام‌ها</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            ۲ استعلام در انتظار پاسخ
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">همه وضعیت‌ها</option>
            <option value="pending">در انتظار پاسخ</option>
            <option value="replied">پاسخ داده شده</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm divide-y overflow-hidden">
          {mockInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => setSelectedInquiry(inquiry)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedInquiry?.id === inquiry.id ? 'bg-orange-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-dark">{inquiry.name}</h3>
                  <p className="text-sm text-gray-500">{inquiry.product}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    inquiry.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {inquiry.status === 'pending' ? 'در انتظار' : 'پاسخ داده شده'}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{inquiry.message}</p>
              <p className="text-xs text-gray-400">{inquiry.createdAt}</p>
            </div>
          ))}
        </div>

        {/* Inquiry Detail */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedInquiry ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-dark">جزئیات استعلام</h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedInquiry.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedInquiry.status === 'pending' ? 'در انتظار' : 'پاسخ داده شده'}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-gray-400">نام</label>
                  <p className="font-medium text-dark">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">تلفن</label>
                  <p className="font-medium text-dark" dir="ltr">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">ایمیل</label>
                  <p className="font-medium text-dark" dir="ltr">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">محصول</label>
                  <p className="font-medium text-dark">{selectedInquiry.product}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">پیام</label>
                  <p className="text-gray-600">{selectedInquiry.message}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">تاریخ</label>
                  <p className="text-gray-600">{selectedInquiry.createdAt}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  پاسخ
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Check className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>برای مشاهده جزئیات، یک استعلام را انتخاب کنید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
