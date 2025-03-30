"use client";

import { useState } from "react";

export default function AdminFileUpload() {
  const [mensaje, setMensaje] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("archivo", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMensaje(data.mensaje || "Archivo subido");
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept=".pdf,.txt,.csv"
        onChange={handleUpload}
        className="block w-full"
      />
      {mensaje && <p className="text-green-600">{mensaje}</p>}
    </div>
  );
}
