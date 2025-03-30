// components/admin/AdminPromptForm.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminPromptForm() {
  const [prompt, setPrompt] = useState("");
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch("/api/admin/prompt");
      const data = await res.json();
      setPrompt(data.prompt || "");
    };
    fetchPrompt();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-40 border rounded-md p-3"
        placeholder="Escribe aquí el prompt base..."
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Guardar
      </button>
      {guardado && <p className="text-green-600 text-sm">✅ Guardado</p>}
    </form>
  );
}
