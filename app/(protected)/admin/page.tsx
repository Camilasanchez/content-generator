'use client';

import { useEffect, useState } from 'react';
import AdminPromptForm from '@/components/admin/AdminPromptForm';
import AdminFileUpload from '@/components/admin/AdminFileUpload';

type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

      {/* Sección usuarios */}
      <section>
        <h2 className="text-xl font-semibold mb-2">👥 Usuarios Registrados</h2>
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo</th>
                  <th className="px-4 py-2">Fecha de registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.name || 'Sin nombre'}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Sección prompt base */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🧠 Editar Prompt Base</h2>
        <AdminPromptForm />
      </section>

      {/* Sección archivos */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📎 Subir Archivos como Contexto</h2>
        <AdminFileUpload />
      </section>
    </main>
  );
}
