// app/api/generar-contenido/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
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
    const contenido = data.choices?.[0]?.message?.content;

    return NextResponse.json({ resultado: contenido || 'No se generó contenido.' });
  } catch (error) {
    console.error('Error al conectar con DeepSeek:', error);
    return NextResponse.json(
      { error: 'Hubo un error al generar el contenido con DeepSeek.' },
      { status: 500 }
    );
  }
}
