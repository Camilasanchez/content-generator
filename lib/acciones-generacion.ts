// lib/acciones-generacion.ts
import { prisma } from "@/lib/prisma"

export async function guardarGeneracion({
  userId,
  idea,
  proposito,
  tono,
  resultado,
  tema,
  tipo,
}: {
  userId: string
  idea: string
  proposito: string
  tono?: string
  resultado: string
  tema: string
  tipo: string
}) {
  return await prisma.generacion.create({
    data: {
      userId,
      idea,
      proposito,
      tono,
      resultado,
      tema,
      tipo,
    }
  })
}
