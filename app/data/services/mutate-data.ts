import { getAuthTokenLocal } from "@/app/data/services/get-token-local";
import { getStrapiURL } from "@/lib/utils";
console.log("Ejecutando mutateData...");

// mutate-data.ts
export async function mutateData(
  method: string,
  path: string,
  payload?: any,
  providedToken?: string
) {
  const baseUrl = getStrapiURL();
  const token = providedToken || (await getAuthTokenLocal());

  console.log("Token utilizado en mutateDataaaa:", token);

  if (!token) throw new Error("No se encontró el token de autenticación.");

  const url = new URL(path, baseUrl);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Error en la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en mutateData:", error);
    throw error;
  }
}
