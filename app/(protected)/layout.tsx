// app/(protected)/layout.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    const isAdmin = (session?.user as { role?: string })?.role === "admin";

  const navItems = [
    { href: "/dashboard", label: "🏠 Dashboard" },
    { href: "/dashboard/generar-post", label: "✍️ Generar post" },
    { href: "/dashboard/mis-posts", label: "📂 Mis posts" },
    { href: "/dashboard/mi-perfil", label: "👤 Mi perfil" },
  ];

  if (isAdmin) {
    navItems.push({ href: "/admin", label: "🛠️ Admin" });
  }

  return (
    <div>
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-between fixed top-0 left-0 w-full z-10">
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="pt-20 px-4">{children}</div>
    </div>
  );
}
