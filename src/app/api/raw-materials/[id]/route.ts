import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT: 更新原材料
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const material = await prisma.rawMaterial.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

// DELETE: 删除原材料
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.rawMaterial.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
