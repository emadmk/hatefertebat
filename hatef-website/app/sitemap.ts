import { MetadataRoute } from 'next'

const baseUrl = 'https://hatefertebat.ir'

// In production, these would come from the database
const mockProducts = [
  { slug: 'smart-keypad-standard', updatedAt: '2024-01-15' },
  { slug: 'video-intercom-reader-pro', updatedAt: '2024-01-14' },
  { slug: 'video-reader-pro', updatedAt: '2024-01-13' },
]

const mockCategories = [
  { slug: 'cctv', updatedAt: '2024-01-15' },
  { slug: 'access-control', updatedAt: '2024-01-14' },
  { slug: 'wireless', updatedAt: '2024-01-13' },
]

const mockPosts = [
  { slug: 'choosing-right-cctv', updatedAt: '2024-01-15' },
  { slug: 'smart-access-control-benefits', updatedAt: '2024-01-10' },
]

const mockBrands = [
  { slug: 'motorola', updatedAt: '2024-01-01' },
  { slug: 'avigilon', updatedAt: '2024-01-01' },
  { slug: 'cambium-networks', updatedAt: '2024-01-01' },
]

const mockServices = [
  { slug: 'installation', updatedAt: '2024-01-01' },
  { slug: 'supply', updatedAt: '2024-01-01' },
  { slug: 'engineering', updatedAt: '2024-01-01' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Products
  const productPages: MetadataRoute.Sitemap = mockProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Categories
  const categoryPages: MetadataRoute.Sitemap = mockCategories.map((category) => ({
    url: `${baseUrl}/products/category/${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Blog posts
  const postPages: MetadataRoute.Sitemap = mockPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Brands
  const brandPages: MetadataRoute.Sitemap = mockBrands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(brand.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Services
  const servicePages: MetadataRoute.Sitemap = mockServices.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...postPages,
    ...brandPages,
    ...servicePages,
  ]
}
