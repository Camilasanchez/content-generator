'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-700">
          LinkedIn Genius
        </Link>

        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-indigo-700 font-medium">
            Inicio
          </Link>
          <Link href="/#recursos" className="text-gray-600 hover:text-indigo-700 font-medium">
            Recursos
          </Link>

          {session ? (
            <>
              <Link href="/protected" className="text-gray-600 hover:text-indigo-700 font-medium">
                Mi cuenta
              </Link>
              <button
                onClick={() => signOut()}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
