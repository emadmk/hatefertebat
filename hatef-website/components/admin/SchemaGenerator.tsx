'use client'

import { useState, useEffect, useCallback } from 'react'
import { Copy, Check, Wand2, Code, Edit3 } from 'lucide-react'

interface SchemaGeneratorProps {
  type: 'product' | 'article' | 'faq' | 'service'
  data: {
    name?: string
    description?: string
    image?: string
    brand?: string
    category?: string
    url?: string
    datePublished?: string
    dateModified?: string
    author?: string
    questions?: { question: string; answer: string }[]
  }
  value?: string
  onChange?: (value: string) => void
}

export default function SchemaGenerator({ type, data, value, onChange }: SchemaGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [showSchema, setShowSchema] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const generateSchema = useCallback(() => {
    const baseUrl = 'https://hatefertebat.ir'

    switch (type) {
      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name || '',
          description: data.description || '',
          image: data.image ? (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : '',
          brand: data.brand
            ? {
                '@type': 'Brand',
                name: data.brand,
              }
            : undefined,
          category: data.category || undefined,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'IRR',
            price: '0',
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            seller: {
              '@type': 'Organization',
              name: 'کرمان هاتف ارتباط',
            },
          },
          url: data.url || '',
          sku: data.name?.replace(/\s+/g, '-').toLowerCase() || '',
          mpn: data.name?.replace(/\s+/g, '-').toLowerCase() || '',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '12',
            bestRating: '5',
            worstRating: '1',
          },
        }

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.name || '',
          description: data.description || '',
          image: data.image ? (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : '',
          author: {
            '@type': 'Person',
            name: data.author || 'تیم فنی کرمان هاتف ارتباط',
          },
          publisher: {
            '@type': 'Organization',
            name: 'کرمان هاتف ارتباط',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/hatef-logo.webp`,
            },
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || '',
          },
        }

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity:
            data.questions?.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
              },
            })) || [],
        }

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name || '',
          description: data.description || '',
          provider: {
            '@type': 'Organization',
            name: 'کرمان هاتف ارتباط',
            url: baseUrl,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Iran',
          },
          serviceType: data.category || 'خدمات فنی',
        }

      default:
        return {}
    }
  }, [type, data])

  // Auto-generate schema when value is empty and data changes
  useEffect(() => {
    if (!value && data.name && onChange) {
      const schema = generateSchema()
      const schemaStr = JSON.stringify(schema, null, 2)
      onChange(schemaStr)
    }
  }, [data.name, data.description, data.image, data.brand, data.category, data.url, data.author]) // eslint-disable-line react-hooks/exhaustive-deps

  const schemaString = value || JSON.stringify(generateSchema(), null, 2)

  useEffect(() => {
    setEditValue(schemaString)
  }, [schemaString])

  const handleGenerate = () => {
    const schema = generateSchema()
    const schemaStr = JSON.stringify(schema, null, 2)
    if (onChange) {
      onChange(schemaStr)
    }
    setEditValue(schemaStr)
    setIsEditing(false)
  }

  const handleSaveEdit = () => {
    try {
      // Validate JSON
      JSON.parse(editValue)
      if (onChange) {
        onChange(editValue)
      }
      setIsEditing(false)
    } catch {
      alert('فرمت JSON نامعتبر است. لطفا JSON صحیح وارد کنید.')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyAsScript = () => {
    const script = `<script type="application/ld+json">\n${schemaString}\n</script>`
    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <span className="font-medium">Schema Generator</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
            {type === 'product' ? 'محصول' : type === 'article' ? 'مقاله' : type === 'faq' ? 'سوالات متداول' : 'خدمات'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowSchema(!showSchema)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark"
        >
          <Wand2 className="w-4 h-4" />
          {showSchema ? 'بستن' : 'نمایش Schema'}
        </button>
      </div>

      {showSchema && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              onClick={handleGenerate}
              className="flex items-center gap-2 text-sm bg-primary text-white hover:bg-primary-dark px-3 py-1.5 rounded"
            >
              <Wand2 className="w-4 h-4" />
              تولید خودکار
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded ${
                isEditing
                  ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? 'در حال ویرایش' : 'ویرایش دستی'}
            </button>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              کپی JSON
            </button>
            <button
              type="button"
              onClick={copyAsScript}
              className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded"
            >
              <Code className="w-4 h-4" />
              کپی با تگ Script
            </button>
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full h-80 bg-gray-900 text-green-400 p-4 rounded-lg text-xs leading-relaxed font-mono resize-y focus:ring-2 focus:ring-primary focus:outline-none"
                dir="ltr"
                spellCheck={false}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 text-sm bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded"
                >
                  <Check className="w-4 h-4" />
                  ذخیره تغییرات Schema
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditValue(schemaString)
                    setIsEditing(false)
                  }}
                  className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-gray-700"
                >
                  انصراف
                </button>
              </div>
            </div>
          ) : (
            <pre
              className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              dir="ltr"
              onClick={() => setIsEditing(true)}
              title="برای ویرایش کلیک کنید"
            >
              {schemaString}
            </pre>
          )}

          <div className="mt-3 text-xs text-gray-500">
            این Schema به صورت خودکار تولید و در صفحه سایت برای سئو قرار می‌گیرد. می‌توانید آن را ویرایش کنید یا با AI بسازید و اینجا پیست کنید.
          </div>
        </div>
      )}
    </div>
  )
}
