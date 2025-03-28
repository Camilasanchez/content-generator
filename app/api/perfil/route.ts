// app/api/perfil/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { biografia: true, objetivo: true, tono: true },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const { biografia, objetivo, tono } = await req.json();

  await prisma.user.update({
    where: { email: session.user.email },
    data: { biografia, objetivo, tono },
  });

  return NextResponse.json({ mensaje: 'Cambios guardados.' });
}
