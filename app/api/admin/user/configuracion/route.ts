import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const prompt = formData.get('prompt')?.toString() || '';
    const archivos = formData.getAll('archivos') as File[];

    // Guardar el prompt en un archivo .txt (puedes cambiarlo por BD si prefieres)
    const promptPath = path.join(process.cwd(), 'data', 'prompt.txt');
    await mkdir(path.dirname(promptPath), { recursive: true });
    await writeFile(promptPath, prompt, 'utf8');

    // Guardar archivos subidos
    const archivosGuardados: string[] = [];
    for (const archivo of archivos) {
      const bytes = await archivo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(os.tmpdir(), archivo.name);
      await writeFile(filePath, buffer);
      archivosGuardados.push(filePath);
    }

    return NextResponse.json({
      mensaje: 'Configuración guardada con éxito',
      archivos: archivosGuardados,
    });
  } catch (error) {
    console.error('Error al guardar la configuración:', error);
    return NextResponse.json(
      { error: 'Error al guardar la configuración' },
      { status: 500 }
    );
  }
}
