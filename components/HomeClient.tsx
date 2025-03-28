'use client';

import Link from 'next/link';
import { useState } from 'react';

const recursos = [
  {
    titulo: 'Guía de Marca Personal',
    descripcion: 'Aprende a construir una presencia fuerte en LinkedIn.',
    enlace: '#',
  },
  {
    titulo: 'Plantilla de Publicaciones',
    descripcion: 'Ideas y estructuras para crear contenido de alto impacto.',
    enlace: '#',
  },
  {
    titulo: 'Checklists para tu perfil',
    descripcion: 'Asegúrate de tener un perfil optimizado.',
    enlace: '#',
  },
];

export default function HomeClient() {
  const [tema, setTema] = useState('');
  const [resultado, setResultado] = useState('');

  const manejarGeneracion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema) return;
    setResultado(
      `📢 ¡Aquí tienes un ejemplo de contenido para LinkedIn sobre "${tema}"!\n\n🔹 "En un mundo digital cambiante, el ${tema} ya no es opcional. Aprende a destacar, conecta con tu red y transforma tu presencia online.`
    );
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Sección de bienvenida */}
        <section className="text-center bg-gray-50 p-10 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Bienvenido a LinkedIn Genius
          </h1>
          <p className="text-gray-700 mb-6">
            Una plataforma inteligente para potenciar tu marca personal y tus oportunidades laborales.
          </p>
          <Link
            href="/login"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Inicia sesión
          </Link>
        </section>

        {/* Sección de generación de contenido */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Prueba el generador de contenido IA</h2>
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
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Generar contenido de prueba
            </button>
          </form>

          {resultado && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <p className="text-gray-800 whitespace-pre-line blur-sm select-none">
                {resultado} ...
              </p>
              <div className="mt-4">
                <Link
                  href="/pago"
                  className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded hover:bg-indigo-700 transition"
                >
                  ¿Quieres ver el contenido completo?
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Sección de recursos */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recursos Recomendados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recursos.map((recurso, index) => (
              <div
                key={index}
                className="border rounded-md p-4 bg-gray-50 hover:shadow transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">{recurso.titulo}</h3>
                <p className="text-sm text-gray-600 mb-2">{recurso.descripcion}</p>
                <a
                  href={recurso.enlace}
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Ver recurso →
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
