# پروژه: ساخت سایت کرمان هاتف ارتباط از صفر

## خلاصه پروژه
می‌خوام یک سایت کامل برای شرکت "کرمان هاتف ارتباط" بسازم که جایگزین سایت وردپرس فعلی (hatefertebat.ir) بشه. سایت فعلی هک شده و malware داره، همچنین در گوگل ایندکس نشده. هدف ساخت یک سایت سریع، امن، و با سئوی عالی هست.

---

## 🚨 نکات بسیار مهم (حتماً بخون)

### ۱. کد بدون خطا
- **کد باید ۱۰۰٪ بدون خطای TypeScript باشه**
- قبل از هر commit، حتماً `npm run build` بزن
- هیچ error یا warning نباید وجود داشته باشه
- از `any` استفاده نکن، تایپ‌ها رو کامل بنویس

### ۲. Migration خودکار از وردپرس
- من فایل SQL دیتابیس وردپرس و پوشه uploads رو توی سرور میذارم
- تو باید یک **اسکریپت migration** بنویسی که:
  - SQL رو بخونه
  - محصولات، دسته‌بندی‌ها، برندها، مقالات رو extract کنه
  - تصاویر رو از پوشه uploads وردپرس پیدا کنه (با توجه به ساختار wp-content/uploads/year/month/)
  - همه چیز رو به دیتابیس جدید import کنه
  - **یک دستور اجرا کنم، همه چیز آماده بشه**

### ۳. سئو اولویت اول
- سایت فعلی اصلاً ایندکس نشده
- باید سئو بی‌نقص باشه

---

## مشخصات فنی

### Stack فنی:
- **Frontend:** Next.js 14 (App Router) + TypeScript (strict mode)
- **Styling:** Tailwind CSS + Framer Motion (برای انیمیشن‌ها)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Admin Panel:** React فارسی اختصاصی
- **Authentication:** NextAuth.js
- **File Upload:** uploadthing یا multer
- **Analytics:** Google Analytics 4 + Google Tag Manager
- **Deploy:** سرور Ubuntu با Node.js + Nginx + PM2

### ساختار پروژه:
```
hatef-website/
├── app/                        # Next.js App Router
│   ├── (site)/                # صفحات عمومی
│   │   ├── page.tsx           # صفحه اصلی
│   │   ├── products/          # محصولات
│   │   │   ├── page.tsx       # لیست محصولات
│   │   │   ├── [slug]/        # تک محصول
│   │   │   └── category/[cat] # دسته‌بندی
│   │   ├── services/          # خدمات
│   │   ├── brands/            # برندها
│   │   ├── blog/              # وبلاگ
│   │   ├── catalog/           # کاتالوگ
│   │   ├── projects/          # پروژه‌های انجام شده
│   │   ├── certificates/      # گواهینامه‌ها
│   │   ├── faq/               # سوالات متداول
│   │   ├── compare/           # مقایسه محصولات
│   │   ├── search/            # نتایج جستجو
│   │   ├── about/             # درباره ما
│   │   ├── contact/           # تماس با ما
│   │   └── not-found.tsx      # صفحه 404
│   ├── admin/                 # پنل ادمین
│   │   ├── page.tsx           # داشبورد
│   │   ├── products/          # مدیریت محصولات
│   │   ├── categories/        # مدیریت دسته‌ها
│   │   ├── brands/            # مدیریت برندها
│   │   ├── services/          # مدیریت خدمات
│   │   ├── blog/              # مدیریت وبلاگ
│   │   ├── catalogs/          # مدیریت کاتالوگ
│   │   ├── projects/          # مدیریت پروژه‌ها
│   │   ├── certificates/      # مدیریت گواهینامه‌ها
│   │   ├── faq/               # مدیریت FAQ
│   │   ├── inquiries/         # مدیریت درخواست‌های قیمت
│   │   ├── settings/          # تنظیمات سایت
│   │   └── backup/            # بکاپ
│   └── api/                   # API Routes
├── components/                # کامپوننت‌های React
│   ├── ui/                    # کامپوننت‌های پایه
│   ├── layout/                # Header, Footer, ...
│   ├── products/              # کارت محصول، فیلتر، ...
│   ├── forms/                 # فرم‌ها
│   └── common/                # Breadcrumb, Pagination, ...
├── lib/                       # توابع کمکی
│   ├── db.ts                  # Prisma client
│   ├── seo.ts                 # توابع سئو
│   ├── utils.ts               # توابع عمومی
│   └── analytics.ts           # Google Analytics
├── prisma/
│   ├── schema.prisma          # Schema دیتابیس
│   └── seed.ts                # Seed data
├── scripts/
│   ├── migrate-wordpress.ts   # 🚨 اسکریپت migration از وردپرس
│   ├── optimize-images.ts     # بهینه‌سازی تصاویر
│   └── backup.ts              # بکاپ خودکار
├── public/
│   └── uploads/               # تصاویر
├── types/                     # TypeScript types
└── config/
    └── redirects.ts           # ریدایرکت‌های 301
```

---

## 🔄 سیستم Migration از وردپرس (خیلی مهم)

### فایل‌هایی که میدم:
1. `database.sql` - دیتابیس کامل وردپرس
2. `uploads/` - پوشه تصاویر (wp-content/uploads)

### اسکریپت migration باید:

```typescript
// scripts/migrate-wordpress.ts

// 1. خواندن SQL و parse کردن جداول:
//    - wp_posts (محصولات، مقالات، صفحات)
//    - wp_postmeta (اطلاعات اضافی، تصاویر)
//    - wp_terms (دسته‌بندی‌ها، برندها)
//    - wp_term_taxonomy
//    - wp_term_relationships

// 2. Extract کردن تصاویر:
//    - تصویر شاخص (featured image) از _thumbnail_id
//    - گالری تصاویر از محتوا
//    - مسیر فایل از wp_postmeta با guid

// 3. ساختار تصاویر وردپرس:
//    uploads/2023/05/image.jpg
//    uploads/2024/01/product-photo.png

// 4. Import به Prisma:
//    - ساخت دسته‌بندی‌ها
//    - ساخت برندها
//    - ساخت محصولات با تصاویر صحیح
//    - ساخت مقالات

// 5. بهینه‌سازی تصاویر با sharp

// 6. تولید redirects.ts برای URL‌های قدیمی
```

### دستور اجرا:
```bash
# یک دستور، همه چیز آماده:
npm run migrate

# که این کارها رو انجام بده:
# 1. خواندن SQL
# 2. Import داده‌ها
# 3. کپی و بهینه‌سازی تصاویر
# 4. ساخت redirects
# 5. Build سایت
```

---

## ریدایرکت ۳۰۱ (URL‌های قدیمی به جدید)

### فایل config/redirects.ts:
```typescript
// این فایل توسط اسکریپت migration تولید میشه
export const redirects = [
  {
    source: '/products/صفحه-کلید-هوشمند-استاندارد',
    destination: '/products/smart-keypad-standard',
    permanent: true
  },
  // ... همه URL‌های قدیمی
]
```

### در next.config.js:
```javascript
module.exports = {
  async redirects() {
    return require('./config/redirects').redirects
  }
}
```

---

## اطلاعات سایت

### درباره شرکت:
- **نام:** کرمان هاتف ارتباط (Kerman Hatef Ertebat)
- **تلفن:** 021-24871000
- **واتساپ:** 09123456789 (بعداً میدم)
- **ایمیل:** info@hatefertebat.ir
- **آدرس:** تهران، رسالت، مجیدیه شمالی، خ اردکانی، کوچه مهتابی پور، پلاک ۲۸
- **سابقه:** ۱۸ سال
- **حوزه فعالیت:** تجهیزات مخابراتی، دوربین مداربسته، سیستم‌های امنیتی، پیجینگ

### برندهای نمایندگی:
1. Motorola
2. Avigilon
3. Cambium Networks
4. Industronic

### آمار محتوا:
- **تعداد محصولات:** 202 عدد
- **تعداد دسته‌بندی:** 23 دسته
- **دسته‌بندی اصلی:** CCTV، Access Control، Security Cameras

### خدمات:
1. راه‌اندازی
2. تامین تجهیزات
3. نصب
4. مهندسی

---

## صفحات مورد نیاز

### 1. صفحه اصلی (/)
- Hero section با اسلایدر یا تصویر محصول اصلی
- نوار برندها (Marquee)
- دسته‌بندی محصولات (4 کارت)
- معرفی خدمات (4 کارت)
- محصولات برگزیده (6 محصول)
- بخش درباره ما با آمار (سال تجربه، تعداد محصول، پروژه موفق)
- آخرین مطالب وبلاگ
- فوتر کامل
- **دکمه شناور واتساپ**

### 2. صفحه محصولات (/products)
- فیلتر بر اساس دسته‌بندی
- فیلتر بر اساس برند
- جستجوی پیشرفته
- نمایش گرید محصولات
- Pagination
- **دکمه افزودن به مقایسه**

### 3. صفحه تک محصول (/products/[slug])
- تصویر اصلی + گالری تصاویر
- عنوان فارسی و انگلیسی
- توضیحات کوتاه
- توضیحات کامل (با فرمت HTML)
- ویژگی‌ها (جدول key-value)
- **دکمه دانلود کاتالوگ PDF**
- **دکمه پرینت صفحه**
- **فرم درخواست قیمت**
- محصولات مشابه
- Breadcrumb
- Schema.org Product

### 4. صفحه دسته‌بندی (/products/category/[slug])
- لیست محصولات آن دسته
- Sidebar با زیردسته‌ها
- توضیحات دسته (برای سئو)

### 5. صفحه مقایسه محصولات (/compare)
- جدول مقایسه تا ۴ محصول
- انتخاب محصولات از لیست
- نمایش تفاوت‌ها

### 6. صفحه نتایج جستجو (/search)
- نتایج جستجو با highlight
- فیلتر نتایج
- "نتیجه‌ای یافت نشد" با پیشنهادات

### 7. صفحه خدمات (/services)
- لیست خدمات با آیکون و توضیحات

### 8. صفحه تک خدمت (/services/[slug])
- توضیحات کامل خدمت
- تصویر
- فرم درخواست خدمت

### 9. صفحه برندها (/brands)
- لیست برندها با لوگو

### 10. صفحه تک برند (/brands/[slug])
- معرفی برند
- لوگو
- محصولات آن برند

### 11. صفحه کاتالوگ (/catalog)
- لیست فایل‌های PDF قابل دانلود
- دسته‌بندی کاتالوگ‌ها
- پیش‌نمایش PDF

### 12. صفحه پروژه‌های انجام شده (/projects)
- گالری پروژه‌ها
- توضیحات هر پروژه
- تصاویر

### 13. صفحه گواهینامه‌ها و مجوزها (/certificates)
- لیست گواهینامه‌ها با تصویر
- توضیحات

### 14. صفحه سوالات متداول (/faq)
- آکاردئون سوالات
- دسته‌بندی سوالات
- جستجو در سوالات
- Schema.org FAQPage

### 15. صفحه وبلاگ (/blog)
- لیست مقالات
- تصویر شاخص
- خلاصه
- تاریخ
- دسته‌بندی
- Pagination

### 16. صفحه تک مقاله (/blog/[slug])
- محتوای کامل
- تصویر شاخص
- تاریخ
- نویسنده
- دسته‌بندی
- مقالات مرتبط
- Schema.org Article

### 17. صفحه درباره ما (/about)
- معرفی شرکت
- تاریخچه
- چشم‌انداز و ماموریت
- تیم (اختیاری)
- آمار و ارقام

### 18. صفحه تماس با ما (/contact)
- فرم تماس
- اطلاعات تماس
- نقشه گوگل
- ساعات کاری

### 19. صفحه ۴۰۴ (not-found.tsx)
- طراحی زیبا و حرفه‌ای
- لینک به صفحه اصلی
- جستجو
- محصولات پیشنهادی

---

## فرم‌های سایت

### 1. فرم درخواست قیمت (در صفحه محصول)
فیلدها:
- نام و نام خانوادگی *
- شرکت/سازمان
- تلفن *
- ایمیل *
- توضیحات
- محصول (hidden - از صفحه)

### 2. فرم تماس با ما
فیلدها:
- نام *
- ایمیل *
- موضوع *
- پیام *

### 3. فرم درخواست خدمت
فیلدها:
- نام *
- تلفن *
- نوع خدمت (dropdown)
- توضیحات

---

## پنل ادمین (/admin)

### داشبورد:
- آمار کلی (تعداد محصولات، دسته‌ها، بازدید، درخواست‌ها)
- نمودار بازدید (اگه Google Analytics متصل شد)
- لیست آخرین درخواست‌های قیمت
- لیست آخرین محصولات اضافه شده

### مدیریت محصولات:
- لیست با جستجو، فیلتر، مرتب‌سازی
- افزودن/ویرایش/حذف
- فیلدها:
  - عنوان فارسی *
  - عنوان انگلیسی
  - اسلاگ (auto-generate)
  - توضیحات کوتاه
  - توضیحات کامل (Rich Text Editor)
  - تصویر اصلی *
  - گالری تصاویر
  - دسته‌بندی *
  - برند
  - ویژگی‌ها (dynamic key-value)
  - فایل کاتالوگ PDF
  - وضعیت (منتشر/پیش‌نویس)
  - متا تایتل
  - متا دیسکریپشن
  - کلمات کلیدی

### مدیریت دسته‌بندی‌ها:
- لیست درختی
- افزودن/ویرایش/حذف
- فیلدها:
  - نام فارسی
  - نام انگلیسی
  - اسلاگ
  - دسته والد
  - تصویر
  - توضیحات (برای سئو)

### مدیریت برندها:
- لیست
- افزودن/ویرایش/حذف
- فیلدها:
  - نام
  - اسلاگ
  - لوگو
  - توضیحات

### مدیریت خدمات:
- CRUD کامل

### مدیریت وبلاگ:
- CRUD مقالات
- Rich Text Editor
- آپلود تصویر در متن

### مدیریت کاتالوگ:
- آپلود PDF
- دسته‌بندی
- لیست با دانلود

### مدیریت پروژه‌ها:
- CRUD پروژه‌ها
- آپلود چند تصویر

### مدیریت گواهینامه‌ها:
- CRUD

### مدیریت FAQ:
- CRUD سوالات
- دسته‌بندی

### مدیریت درخواست‌های قیمت:
- لیست درخواست‌ها
- وضعیت (جدید/بررسی شده/پاسخ داده شده)
- ارسال ایمیل پاسخ

### بکاپ:
- دکمه بکاپ دستی
- تنظیم بکاپ خودکار (روزانه)
- لیست بکاپ‌ها
- دانلود/بازیابی

### تنظیمات:
- اطلاعات سایت (نام، توضیحات)
- اطلاعات تماس
- لوگو
- Favicon
- شبکه‌های اجتماعی
- Google Analytics ID
- متن فوتر
- اسکریپت‌های سفارشی (head/body)

---

## سئو (بسیار مهم)

### الزامات:
1. **SSG (Static Site Generation)** برای محصولات و بلاگ
2. **ISR (Incremental Static Regeneration)** با revalidate
3. **Sitemap.xml** خودکار شامل:
   - صفحات اصلی
   - محصولات
   - دسته‌بندی‌ها
   - برندها
   - مقالات
   - خدمات
4. **Robots.txt** صحیح
5. **Schema.org** برای:
   - Organization
   - LocalBusiness
   - Product (هر محصول)
   - BreadcrumbList
   - Article (مقالات)
   - FAQPage (سوالات متداول)
6. **Meta Tags** کامل در هر صفحه
7. **Open Graph** برای شبکه‌های اجتماعی
8. **Twitter Card**
9. **Canonical URL**
10. **Hreflang** (اگه بعداً چندزبانه شد)
11. **Image Optimization** با next/image
    - WebP format
    - Lazy loading
    - Blur placeholder
12. **Core Web Vitals** عالی
13. **Semantic HTML**
14. **Breadcrumb** در همه صفحات
15. **Internal Linking**
16. **Alt text** برای تصاویر (از عنوان محصول)

### بهینه‌سازی تصاویر:
```typescript
// scripts/optimize-images.ts
// با استفاده از sharp:
// - تبدیل به WebP
// - ساخت thumbnail
// - فشرده‌سازی
// - حفظ نسخه اصلی
```

---

## طراحی UI/UX

### رنگ‌بندی:
```css
--primary: #F97316       /* نارنجی */
--primary-dark: #EA580C
--primary-light: #FFEDD5
--dark: #1E293B
--gray: #64748B
--light: #F8FAFC
--white: #FFFFFF
--success: #22C55E
--error: #EF4444
```

### فونت:
- **فارسی/انگلیسی:** Vazirmatn از Google Fonts

### انیمیشن‌ها (Framer Motion):
- Fade in on scroll
- Hover scale روی کارت‌ها
- Page transitions
- Float animation (hero)
- Marquee (برندها)
- Stagger animation (لیست‌ها)
- Skeleton loading
- Toast notifications

### کامپوننت‌های UI:
- Header (desktop + mobile menu)
- Mega menu برای محصولات
- Hero section با slider
- Product card با hover effect
- Service card
- Category card
- Brand logo
- Footer (4 ستون)
- Breadcrumb
- Pagination
- Search box با autocomplete
- Filter sidebar
- Modal
- Toast
- Loading skeleton
- Floating WhatsApp button
- Back to top button
- Print button
- Compare button

### ریسپانسیو:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Google Analytics & Tag Manager

```typescript
// lib/analytics.ts
// - GA4 integration
// - Event tracking:
//   - Page views
//   - Product views
//   - Catalog downloads
//   - Form submissions
//   - WhatsApp clicks
//   - Phone clicks
```

---

## بکاپ خودکار

```typescript
// scripts/backup.ts
// - بکاپ روزانه دیتابیس (pg_dump)
// - بکاپ پوشه uploads
// - نگهداری ۳۰ روز اخیر
// - ذخیره در پوشه /backups
// - قابل اجرا با cron job
```

---

## Cloudflare (اختیاری)

اگه از Cloudflare استفاده کردم:
- SSL
- CDN
- DDoS protection
- Cache
- تنظیمات توی README بنویس

---

## امنیت

1. Input validation (zod)
2. CSRF protection
3. Rate limiting
4. Secure headers (helmet)
5. SQL injection prevention (Prisma)
6. XSS prevention
7. Authentication امن (NextAuth)
8. HTTPS only
9. Environment variables برای secrets
10. Sanitize HTML content

---

## Deploy روی Ubuntu

### نیازمندی‌ها:
- Ubuntu 22.04+
- Node.js 18+
- PostgreSQL 14+
- Nginx
- PM2
- Certbot (SSL)

### ساختار سرور:
```
/var/www/hatef/
├── app/                 # کد سایت
├── uploads/             # تصاویر
├── backups/             # بکاپ‌ها
└── logs/                # لاگ‌ها
```

### فایل‌های config:
- `ecosystem.config.js` برای PM2
- `nginx.conf` برای Nginx
- `.env.production` نمونه

### دستورات deploy:
```bash
# Clone
git clone <repo> /var/www/hatef/app
cd /var/www/hatef/app

# Install
npm ci

# Setup database
npx prisma migrate deploy

# Migration از وردپرس (یکبار)
npm run migrate

# Build (باید بدون خطا باشه)
npm run build

# Start
pm2 start ecosystem.config.js
```

---

## فایل‌هایی که بهت میدم:

1. `database.sql` - Export دیتابیس وردپرس
2. `uploads.zip` - پوشه تصاویر وردپرس
3. اسکرین‌شات‌های سایت فعلی (پیوست شده)

### مسیر فایل‌ها روی سرور:
```
/var/www/hatef/wordpress/database.sql
/var/www/hatef/wordpress/uploads/
```

---

## اولویت‌بندی (فازبندی)

### فاز 1 - پایه:
- [ ] ساختار پروژه Next.js + TypeScript
- [ ] Prisma schema کامل
- [ ] **اسکریپت migration از وردپرس**
- [ ] صفحه اصلی با طراحی کامل
- [ ] لیست محصولات + فیلتر
- [ ] صفحه تک محصول
- [ ] صفحه دسته‌بندی
- [ ] ریدایرکت‌های ۳۰۱

### فاز 2 - محتوا:
- [ ] صفحات خدمات
- [ ] صفحات برندها
- [ ] صفحه کاتالوگ
- [ ] صفحه پروژه‌ها
- [ ] صفحه گواهینامه‌ها
- [ ] صفحه FAQ
- [ ] صفحه جستجو
- [ ] صفحه مقایسه
- [ ] وبلاگ

### فاز 3 - ادمین:
- [ ] پنل ادمین کامل
- [ ] مدیریت محصولات
- [ ] مدیریت محتوا
- [ ] مدیریت درخواست‌ها
- [ ] بکاپ

### فاز 4 - نهایی:
- [ ] سئو کامل (sitemap, schema, ...)
- [ ] Google Analytics
- [ ] بهینه‌سازی سرعت
- [ ] تست و رفع باگ
- [ ] مستندات deploy

---

## چک‌لیست قبل از تحویل

- [ ] `npm run build` بدون error
- [ ] `npm run lint` بدون error
- [ ] تمام صفحات کار می‌کنن
- [ ] ریسپانسیو موبایل چک شده
- [ ] فرم‌ها کار می‌کنن
- [ ] تصاویر optimize شدن
- [ ] سئو چک شده (meta, schema, sitemap)
- [ ] ۴۰۴ درست کار می‌کنه
- [ ] README کامل نوشته شده

---

## شروع کن!

1. اول پروژه رو با ساختار بالا بساز
2. Prisma schema رو بنویس
3. اسکریپت migration رو بنویس
4. صفحه اصلی رو بساز
5. Push کن به GitHub
6. بعد بهم بگو SQL و uploads رو کجا بذارم

**مهم: هر مرحله که تموم شد، build بگیر مطمئن شو خطا نداره!**

آماده‌ای؟ شروع کن! 🚀
