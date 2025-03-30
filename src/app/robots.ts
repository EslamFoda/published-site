import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
 
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
//   const subdomain = host.split('.')[0]
//   const isMainDomain = subdomain === 'www' || host === 'vixx.site'
  
  // Create base URL with proper protocol and domain
  const baseUrl = `https://${host}`
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
      // You might want to add specific rules for subdomains if needed
      // For example, disallowing certain paths on specific subdomains
    },
    // Dynamically generate the sitemap URL based on the current domain/subdomain
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}