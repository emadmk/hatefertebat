'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

const mockProjects = [
  {
    id: '1',
    title: 'نصب سیستم مداربسته مجتمع تجاری پارسیان',
    slug: 'parsian-mall-cctv',
    image: '/images/projects/project-1.jpg',
    client: 'مجتمع تجاری پارسیان',
    location: 'تهران',
    status: 'published',
    completedAt: '۱۴۰۲/۰۶',
  },
  {
    id: '2',
    title: 'سیستم ارتباط بی‌سیم معدن گل‌گهر',
    slug: 'golghohar-mine-radio',
    image: '/images/projects/project-2.jpg',
    client: 'شرکت معدنی گل‌گهر',
    location: 'سیرجان',
    status: 'published',
    completedAt: '۱۴۰۲/۰۴',
  },
  {
    id: '3',
    title: 'کنترل دسترسی برج‌های مسکونی آفتاب',
    slug: 'aftab-towers-access',
    image: '/images/projects/project-3.jpg',
    client: 'برج‌های مسکونی آفتاب',
    location: 'تهران',
    status: 'draft',
    completedAt: '۱۴۰۲/۰۳',
  },
]

export default function ProjectsAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">پروژه‌ها</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن پروژه
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                پروژه
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                کارفرما
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                موقعیت
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                وضعیت
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تاریخ اتمام
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark line-clamp-1">{project.title}</h3>
                      <p className="text-xs text-gray-400">{project.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {project.client}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {project.location}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      project.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {project.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {project.completedAt}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="مشاهده"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="ویرایش"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
