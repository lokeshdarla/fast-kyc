import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const wallet = request.cookies.get('wallet')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (!wallet && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/connect', request.url))
  }

  if (wallet && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
