import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const solutionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().optional(),
  description: z.string().optional(),
  type: z.string(),
  status: z.string().optional(),
  isFeatured: z.boolean().optional(),
  category: z.string().optional(),
  whoItsFor: z.string().optional(),
  features: z.string().optional(),
  architecture: z.string().optional(),
  engagementOptions: z.string().optional(),
})

export async function GET() {
  try {
    const solutions = await prisma.solution.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ solutions })
  } catch (error) {
    console.error('Error fetching solutions:', error)
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
    const validatedData = solutionSchema.parse(body)

    const solution = await prisma.solution.create({
      data: validatedData,
    })

    return NextResponse.json({ solution }, { status: 201 })
  } catch (error) {
    console.error('Error creating solution:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

