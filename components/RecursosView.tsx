// components/RecursosView.tsx
"use client";

import { useState } from "react";

const recursos = [
  {
    titulo: "Guía de publicaciones ganadoras",
    descripcion: "Plantillas y ejemplos de publicaciones que generan interacción.",
    enlace: "https://tu-enlace.com/publicaciones-ganadoras"
  },
  {
    titulo: "Estrategia de comentarios",
    descripcion: "Técnicas para comentar de forma efectiva en LinkedIn.",
    enlace: "https://tu-enlace.com/comentarios-efectivos"
  },
  {
    titulo: "Guía de visibilidad en LinkedIn",
    descripcion: "Recomendaciones para optimizar tu perfil y aumentar alcance.",
    enlace: "https://tu-enlace.com/guia-visibilidad"
  },
  {
    titulo: "Plantilla de calendario de contenido",
    descripcion: "Organiza tus ideas y mantente constante en tus publicaciones.",
    enlace: "https://tu-enlace.com/calendario"
  },
];

export default function RecursosView() {
  return (
    <section className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Recursos de Apoyo</h2>
      <ul className="space-y-4">
        {recursos.map((recurso, index) => (
          <li
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {recurso.titulo}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{recurso.descripcion}</p>
            <a
              href={recurso.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Ver recurso
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
