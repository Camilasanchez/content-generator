"use client";
import { useEffect, useState } from "react";

type UserData = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
};

export default function AdminPage() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.name || "-"}</td>
              <td className="p-2 border">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}