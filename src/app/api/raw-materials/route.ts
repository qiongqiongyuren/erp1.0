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

// GET: 获取所有原材料
export async function GET() {
  try {
    const materials = await prisma.rawMaterial.findMany();
    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: 新增原材料
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const material = await prisma.rawMaterial.create({ data: body });
    return NextResponse.json(material);
  } catch (error) {
    console.error('Error creating material:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
