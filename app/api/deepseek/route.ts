import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // Asegúrate que este path es correcto
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

type RequestBody = {
  action: "post" | "comentario";
  tema?: string;
  tipo?: string;
  tono?: string;
  post?: string;
};

const PROMPT_TEMPLATES = {
  post: "Genera un post de tipo {tipo} con tono {tono} sobre {tema}, ideal para LinkedIn.",
  comentario: "Genera un comentario estratégico que complemente este post: {post}.",
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body: RequestBody = await req.json();
    const { action, tema, tipo, tono, post } = body;

    if (!action || !PROMPT_TEMPLATES[action]) {
      throw new Error("Acción no válida");
    }

    const prompt = PROMPT_TEMPLATES[action]
      .replace("{tema}", tema || "")
      .replace("{tipo}", tipo || "")
      .replace("{tono}", tono || "")
      .replace("{post}", post || "");

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    });

    const generated = completion.choices[0].message.content;

    // Guardar la métrica en la base de datos
    if (action === "post" && session?.user?.id) {
      await prisma.generacion.create({
        data: {
          userId: session.user.id,
          tema: tema || "Sin tema",
        },
      });
    }

    return NextResponse.json({
      [action]: generated,
    });
  } catch (err: any) {
    const error = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error }, { status: 500 });
  }
}
