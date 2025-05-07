import { NextRequest, NextResponse } from 'next/server';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();
    if (!username || !password || !email) {
      return NextResponse.json({ error: '用户名、密码和邮箱不能为空' }, { status: 400 });
    }
    // 检查用户名或邮箱是否已存在
    const existingUser = await prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
    if (existingUser) {
      return NextResponse.json({ error: '用户名或邮箱已存在' }, { status: 409 });
    }
    // 创建新用户，角色默认为 user
    const user = await prisma.user.create({
      data: { username, password, email, role: 'user' },
    });
    return NextResponse.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
