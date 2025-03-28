// app/api/metricas/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const temasMasUsados = await prisma.generacion.groupBy({
      by: ['tema'],
      _count: true,
      orderBy: { _count: { tema: 'desc' } },
      take: 5
    });

    return NextResponse.json({ temasMasUsados });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las métricas' }, { status: 500 });
  }
}
