"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a tu Panel</h1>
        <p className="mb-6 text-lg">
          Hola, <strong>{session?.user?.name}</strong> 👋
        </p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}
