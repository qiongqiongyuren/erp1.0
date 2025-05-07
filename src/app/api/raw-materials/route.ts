import { NextRequest, NextResponse } from 'next/server';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// GET: 获取所有原材料
export async function GET() {
  const materials = await prisma.rawMaterial.findMany();
  return NextResponse.json(materials);
}

// POST: 新增原材料
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const material = await prisma.rawMaterial.create({ data });
    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}
