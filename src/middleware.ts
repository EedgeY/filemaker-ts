import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // ログインページへのアクセス
  if (request.nextUrl.pathname === '/login') {
    // トークンがある場合は/filemakerへリダイレクト
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret'
        );
        await jose.jwtVerify(token, secret);
        return NextResponse.redirect(new URL('/filemaker', request.url));
      } catch {
        // トークンが無効な場合はそのままログインページへ
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // トークンが無い場合はログインページへリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret'
    );
    await jose.jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error('トークン検証エラー:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/login', '/filemaker/:path*', '/api/filemaker/:path*'],
};
