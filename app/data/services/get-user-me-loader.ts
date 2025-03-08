// @ts-nocheck

import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

interface UserMeResponse {
  ok: boolean;
  data: Record<string, any> | null;
  error: any | null;
}

export async function getUserMeLoader(): Promise<UserMeResponse> {
  try {
    const baseUrl = getStrapiURL();

    // Construimos la URL completa
    const url = new URL("/api/users/me", baseUrl);

    // Obtenemos el token de autenticación
    const authToken = await getAuthToken();
    if (!authToken) {
      console.warn("getUserMeLoader: No se encontró token de autenticación.");
      return {
        ok: false,
        data: null,
        error: "No se encontró token de autenticación",
      };
    }

    // Realizamos la solicitud a la API
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Intentamos parsear la respuesta
    const data = await response.json();

    // Si la respuesta no es exitosa
    if (!response.ok) {
      console.error(
        `getUserMeLoader: Error en la solicitud (${response.status})`,
        data
      );
      return {
        ok: false,
        data: null,
        error: data?.message || "Error desconocido al obtener el usuario",
      };
    }

    // Si la solicitud es exitosa
    return { ok: true, data, error: null };
  } catch (error) {
    console.error("getUserMeLoader: Error inesperado", error);
    return { ok: false, data: null, error: error.message || error };
  }
}
