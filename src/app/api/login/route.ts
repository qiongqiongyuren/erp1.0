import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 简单的验证逻辑
    if (username === 'admin' && password === 'admin') {
      return NextResponse.json({ 
        success: true,
        user: {
          username: 'admin',
          role: 'admin'
        }
      });
    }

    return NextResponse.json(
      { success: false, message: '用户名或密码错误' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
