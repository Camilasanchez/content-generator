// app/admin/configuracion/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ConfiguracionAdmin() {
  const [prompt, setPrompt] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetch('/api/admin/configuracion')
      .then((res) => res.json())
      .then((data) => setPrompt(data.prompt || ''));
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    const res = await fetch('/api/admin/configuracion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setMensaje(data.mensaje || 'Configuración guardada');
    setCargando(false);
  };

  return (
    <main className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Configuración del Generador IA</h1>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Prompt base (oculto al usuario):
          </label>
          <textarea
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Prompt personalizado que guiará la generación de contenido"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {cargando ? 'Guardando...' : 'Guardar'}
        </button>

        {mensaje && <p className="text-green-600 mt-2">{mensaje}</p>}
      </form>
    </main>
  );
}
