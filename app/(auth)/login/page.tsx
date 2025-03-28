// app/(auth)/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/protected");
    }
  }, [status, router]);

  const handleSignIn = () => {
    setLoading(true);
    signIn("google");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
        {loading ? (
          <p className="text-gray-600">Redirigiendo a Google...</p>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión con Google
          </button>
        )}
      </div>
    </main>
  );
}