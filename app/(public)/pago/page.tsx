'use client';

import Link from 'next/link';

export default function PagoPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-2xl mx-auto text-center mt-20 bg-gray-50 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">
          Desbloquea todo el poder de LinkedIn Genius 🚀
        </h1>

        <p className="text-gray-700 mb-6">
          Accede al generador completo de contenido con IA, copia directa, generación de comentarios
          automáticos y recursos exclusivos para optimizar tu presencia en LinkedIn.
        </p>

        <div className="mb-6">
          <p className="text-2xl font-bold text-indigo-600">$9.990 CLP / pago único</p>
          <p className="text-sm text-gray-500">(Acceso ilimitado a funciones premium)</p>
        </div>

        <a
          href="https://buy.stripe.com/test_4gw7wAdxC3mZd1eaEE" // ✅ Reemplaza por tu link DLocal real
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg transition"
        >
          Ir al pago seguro
        </a>

        <p className="text-sm text-gray-500 mt-4">
          ¿Tienes preguntas?{' '}
          <Link href="/contacto" className="text-indigo-600 hover:underline">
            Contáctanos
          </Link>
        </p>
      </div>
    </main>
  );
}
