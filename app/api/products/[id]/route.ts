import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'

// GET - Fetch a single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

// PUT - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if slug is taken by another product
    const existing = await prisma.product.findFirst({
      where: {
        slug,
        NOT: { id: params.id },
      },
    })

    if (existing) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id: params.id },
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

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// DELETE - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

