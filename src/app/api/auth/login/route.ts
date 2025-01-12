'use server';
import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import FileMakerClient from '@/lib/filemaker/FileMakerClient';
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';

export async function POST(request: Request) {
  console.log('POSTリクエストが受信されました');
  console.log('Request:', request);

  try {
    const { username, password } = await request.json();
    console.log('リクエストボディ:', { username, password });

    if (!username || !password) {
      console.log('エラー: 認証情報が不足しています');
      return NextResponse.json(
        { error: '認証情報が不足しています' },
        { status: 400 }
      );
    }

    const auth = new FileMakerAuth({
      secret: process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret',
    });
    const fm = new FileMakerClient({ auth });
    console.log('FileMakerClient:', fm);

    const user = await fm.findUser(username);
    console.log('findUserの結果:', user);

    if (!user) {
      console.log('エラー: ユーザーが見つかりません');
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log('パスワードの比較結果:', isValid);

    if (!isValid) {
      console.log('エラー: パスワードが正しくありません');
      return NextResponse.json(
        { error: 'パスワードが正しくありません' },
        { status: 401 }
      );
    }
    console.log('認証成功:', user);
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
      maxAge: 24 * 60 * 60, //24時間
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
