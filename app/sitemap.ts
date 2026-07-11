import { MetadataRoute } from 'next'
import { projects } from '@/src/data/projects'

const BASE_URL = 'https://www.commitpt.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectPages,
    {
      url: `${BASE_URL}/contributors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
