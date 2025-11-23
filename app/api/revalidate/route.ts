import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path') || '/'

    revalidatePath(path)
    
    return NextResponse.json({ revalidated: true, path })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}

