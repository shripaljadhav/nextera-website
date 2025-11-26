import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// One-time setup endpoint to create admin user
// Call this once after deploying to Vercel
export async function POST(request: NextRequest) {
  try {
    // Optional: Add a secret token check for security
    const { token } = await request.json()
    const expectedToken = process.env.SEED_TOKEN || 'setup-admin-2024'
    
    if (token !== expectedToken) {
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
      { error: error.message || 'Failed to create admin user' },
      { status: 500 }
    )
  }
}

