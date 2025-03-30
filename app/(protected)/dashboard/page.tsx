// app/protected/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [generaciones, setGeneraciones] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await fetch("/api/mis-generaciones");
      const data = await res.json();
      setGeneraciones(data);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const eliminarGeneracion = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar esta generación?")) return;
    await fetch(`/api/generaciones/${id}`, { method: "DELETE" });
    setGeneraciones((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tu contenido generado</h1>

      {cargando ? (
        <p>Cargando...</p>
      ) : generaciones.length === 0 ? (
        <p className="text-gray-600">Aún no has generado contenido.</p>
      ) : (
        <div className="grid gap-4">
          {generaciones.map((gen) => (
            <div
              key={gen.id}
              className="bg-white rounded-xl shadow p-6 border relative group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-indigo-600 font-semibold">
                  {gen.tono || "Tono no definido"}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(gen.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {gen.tema}
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {gen.resultado}
              </p>
              <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  onClick={() => navigator.clipboard.writeText(gen.resultado)}
                >
                  Copiar
                </button>
                <button
                  className="text-sm bg-red-200 hover:bg-red-400 text-red-800 px-3 py-1 rounded"
                  onClick={() => eliminarGeneracion(gen.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
