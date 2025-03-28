// app/(protected)/dashboard/bienvenida/page.tsx
'use client';

import Link from 'next/link';

export default function BienvenidaPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-gray-900 p-6">
      <div className="max-w-xl w-full bg-gray-50 shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">🎉 ¡Bienvenida a LinkedIn Genius!</h1>
        <p className="text-gray-700 mb-6">
          Ya tienes acceso completo a la plataforma. Ahora elige cómo quieres comenzar:
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <Link
            href="/dashboard/generar-post"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            ✍️ Crear mi primer post
          </Link>

          <Link
            href="/dashboard/mi-perfil"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
          >
            👤 Completar mi perfil
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          ¿Tienes dudas? Escríbenos por WhatsApp o correo, y estaremos felices de ayudarte.
        </p>
      </div>
    </main>
  );
}
