import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import { generateArticleSchema } from '@/lib/seo'

const mockPost = {
  id: '1',
  titleFa: 'راهنمای انتخاب دوربین مداربسته مناسب',
  slug: 'choosing-right-cctv',
  content: `<p>انتخاب دوربین مداربسته مناسب برای محیط‌های مختلف نیازمند توجه به چندین فاکتور مهم است. در این مقاله به بررسی این فاکتورها می‌پردازیم.</p>
  <h2>۱. نوع محیط</h2>
  <p>اولین قدم در انتخاب دوربین، مشخص کردن نوع محیط است. آیا دوربین برای فضای داخلی است یا خارجی؟ آیا شرایط نوری خاصی دارد؟</p>
  <h2>۲. رزولوشن تصویر</h2>
  <p>رزولوشن تصویر تعیین‌کننده کیفیت و جزئیات تصویر ضبط شده است. برای کاربردهای عمومی ۲ مگاپیکسل کافی است اما برای شناسایی چهره ۴ مگاپیکسل یا بالاتر توصیه می‌شود.</p>
  <h2>۳. دید در شب</h2>
  <p>اگر نیاز به نظارت شبانه دارید، باید دوربینی با قابلیت دید در شب مناسب انتخاب کنید.</p>`,
  excerpt: 'در این مقاله به بررسی نکات مهم در انتخاب دوربین مداربسته می‌پردازیم.',
  image: '/images/blog/cctv-guide.jpg',
  author: 'تیم فنی',
  publishedAt: '۱۴۰۲/۰۹/۱۵',
  category: { nameFa: 'راهنما', slug: 'guide' },
}

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params: _params }: PageProps): Promise<Metadata> {
  return {
    title: mockPost.titleFa,
    description: mockPost.excerpt,
  }
}

export default function BlogPostPage({ params: _params }: PageProps) {
  const post = mockPost

  if (!post) notFound()

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'وبلاگ', url: '/blog' },
    { name: post.titleFa, url: `/blog/${post.slug}` },
  ]

  const articleSchema = generateArticleSchema({
    title: post.titleFa,
    description: post.excerpt,
    image: post.image,
    author: post.author,
    datePublished: '2023-12-06',
    dateModified: '2023-12-06',
    url: `https://hatefertebat.ir/blog/${post.slug}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <article className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full mb-4">
                {post.category.nameFa}
              </span>

              <h1 className="text-3xl font-bold text-dark mb-4">{post.titleFa}</h1>

              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.titleFa}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                بازگشت به وبلاگ
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
