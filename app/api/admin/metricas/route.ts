// app/api/admin/metricas/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Total de generaciones
    const totalGeneraciones = await prisma.generacion.count();

    // Temas más usados
    const temasMasUsados = await prisma.generacion.groupBy({
      by: ['tema'],
      _count: {
        tema: true,
      },
      orderBy: {
        _count: {
          tema: 'desc',
        },
      },
      take: 5,
    });

    // Tono más popular
    const tonoPopularRaw = await prisma.generacion.groupBy({
      by: ['tono'],
      _count: {
        tono: true,
      },
      orderBy: {
        _count: {
          tono: 'desc',
        },
      },
      take: 1,
    });

    const tonoPopular = tonoPopularRaw[0]?.tono || null;

    return NextResponse.json({
      totalGeneraciones,
      temasMasUsados: temasMasUsados.map((t) => ({
        tema: t.tema,
        _count: t._count.tema,
      })),
      tonoPopular,
    });
  } catch (error) {
    console.error('Error en métricas:', error);
    return NextResponse.json(
      { error: 'Error al obtener las métricas' },
      { status: 500 }
    );
  }
}
