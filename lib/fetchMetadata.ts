import { JSDOM } from "jsdom"

export interface MetadataResult {
  url: string
  title: string
  description: string
  openGraph: {
    title?: string
    description?: string
    image?: string
    type?: string
    url?: string
    siteName?: string
  }
  twitter: {
    card?: string
    title?: string
    description?: string
    image?: string
    creator?: string
    site?: string
  }
  schema: {
    type?: string
    name?: string
    description?: string
    image?: string
  }
  rawHtml: string
}

export async function fetchMetadata(url: string): Promise<MetadataResult> {
  try {
    // Normalize URL
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
    
    // Fetch HTML content
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MetatagVibeChecker/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
      // 10 second timeout
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Page not found (404). Please check the URL.')
      } else if (response.status === 403) {
        throw new Error('Access forbidden (403). The site may be blocking automated requests.')
      } else if (response.status >= 500) {
        throw new Error('Server error. The website appears to be down.')
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) {
      throw new Error('URL does not point to an HTML page. Please enter a valid webpage URL.')
    }

    const html = await response.text()
    
    if (!html || html.trim().length === 0) {
      throw new Error('The webpage appears to be empty or could not be loaded.')
    }
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract basic metadata
    const title = document.querySelector('title')?.textContent || ''
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''

    // Extract OpenGraph metadata
    const openGraph = {
      title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || undefined,
      description: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || undefined,
      image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || undefined,
      type: document.querySelector('meta[property="og:type"]')?.getAttribute('content') || undefined,
      url: document.querySelector('meta[property="og:url"]')?.getAttribute('content') || undefined,
      siteName: document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || undefined,
    }

    // Extract Twitter Card metadata
    const twitter = {
      card: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || undefined,
      title: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || undefined,
      description: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || undefined,
      image: document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || undefined,
      creator: document.querySelector('meta[name="twitter:creator"]')?.getAttribute('content') || undefined,
      site: document.querySelector('meta[name="twitter:site"]')?.getAttribute('content') || undefined,
    }

    // Extract Schema.org structured data (basic)
    const schemaScript = document.querySelector('script[type="application/ld+json"]')
    let schema: any = {}
    
    if (schemaScript?.textContent) {
      try {
        const schemaData = JSON.parse(schemaScript.textContent)
        schema = {
          type: schemaData['@type'],
          name: schemaData.name,
          description: schemaData.description,
          image: schemaData.image,
        }
      } catch {
        // Ignore schema parsing errors
      }
    }

    return {
      url: normalizedUrl,
      title: title.trim(),
      description: description.trim(),
      openGraph,
      twitter,
      schema,
      rawHtml: html,
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.')
    } else if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. The website is taking too long to respond.')
    } else if (error instanceof Error) {
      throw error // Re-throw our custom errors
    } else {
      throw new Error('An unexpected error occurred while fetching the webpage.')
    }
  }
} 