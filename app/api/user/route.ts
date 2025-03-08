import { NextResponse } from "next/server";
import { getAuthToken } from "@/app/data/services/get-token";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";

export async function GET() {
  // Obtén el token de autenticación
  const token = await getAuthToken();

  // Si no hay token, devuelve respuesta inmediata
  if (!token) {
    return NextResponse.json({
      ok: false,
      data: null,
      error: "No se encontró token de autenticación.",
    });
  }

  // Llama a getUserMeLoader() solo si hay un token
  const userData = await getUserMeLoader();
  if (userData.ok) {
    return NextResponse.json({ ok: true, data: userData.data });
  }

  // Devuelve error si el usuario no es válido
  return NextResponse.json({
    ok: false,
    data: null,
    error: "Usuario no autenticado o token inválido.",
  });
}
