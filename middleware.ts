// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; // Usar la instancia única de Prisma

// Configuración de rutas protegidas
const PROTECTED_PATHS = [
  "/dashboard",
  "/admin",
  "/pago" // Agregar pago si necesita protección
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Verificar si la ruta necesita protección
  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path));
  
  if (!isProtected) return NextResponse.next();

  try {
    const token = await getToken({ req });
    
    // Redirigir usuarios no autenticados
    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
      );
    }

    // Verificar estado de pago para rutas de dashboard
    if (pathname.startsWith("/dashboard")) {
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { hasPaid: true }
      });

      if (!user?.hasPaid) {
        return NextResponse.redirect(new URL("/pago", req.url));
      }
    }

    return NextResponse.next();
    
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", req.url));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Excluye rutas estáticas
}