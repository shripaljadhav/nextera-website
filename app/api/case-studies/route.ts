import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const caseStudySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
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

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ caseStudies })
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = caseStudySchema.parse(body)

    const caseStudy = await prisma.caseStudy.create({
      data: validatedData,
    })

    return NextResponse.json({ caseStudy }, { status: 201 })
  } catch (error) {
    console.error('Error creating case study:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

