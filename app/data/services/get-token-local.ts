

export async function getAuthTokenLocal() {
  if (typeof window === "undefined") {
    throw new Error("getAuthTokenLocal solo está disponible en el cliente.");
  }

  const authToken = localStorage.getItem("token");
  console.log("Token obtenido en getAuthTokenLocaaal:", authToken);
  if (!authToken) {
    throw new Error(
      "No se encontró el token de autenticación en localStorage."
    );
  }

  return authToken;
}
