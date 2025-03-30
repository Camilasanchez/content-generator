import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">
          Potencia tu marca personal con IA 🤖
        </h1>
        <p className="text-lg text-muted">
          LinkedIn Genius te ayuda a crear contenido personalizado y efectivo para destacar en LinkedIn en minutos.
        </p>
        <Link
          href="/dashboard/generar-post"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-card hover:bg-primary-dark transition"
        >
          ✍️ Comienza a generar contenido
        </Link>
        <p className="text-sm text-muted mt-2">Requiere iniciar sesión</p>
      </div>

      <div className="mt-10">
        <img
          src="/illustration.png"
          alt="Ilustración IA y contenido"
          className="max-w-md w-full mx-auto"
        />
      </div>
    </main>
  );
}
