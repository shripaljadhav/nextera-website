import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'

// Helper function to extract text content from HTML
function extractText(html: string, selector?: string): string {
  // Simple regex-based extraction (for basic HTML parsing)
  if (selector) {
    // This is a simplified version - in production you'd use a proper HTML parser
    return ''
  }
  // Remove HTML tags and decode entities
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

// Parse CodeCanyon product page
async function parseCodeCanyon(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('CodeCanyon blocks server-side requests (403 Forbidden). Please use "Quick Fill from Clipboard" instead: Copy the product info from the page and paste it.')
      }
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()

    // Extract product name (usually in h1 or title)
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                     html.match(/<title>([^<]+)<\/title>/i) ||
                     html.match(/item-title[^>]*>([^<]+)</i)
    const name = nameMatch ? extractText(nameMatch[1]) : ''

    // Extract description (look for meta description or item-description)
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                     html.match(/item-description[^>]*>([\s\S]{100,5000})</i) ||
                     html.match(/<div[^>]*class[^>]*user-html[^>]*>([\s\S]{100,5000})</i) ||
                     html.match(/<p[^>]*class[^>]*description[^>]*>([\s\S]{100,2000})</i)
    let description = descMatch ? extractText(descMatch[1]) : ''
    // Clean up description
    description = description.replace(/\s+/g, ' ').trim().substring(0, 500)

    // Extract price
    const priceMatch = html.match(/\$(\d+)/) || html.match(/price[^>]*>[\s\S]*?\$(\d+)/i)
    const price = priceMatch ? priceMatch[1] : ''

    // Extract screenshots/images
    const imageMatches = html.matchAll(/<img[^>]*src=["']([^"']+\.(jpg|jpeg|png|webp|gif))["'][^>]*>/gi)
    const images: string[] = []
    const seen = new Set<string>()
    for (const match of imageMatches) {
      let imgUrl = match[1]
      if (imgUrl.startsWith('//')) {
        imgUrl = 'https:' + imgUrl
      } else if (imgUrl.startsWith('/')) {
        imgUrl = 'https://codecanyon.net' + imgUrl
      } else if (!imgUrl.startsWith('http')) {
        continue
      }
      // Look for product images (screenshots, previews, item images)
      if (imgUrl.includes('screenshot') || 
          imgUrl.includes('preview') || 
          imgUrl.includes('item') ||
          imgUrl.includes('codecanyon') ||
          imgUrl.includes('thumb')) {
        if (!seen.has(imgUrl) && 
            !imgUrl.includes('avatar') && 
            !imgUrl.includes('logo-small') &&
            !imgUrl.includes('icon') &&
            imgUrl.length > 20) {
          images.push(imgUrl)
          seen.add(imgUrl)
          if (images.length >= 10) break
        }
      }
    }

    // Extract features (look for lists or feature sections)
    const features: string[] = []
    // Try multiple patterns for features
    const featurePatterns = [
      /<ul[^>]*class[^>]*item-features[^>]*>([\s\S]{200,5000})<\/ul>/i,
      /<ul[^>]*>([\s\S]{200,5000})<\/ul>/i,
      /features[^>]*>([\s\S]{200,5000})</i,
      /<div[^>]*class[^>]*features[^>]*>([\s\S]{200,5000})</i,
    ]
    
    for (const pattern of featurePatterns) {
      const featureMatches = html.match(pattern)
      if (featureMatches) {
        const listHtml = featureMatches[1]
        const liMatches = listHtml.matchAll(/<li[^>]*>([\s\S]{5,300})</gi)
        for (const match of liMatches) {
          const feature = extractText(match[1]).trim()
          if (feature.length > 10 && feature.length < 200 && !feature.match(/^\d+$/)) {
            features.push(feature)
            if (features.length >= 20) break
          }
        }
        if (features.length > 0) break
      }
    }

    // Extract tagline (usually near the title)
    const taglineMatch = html.match(/tagline[^>]*>([^<]+)</i) ||
                        html.match(/<p[^>]*class[^>]*subtitle[^>]*>([^<]+)</i)
    const tagline = taglineMatch ? extractText(taglineMatch[1]) : ''

    // Extract demo URL
    const demoMatch = html.match(/live-preview[^>]*href=["']([^"']+)["']/i) ||
                     html.match(/demo[^>]*href=["']([^"']+)["']/i)
    const demoUrl = demoMatch ? demoMatch[1] : ''

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    return {
      name: name || 'Imported Product',
      slug,
      description: description || '',
      tagline: tagline || '',
      screenshots: images.slice(0, 10),
      features: features.slice(0, 20),
      demoUrl: demoUrl || '',
      pricing: price ? {
        'Regular License': {
          price: parseInt(price),
          billing: 'one-time',
          features: features.slice(0, 5)
        }
      } : {},
      sourceUrl: url,
    }
  } catch (error: any) {
    console.error('Error parsing CodeCanyon page:', error)
    throw new Error(`Failed to parse page: ${error.message}`)
  }
}

// Parse codelist.cc product page
async function parseCodeList(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Site blocks server-side requests (403 Forbidden). Please use "Quick Fill from Clipboard" instead.')
      }
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()

    // Similar extraction logic for codelist.cc
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                     html.match(/<title>([^<]+)<\/title>/i)
    const name = nameMatch ? extractText(nameMatch[1]) : ''

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    const description = descMatch ? extractText(descMatch[1]).substring(0, 500) : ''

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    return {
      name: name || 'Imported Product',
      slug,
      description: description || '',
      tagline: '',
      screenshots: [],
      features: [],
      demoUrl: '',
      pricing: {},
      sourceUrl: url,
    }
  } catch (error: any) {
    console.error('Error parsing codelist.cc page:', error)
    throw new Error(`Failed to parse page: ${error.message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Determine which parser to use
    let parsedData
    if (url.includes('codecanyon.net')) {
      parsedData = await parseCodeCanyon(url)
    } else if (url.includes('codelist.cc')) {
      parsedData = await parseCodeList(url)
    } else {
      return NextResponse.json({ error: 'Unsupported URL. Only CodeCanyon and codelist.cc are supported.' }, { status: 400 })
    }

    return NextResponse.json({ data: parsedData })
  } catch (error: any) {
    console.error('Error importing product:', error)
    return NextResponse.json({ error: error.message || 'Failed to import product' }, { status: 500 })
  }
}

