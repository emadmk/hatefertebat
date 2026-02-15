import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Building2, Calendar, ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/common'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const encodedSlug = encodeURIComponent(slug).toLowerCase()
  return prisma.project.findUnique({
    where: { slug: encodedSlug },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: 'پروژه یافت نشد' }
  }

  return {
    title: project.titleFa,
    description: project.description || '',
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project || project.status !== 'PUBLISHED') {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'خانه', url: '/' },
    { name: 'پروژه‌ها', url: '/projects' },
    { name: project.titleFa, url: `/projects/${project.slug}` },
  ]

  // images is a String[] in Prisma schema
  const images: string[] = project.images.length > 0 ? project.images : ['/images/projects/default.jpg']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <Image
                src={images[0]}
                alt={project.titleFa}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.titleFa} - تصویر ${index + 2}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-2xl font-bold text-dark mb-4">{project.titleFa}</h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                {project.client && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-primary" />
                    {project.client}
                  </span>
                )}
                {project.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    {project.location}
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {project.year}
                  </span>
                )}
              </div>

              {project.description && (
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-dark mb-4">اطلاعات پروژه</h2>

              <div className="space-y-3">
                {project.client && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">کارفرما:</span>
                    <span className="text-dark font-medium">{project.client}</span>
                  </div>
                )}
                {project.location && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">موقعیت:</span>
                    <span className="text-dark font-medium">{project.location}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">سال اجرا:</span>
                    <span className="text-dark font-medium">{project.year}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-xl p-6 text-white text-center">
              <h3 className="font-bold text-lg mb-2">پروژه مشابه نیاز دارید؟</h3>
              <p className="text-sm opacity-90 mb-4">
                با کارشناسان ما مشورت کنید
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                تماس با ما
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
