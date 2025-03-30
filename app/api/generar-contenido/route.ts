// app/api/generar-contenido/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { tema } = body;

    if (!tema) {
      return NextResponse.json({ error: 'Tema no proporcionado' }, { status: 400 });
    }

    const promptBasePath = path.join(process.cwd(), 'data/prompt.txt');
    const promptBase = await readFile(promptBasePath, 'utf8');

    const promptFinal = `${promptBase.trim()}\n\nTema: ${tema}`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: promptFinal }],
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek error: ${response.statusText}`);
    }

    const data = await response.json();
    const contenido = data.choices?.[0]?.message?.content || 'No se generó contenido.';

    // Guardar en la base de datos
    await prisma.generacion.create({
      data: {
        userId: session.user.id,
        tema,
        tipo: 'texto',       // puedes ajustarlo si tienes más tipos
        tono: 'informativo', // puedes cambiar esto luego según lo que elija el usuario
        idea: tema,
        proposito: 'contenido',
        resultado: contenido
      }
    });

    return NextResponse.json({ resultado: contenido });

  } catch (error) {
    console.error('Error al generar y guardar contenido:', error);
    return NextResponse.json(
      { error: 'Hubo un error al generar el contenido con DeepSeek.' },
      { status: 500 }
    );
  }
}
