import { NextResponse } from 'next/server';
import FileMakerClient from '@/lib/filemaker/FileMakerClient';
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const auth = new FileMakerAuth({
      secret: process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret',
    });
    const fm = new FileMakerClient({ auth });

    const user = await fm.signup(username, password);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '登録に失敗しました',
      },
      { status: 400 }
    );
  }
}
