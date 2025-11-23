import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const timelineEventSchema = z.object({
  year: z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
  tag: z.string().optional(),
  order: z.number().optional(),
})

export async function GET() {
  try {
    const events = await prisma.timelineEvent.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching timeline events:', error)
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
    const validatedData = timelineEventSchema.parse(body)

    const event = await prisma.timelineEvent.create({
      data: validatedData,
    })

    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    console.error('Error creating timeline event:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

