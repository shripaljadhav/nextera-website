import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const labItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.string().optional(),
  link: z.string().optional(),
  category: z.string().optional(),
})

export async function GET() {
  try {
    const labs = await prisma.labItem.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ labs })
  } catch (error) {
    console.error('Error fetching lab items:', error)
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
    const validatedData = labItemSchema.parse(body)

    const lab = await prisma.labItem.create({
      data: validatedData,
    })

    return NextResponse.json({ lab }, { status: 201 })
  } catch (error) {
    console.error('Error creating lab item:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

