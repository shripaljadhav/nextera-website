import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'

// GET - Fetch all pages
export async function GET() {
  try {
    await requireAuth()
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

// POST - Create a new page
export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { title, slug, content, metaTitle, metaDescription, isPublished, sections } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existing = await prisma.page.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: content || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        sections: sections || null,
        isPublished: isPublished || false,
      },
    })

    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}

