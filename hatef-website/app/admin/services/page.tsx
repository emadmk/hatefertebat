'use client'

import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, GripVertical } from 'lucide-react'

const mockServices = [
  {
    id: '1',
    title: 'نصب و راه‌اندازی دوربین مداربسته',
    slug: 'cctv-installation',
    icon: 'Camera',
    status: 'active',
    order: 1,
  },
  {
    id: '2',
    title: 'نصب سیستم کنترل دسترسی',
    slug: 'access-control-installation',
    icon: 'Lock',
    status: 'active',
    order: 2,
  },
  {
    id: '3',
    title: 'خدمات شبکه و ارتباطات',
    slug: 'network-services',
    icon: 'Wifi',
    status: 'active',
    order: 3,
  },
  {
    id: '4',
    title: 'پشتیبانی و نگهداری',
    slug: 'support-maintenance',
    icon: 'Headphones',
    status: 'active',
    order: 4,
  },
]

export default function ServicesAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">خدمات</h1>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن خدمت
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase w-12">
                ترتیب
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                عنوان
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                اسلاگ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                آیکون
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                وضعیت
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical className="w-5 h-5" />
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-dark">
                  {service.title}
                </td>
                <td className="px-6 py-4 text-gray-500" dir="ltr">
                  {service.slug}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {service.icon}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      service.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {service.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="مشاهده"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/services/${service.id}/edit`}
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
