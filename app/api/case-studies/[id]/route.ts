import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const caseStudySchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  client: z.string().optional(),
  industry: z.string().optional(),
  problem: z.string().optional(),
  result: z.string().optional(),
  background: z.string().optional(),
  challenge: z.string().optional(),
  whatWeBuilt: z.string().optional(),
  results: z.string().optional(),
  techStack: z.string().optional(),
  servicesUsed: z.string().optional(),
  tags: z.string().optional(),
  whatsNext: z.string().optional(),
  serviceId: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: params.id },
    })

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json({ caseStudy })
  } catch (error) {
    console.error('Error fetching case study:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = caseStudySchema.parse(body)

    const caseStudy = await prisma.caseStudy.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json({ caseStudy })
  } catch (error) {
    console.error('Error updating case study:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.caseStudy.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting case study:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

