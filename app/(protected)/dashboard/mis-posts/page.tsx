"use client";

import { useEffect, useState } from "react";

export default function MisPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Aquí harías un fetch a tu API /api/posts para traer los posts guardados
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/deepseek", { method: "GET" });
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Mis Posts</h1>
      {posts.length === 0 ? (
        <p className="mt-4">No hay posts guardados</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
              <h2 className="font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              {/* A futuro, métricas de LinkedIn si las conectas */}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
