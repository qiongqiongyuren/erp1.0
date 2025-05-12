import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';

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
    const { username, password, email } = body;

    if (!username || !password || !email) {
      return NextResponse.json(
        { error: 'Username, password and email are required' },
        { status: 400 }
      );
    }

    // 检查用户名或邮箱是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      );
    }

    // 创建新用户
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role: 'user'
      }
    });

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
