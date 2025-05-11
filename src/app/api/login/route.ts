import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// 使用单例模式创建 Prisma 客户端实例
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

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
