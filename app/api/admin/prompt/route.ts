// app/api/admin/prompt/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const ultimaConfig = await prisma.promptConfig.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ prompt: ultimaConfig?.prompt || "" });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { prompt } = await req.json();

  const nuevaConfig = await prisma.promptConfig.create({
    data: { prompt },
  });

  return NextResponse.json({ ok: true, config: nuevaConfig });
}
