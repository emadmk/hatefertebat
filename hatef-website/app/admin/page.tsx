import Link from 'next/link'
import {
  Package,
  Eye,
  MessageSquare,
  TrendingUp,
  ArrowUpLeft,
  ArrowDownLeft,
} from 'lucide-react'

const stats = [
  {
    name: 'کل محصولات',
    value: '۱۲۵',
    change: '+۵',
    changeType: 'increase',
    icon: Package,
    href: '/admin/products',
  },
  {
    name: 'بازدید امروز',
    value: '۱,۲۳۴',
    change: '+۱۲%',
    changeType: 'increase',
    icon: Eye,
    href: '/admin',
  },
  {
    name: 'استعلام‌های جدید',
    value: '۱۸',
    change: '+۳',
    changeType: 'increase',
    icon: MessageSquare,
    href: '/admin/inquiries',
  },
  {
    name: 'نرخ تبدیل',
    value: '۳.۲%',
    change: '-۰.۵%',
    changeType: 'decrease',
    icon: TrendingUp,
    href: '/admin',
  },
]

const recentInquiries = [
  {
    id: '1',
    name: 'علی محمدی',
    product: 'بی‌سیم موتورولا DP4801e',
    date: '۱۴۰۲/۱۰/۱۵',
    status: 'pending',
  },
  {
    id: '2',
    name: 'زهرا احمدی',
    product: 'دوربین مداربسته Avigilon',
    date: '۱۴۰۲/۱۰/۱۴',
    status: 'replied',
  },
  {
    id: '3',
    name: 'محمد رضایی',
    product: 'سیستم کنترل دسترسی',
    date: '۱۴۰۲/۱۰/۱۴',
    status: 'pending',
  },
]

const quickActions = [
  { name: 'افزودن محصول', href: '/admin/products/new' },
  { name: 'افزودن مقاله', href: '/admin/posts/new' },
  { name: 'مشاهده استعلام‌ها', href: '/admin/inquiries' },
  { name: 'تنظیمات سایت', href: '/admin/settings' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">داشبورد</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change}
                {stat.changeType === 'increase' ? (
                  <ArrowUpLeft className="w-4 h-4" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4" />
                )}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.name}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-bold text-dark">آخرین استعلام‌ها</h2>
            <Link href="/admin/inquiries" className="text-sm text-primary hover:underline">
              مشاهده همه
            </Link>
          </div>

          <div className="divide-y">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-4">
                <div>
                  <h4 className="font-medium text-dark">{inquiry.name}</h4>
                  <p className="text-sm text-gray-500">{inquiry.product}</p>
                </div>
                <div className="text-left">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      inquiry.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {inquiry.status === 'pending' ? 'در انتظار' : 'پاسخ داده شده'}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{inquiry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-dark mb-4">دسترسی سریع</h2>

          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="block w-full px-4 py-3 bg-gray-50 hover:bg-orange-50 rounded-lg text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                {action.name}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-bold text-dark mb-3 text-sm">راهنما</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>• برای افزودن محصول جدید از منوی محصولات استفاده کنید</li>
              <li>• استعلام‌های جدید را سریعاً پاسخ دهید</li>
              <li>• از پشتیبان‌گیری منظم غافل نشوید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
