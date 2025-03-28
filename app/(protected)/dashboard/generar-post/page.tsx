'use client';

import { useState } from 'react';

export default function GenerarPostPage() {
  const [tema, setTema] = useState('');
  const [tipo, setTipo] = useState('texto+imagen');
  const [tono, setTono] = useState('profesional');
  const [postGenerado, setPostGenerado] = useState('');
  const [comentarioGenerado, setComentarioGenerado] = useState('');
  const [copiado, setCopiado] = useState(false);

  const handleGenerar = async (action: 'post' | 'comentario') => {
    try {
      const res = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          tema: action === 'post' ? tema : undefined,
          tipo,
          tono,
          post: postGenerado,
        }),
      });

      const data = await res.json();
      if (action === 'post') setPostGenerado(data.post);
      if (action === 'comentario') setComentarioGenerado(data.comentario);
    } catch (err: any) {
      alert(err.message || 'Error al generar contenido');
    }
  };

  const copiarAlPortapapeles = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Generador IA Personalizado</h1>

      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault();
        handleGenerar('post');
      }}>
        <div>
          <label className="block text-sm font-medium mb-1">Tema del post:</label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Liderazgo femenino, IA en ventas, etc."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Formato:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="texto+imagen">Texto + Imagen</option>
              <option value="solo texto">Solo texto</option>
              <option value="lista">Lista</option>
              <option value="historia">Historia / experiencia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tono:</label>
            <select
              value={tono}
              onChange={(e) => setTono(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="profesional">Profesional</option>
              <option value="cercano">Cercano</option>
              <option value="inspirador">Inspirador</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Generar post
        </button>
      </form>

      {postGenerado && (
        <div className="bg-gray-50 p-4 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">📢 Tu post generado:</h2>
          <p className="whitespace-pre-line text-gray-700">{postGenerado}</p>

          <button
            onClick={() => copiarAlPortapapeles(postGenerado)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {copiado ? '✅ ¡Copiado!' : 'Copiar post'}
          </button>
        </div>
      )}

      {postGenerado && (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600 italic">
            📌 Consejo: Comentar tu propio post justo después de publicarlo ayuda a activar el algoritmo de LinkedIn.
            Le da más contexto al contenido, aumenta la interacción y mejora su alcance.
          </p>
          <button
            onClick={() => handleGenerar('comentario')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Generar comentario para este post
          </button>
        </div>
      )}

      {comentarioGenerado && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800 mb-1">💬 Comentario sugerido:</h3>
          <p className="text-blue-900">{comentarioGenerado}</p>
          <button
            onClick={() => copiarAlPortapapeles(comentarioGenerado)}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
    >
           Copiar comentario
    </button>
        </div>
      )}
    </main>
  );
}
