// app/api/generaciones/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const generacion = await prisma.generacion.findUnique({
    where: { id: params.id },
  });

  if (!generacion || generacion.userId !== session.user.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  await prisma.generacion.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ mensaje: "Generación eliminada" });
}
