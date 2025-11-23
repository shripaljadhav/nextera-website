import { NextResponse } from 'next/server'

export async function POST() {
  // Clear the session cookie
  const response = NextResponse.json({ success: true })
  response.cookies.delete('next-auth.session-token')
  response.cookies.delete('__Secure-next-auth.session-token')
  return response
}

