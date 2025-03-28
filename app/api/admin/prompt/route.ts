// app/api/admin/prompt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, files } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt requerido' }, { status: 400 });
    }

    const nuevaConfig = await prisma.promptConfig.create({
      data: {
        prompt,
        files: files || [],
      },
    });

    return NextResponse.json({ ok: true, config: nuevaConfig });
  } catch (error) {
    console.error('Error al guardar el prompt:', error);
    return NextResponse.json({ error: 'Error interno al guardar el prompt' }, { status: 500 });
  }
}
