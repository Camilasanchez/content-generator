// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import fs from "fs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("archivo") as File;

  if (!file) {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const dirPath = path.join(process.cwd(), "uploads", "archivos-contexto");

  // Crear carpeta si no existe
  if (!fs.existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, filename);

  await writeFile(filePath, buffer);

  // Guardamos la ruta del archivo en PromptConfig
  const lastConfig = await prisma.promptConfig.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (lastConfig) {
    const existingFiles = lastConfig.files ? JSON.parse(lastConfig.files) : [];
    const newFiles = [...existingFiles, filePath];

    await prisma.promptConfig.update({
      where: { id: lastConfig.id },
      data: { files: JSON.stringify(newFiles) },
    });
  }

  return NextResponse.json({ mensaje: "✅ Archivo subido correctamente" });
}
