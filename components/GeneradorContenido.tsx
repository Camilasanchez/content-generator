'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GeneradorContenido() {
  const [tema, setTema] = useState('');
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const manejarGeneracion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema) return;

    setCargando(true);
    setResultado('');
    setError('');

    try {
      const res = await fetch('/api/generar-contenido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema }),
      });

      if (!res.ok) throw new Error('Error al generar contenido');

      const data = await res.json();
      setResultado(data.resultado);
    } catch (err) {
      setError('Ocurrió un error al generar el contenido.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Generar Contenido con IA</h2>
      <form onSubmit={manejarGeneracion} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tema:</label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Ej: Marca personal, ventas B2B, liderazgo femenino..."
          />
        </div>
        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {cargando ? 'Generando...' : 'Generar'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {resultado && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md relative overflow-hidden">
          <p className="mb-2 text-sm text-gray-800">
            📢 ¡Aquí tienes un ejemplo de contenido para LinkedIn sobre "{tema}"!
          </p>
          <p className="text-gray-900 line-clamp-2 blur-sm hover:blur-none transition duration-300 ease-in-out">
            {resultado}
          </p>
          <div className="mt-4">
            <Link
              href="/pago"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition"
            >
              ¿Quieres ver el contenido completo?
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
