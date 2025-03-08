import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define rutas protegidas
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Solo actúa si la ruta está protegida
  if (!protectedRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.next();
  }

  // Verifica si existe un token en las cookies
  const token = request.cookies.get("jwt")?.value;
  if (!token) {
    console.warn("Middleware: No se encontró token.");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirige a "/signin" si no hay token
  return NextResponse.next();
}

// Configuración del matcher
export const config = {
  matcher: ["/dashboard/:path*"],
};
