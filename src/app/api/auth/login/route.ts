import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import FileMakerClient from '@/lib/filemaker/FileMakerClient';
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '認証情報が不足しています' },
        { status: 400 }
      );
    }

    const auth = new FileMakerAuth({
      secret: process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret',
    });
    const fm = new FileMakerClient({ auth });
    const user = await fm.findUser(username);

    if (!user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'パスワードが正しくありません' },
        { status: 401 }
      );
    }

    // JOSEトークンの生成
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret'
    );

    const token = await new jose.SignJWT({
      username: user.username,
      id: user.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    // クッキーにトークンを設定
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('認証エラー:', error);
    return NextResponse.json({ error: '認証に失敗しました' }, { status: 500 });
  }
}
