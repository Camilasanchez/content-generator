'use client';

import { useEffect, useState } from 'react';

export default function PromptConfigForm() {
  const [prompt, setPrompt] = useState('');
  const [archivos, setArchivos] = useState<File[]>([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Obtener el prompt actual al cargar
    fetch('/api/admin/prompt')
      .then((res) => res.json())
      .then((data) => setPrompt(data.prompt || ''));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('prompt', prompt);
    archivos.forEach((archivo) => formData.append('archivos', archivo));

    const res = await fetch('/api/admin/prompt', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setMensaje('Prompt actualizado correctamente ✅');
    } else {
      setMensaje('Error al guardar el prompt ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Prompt base oculto:</label>
        <textarea
          className="w-full p-2 border rounded-md min-h-[150px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Eres un experto en contenidos de LinkedIn..."
        ></textarea>
      </div>

      <div>
        <label className="block font-medium mb-1">Archivos adjuntos:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setArchivos(Array.from(e.target.files || []))}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Guardar configuración
      </button>

      {mensaje && <p className="text-sm text-green-600 mt-2">{mensaje}</p>}
    </form>
  );
}
