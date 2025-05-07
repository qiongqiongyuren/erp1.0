import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: 获取所有商品
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// POST: 新增商品
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const product = await prisma.product.create({ data });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}
