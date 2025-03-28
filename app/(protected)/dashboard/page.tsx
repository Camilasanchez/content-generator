"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div className="p-8">Cargando...</div>;
  
  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {session.user?.name}</h1>
      <p className="mt-2">Aquí verás tu contenido privado.</p>
    </main>
  );
}