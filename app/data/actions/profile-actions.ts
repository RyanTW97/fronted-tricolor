"use server";
import qs from "qs";
import { mutateData } from "@/app/data/services/mutate-data";

export async function updateProfileAction(
  userId: string,
  jwt: string,
  formData: FormData
) {
  // Verifica que se tenga el token JWT
  if (!jwt) {
    throw new Error("No se encontró el token de autenticación.");
  }

  // Convierte el FormData en un objeto para poder trabajar con él
  const rawFormData = Object.fromEntries(formData);

  // Serializa la query para poblar relaciones o campos extra si es necesario
  const query = qs.stringify({
    populate: "*",
  });

  // Si usas Strapi v4, los datos deben estar encapsulados en un objeto "data"
  const payload = {
    data: {
      Nombre: rawFormData.nombre,
      Apellido: rawFormData.apellido,
      Provincia: rawFormData.provincia,
      Ciudad: rawFormData.ciudad,
      Telefono: rawFormData.telefono,
      Calles: rawFormData.callePrincipal,
      Referencia: rawFormData.referencias,
    },
  };

  try {
    // Realiza la llamada PUT a la API, pasando el userId y el token JWT
    const responseData = await mutateData(
      "PUT",
      `/users/${userId}?${query}`,
      payload,
      jwt
    );

    // Verifica si se recibió respuesta
    if (!responseData) {
      return { message: "Ops! Algo salió mal. Intenta de nuevo." };
    }

    return { message: "Perfil actualizado con éxito.", data: responseData };
  } catch (error) {
    console.error("Error en updateProfileAction:", error);
    throw error;
  }
}
