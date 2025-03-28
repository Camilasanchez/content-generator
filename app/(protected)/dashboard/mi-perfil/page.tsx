'use client';

import { useState, useEffect } from 'react';

export default function PerfilPage() {
  const [biografia, setBiografia] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [tono, setTono] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(data => {
        setBiografia(data.biografia || '');
        setObjetivo(data.objetivo || '');
        setTono(data.tono || '');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/perfil', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ biografia, objetivo, tono }),
    });

    const data = await res.json();
    setMensaje(data.mensaje || 'Cambios guardados.');
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tu Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Biografía:</label>
          <textarea
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Objetivo en LinkedIn:</label>
          <input
            type="text"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tono preferido de escritura:</label>
          <select
            value={tono}
            onChange={(e) => setTono(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecciona un tono</option>
            <option value="profesional">Profesional</option>
            <option value="cercano">Cercano</option>
            <option value="inspirador">Inspirador</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded hover:bg-indigo-700"
        >
          Guardar cambios
        </button>
      </form>

      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
    </main>
  );
}
