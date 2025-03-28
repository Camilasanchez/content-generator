// app/api/admin/update-payment/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.email !== 'admin@tudominio.com') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { hasPaid: true },
    });

    return NextResponse.json({ message: 'Usuario actualizado', user });
  } catch (error) {
    return NextResponse.json(
      { error: 'No se pudo actualizar el usuario' },
      { status: 500 }
    );
  }
}
