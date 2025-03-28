// app/(auth)/auth-status/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthStatusPage() {
  const { data: session } = useSession();

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded shadow text-center">
        {session ? (
          <>
            <p className="text-xl mb-4">Hola, {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-4">Iniciar sesión</h1>
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Iniciar sesión con Google
            </button>
          </>
        )}
      </div>
    </main>
  );
}
