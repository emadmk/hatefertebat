'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'چگونه می‌توانم سفارش ثبت کنم؟',
    answer: 'برای ثبت سفارش می‌توانید از طریق فرم استعلام قیمت در صفحه محصول مورد نظر اقدام کنید یا با شماره تلفن ما تماس بگیرید.',
  },
  {
    question: 'آیا محصولات دارای گارانتی هستند؟',
    answer: 'بله، تمامی محصولات ما دارای گارانتی اصالت و گارانتی خدمات پس از فروش هستند. مدت گارانتی بسته به نوع محصول متفاوت است.',
  },
  {
    question: 'هزینه نصب و راه‌اندازی چقدر است؟',
    answer: 'هزینه نصب و راه‌اندازی بسته به نوع پروژه و تجهیزات متفاوت است. برای دریافت قیمت دقیق، لطفاً با کارشناسان ما تماس بگیرید.',
  },
  {
    question: 'آیا امکان بازدید از محل وجود دارد؟',
    answer: 'بله، تیم فنی ما آماده بازدید از محل پروژه برای ارائه مشاوره و برآورد دقیق هستند.',
  },
  {
    question: 'روش‌های پرداخت چیست؟',
    answer: 'پرداخت از طریق واریز به حساب شرکت، چک و اعتبار امکان‌پذیر است. شرایط پرداخت برای پروژه‌های بزرگ قابل مذاکره است.',
  },
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'سوالات متداول', url: '/faq' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-dark text-center">سوالات متداول</h1>
          <p className="text-gray-500 text-center mt-3">پاسخ سوالات رایج</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-right"
              >
                <span className="font-medium text-dark">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-400 transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 border-t pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
