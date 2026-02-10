'use client'

import { useState } from 'react'
import { Copy, Check, Wand2, Code } from 'lucide-react'

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
}

export default function SchemaGenerator({ type, data }: SchemaGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [showSchema, setShowSchema] = useState(false)

  const generateSchema = () => {
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
  }

  const schema = generateSchema()
  const schemaString = JSON.stringify(schema, null, 2)

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
          <div className="flex gap-2 mb-3">
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
              className="flex items-center gap-2 text-sm bg-primary text-white hover:bg-primary-dark px-3 py-1.5 rounded"
            >
              <Code className="w-4 h-4" />
              کپی با تگ Script
            </button>
          </div>

          <pre
            className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed"
            dir="ltr"
          >
            {schemaString}
          </pre>

          <div className="mt-3 text-xs text-gray-500">
            💡 این Schema به صورت خودکار در صفحه محصول قرار می‌گیرد. برای اضافه کردن دستی، کد را کپی کرده و در
            صفحه HTML قرار دهید.
          </div>
        </div>
      )}
    </div>
  )
}
