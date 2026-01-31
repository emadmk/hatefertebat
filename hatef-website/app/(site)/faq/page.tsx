'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import { cn } from '@/lib/utils'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch('/api/faq')
        const data = await res.json()
        if (data.success) {
          setFaqs(data.data.faqs)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">در حال بارگذاری...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">سوالی ثبت نشده است</p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}
