import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'

// GET - Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const {
      name,
      slug,
      category,
      description,
      content,
      tagline,
      techStack,
      screenshots,
      pricing,
      changelog,
      versions,
      features,
      status,
      isFeatured,
      websiteUrl,
      demoUrl,
      githubUrl,
      documentationUrl,
      logo,
      featuredImage,
      metaTitle,
      metaDescription,
    } = body

    if (!name || !slug || !category) {
      return NextResponse.json({ error: 'Name, slug, and category are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existing = await prisma.product.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        category,
        description: description || null,
        content: content || null,
        tagline: tagline || null,
        techStack: techStack ? JSON.stringify(techStack) : null,
        screenshots: screenshots ? JSON.stringify(screenshots) : null,
        pricing: pricing ? JSON.stringify(pricing) : null,
        changelog: changelog ? JSON.stringify(changelog) : null,
        versions: versions ? JSON.stringify(versions) : null,
        features: features ? JSON.stringify(features) : null,
        status: status || 'LIVE',
        isFeatured: isFeatured || false,
        websiteUrl: websiteUrl || null,
        demoUrl: demoUrl || null,
        githubUrl: githubUrl || null,
        documentationUrl: documentationUrl || null,
        logo: logo || null,
        featuredImage: featuredImage || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

