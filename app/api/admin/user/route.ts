import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email?.endsWith('@tudominio.com')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc', // ✅ asegurarte que este campo existe
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true, // ✅ este campo también debe existir
      hasPaid: true,   // ✅ si está en schema, asegúrate de haber generado prisma client
    },
  });

  return NextResponse.json({ users });
}
