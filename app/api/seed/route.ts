import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// One-time setup endpoint to create admin user
// Call this once after deploying to Vercel
export async function POST(request: NextRequest) {
  try {
    // Parse request body safely
    let body: { token?: string } = {}
    try {
      body = await request.json()
    } catch (e) {
      // If body is empty or invalid, continue without token check
    }

    const expectedToken = process.env.SEED_TOKEN || 'setup-admin-2024'
    
    if (body.token && body.token !== expectedToken) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const user = await prisma.user.upsert({
      where: { email: 'admin@nextera.digital' },
      update: {
        password: hashedPassword, // Update password in case it changed
      },
      create: {
        email: 'admin@nextera.digital',
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      credentials: {
        email: 'admin@nextera.digital',
        password: 'admin123',
      },
    })
  } catch (error: any) {
    console.error('Error seeding admin user:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create admin user',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

// Also allow GET for easier testing
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to seed admin user',
    endpoint: '/api/seed',
    method: 'POST',
    body: { token: 'setup-admin-2024' }
  })
}

