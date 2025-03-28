'use client';

import { useEffect, useState } from 'react';

export default function AdminMetricasPage() {
  const [metricas, setMetricas] = useState<null | {
    totalGeneraciones: number;
    temasMasUsados: { tema: string; _count: number }[];
    tonoPopular: string | null;
  }>(null);

  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/metricas')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setMetricas(data);
        }
      })
      .catch(() => setError('Error al obtener las métricas.'));
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Métricas de Generación de Contenido</h1>

      {error && <p className="text-red-600">{error}</p>}

      {metricas && (
        <div className="space-y-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Total de contenidos generados</h2>
            <p className="text-3xl font-bold text-indigo-600">{metricas.totalGeneraciones}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Temas más utilizados</h2>
            <ul className="list-disc list-inside">
              {metricas.temasMasUsados.map((tema, i) => (
                <li key={i}>
                  <strong>{tema.tema}</strong>: {tema._count} veces
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Tono más popular</h2>
            <p className="text-xl text-gray-700">{metricas.tonoPopular || 'Sin información'}</p>
          </div>
        </div>
      )}
    </main>
  );
}
