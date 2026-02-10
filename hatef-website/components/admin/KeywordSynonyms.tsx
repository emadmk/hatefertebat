'use client'

import { useState } from 'react'
import { Plus, X, Tags, Lightbulb } from 'lucide-react'

interface KeywordSynonymsProps {
  keywords: string[]
  synonyms: string[]
  onKeywordsChange: (keywords: string[]) => void
  onSynonymsChange: (synonyms: string[]) => void
}

export default function KeywordSynonyms({
  keywords,
  synonyms,
  onKeywordsChange,
  onSynonymsChange,
}: KeywordSynonymsProps) {
  const [newKeyword, setNewKeyword] = useState('')
  const [newSynonym, setNewSynonym] = useState('')

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      onKeywordsChange([...keywords, newKeyword.trim()])
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    onKeywordsChange(keywords.filter((k) => k !== keyword))
  }

  const addSynonym = () => {
    if (newSynonym.trim() && !synonyms.includes(newSynonym.trim())) {
      onSynonymsChange([...synonyms, newSynonym.trim()])
      setNewSynonym('')
    }
  }

  const removeSynonym = (synonym: string) => {
    onSynonymsChange(synonyms.filter((s) => s !== synonym))
  }

  // Suggested synonyms based on common SEO patterns
  const suggestedSynonyms = [
    'خرید',
    'قیمت',
    'فروش',
    'بهترین',
    'ارزان',
    'اورجینال',
    'اصل',
    'با کیفیت',
    'نمایندگی',
    'خدمات',
    'نصب',
    'تعمیر',
    'آموزش',
  ]

  const addSuggestedSynonym = (synonym: string) => {
    if (!synonyms.includes(synonym)) {
      onSynonymsChange([...synonyms, synonym])
    }
  }

  return (
    <div className="space-y-6">
      {/* Keywords Section */}
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Tags className="w-5 h-5 text-primary" />
          <h3 className="font-medium">کلمات کلیدی</h3>
          <span className="text-xs text-gray-500">({keywords.length} کلمه)</span>
        </div>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addKeyword()
              }
            }}
            placeholder="کلمه کلیدی جدید..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark"
          >
            <Plus className="w-4 h-4" />
            افزودن
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Synonyms Section */}
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="font-medium">مترادف‌ها و کلمات مرتبط (برای SEO)</h3>
          <span className="text-xs text-gray-500">({synonyms.length} کلمه)</span>
        </div>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSynonym}
            onChange={(e) => setNewSynonym(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addSynonym()
              }
            }}
            placeholder="مترادف یا کلمه مرتبط..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <button
            type="button"
            onClick={addSynonym}
            className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600"
          >
            <Plus className="w-4 h-4" />
            افزودن
          </button>
        </div>

        {synonyms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {synonyms.map((synonym) => (
              <span
                key={synonym}
                className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-sm"
              >
                {synonym}
                <button
                  type="button"
                  onClick={() => removeSynonym(synonym)}
                  className="hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Suggested Synonyms */}
        <div className="border-t pt-3 mt-3">
          <div className="text-xs text-gray-500 mb-2">پیشنهادات (کلیک کنید برای افزودن):</div>
          <div className="flex flex-wrap gap-1">
            {suggestedSynonyms.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addSuggestedSynonym(s)}
                disabled={synonyms.includes(s)}
                className={`text-xs px-2 py-1 rounded ${
                  synonyms.includes(s)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
                }`}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4 bg-blue-50 p-3 rounded-lg">
          💡 <strong>نکته SEO:</strong> مترادف‌ها به گوگل کمک می‌کنند محتوای شما را برای کلمات مشابه هم پیدا
          کند. مثلاً اگر محصول شما &quot;دوربین مداربسته&quot; است، مترادف‌هایی مثل &quot;دوربین امنیتی&quot;، &quot;CCTV&quot;، &quot;دوربین
          نظارتی&quot; اضافه کنید.
        </div>
      </div>
    </div>
  )
}
