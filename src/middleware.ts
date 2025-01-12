import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const isAuthApiPath = path === '/api/auth/login';
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/filemaker', request.nextUrl));
  }

  if (!isPublicPath && !token && !isAuthApiPath) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/filemaker', '/login', '/signup', '/api/auth/login'],
};
