import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const totalGeneraciones = await prisma.generacion.count();

    const temasMasUsados = await prisma.generacion.groupBy({
      by: ['tema'],
      _count: { tema: true },
      orderBy: { _count: { tema: 'desc' } },
      take: 5,
    });

    const tonoPopularRaw = await prisma.generacion.groupBy({
      by: ['tono'],
      _count: { tono: true },
      orderBy: { _count: { tono: 'desc' } },
      take: 1,
    });

    const porTono = await prisma.generacion.groupBy({
      by: ['tono'],
      _count: true,
    });

    const porProposito = await prisma.generacion.groupBy({
      by: ['proposito'],
      _count: true,
    });

    return NextResponse.json({
      totalGeneraciones,
      temasMasUsados: temasMasUsados.map((t) => ({
        tema: t.tema,
        _count: t._count.tema,
      })),
      tonoPopular: tonoPopularRaw[0]?.tono || null,
      porTono,
      porProposito,
    });
  } catch (error) {
    console.error('Error en métricas:', error);
    return NextResponse.json(
      { error: 'Error al obtener las métricas' },
      { status: 500 }
    );
  }
}
