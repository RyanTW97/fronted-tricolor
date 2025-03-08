export function getAuthToken() {
  if (typeof document !== "undefined") {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="));

    return cookieString ? cookieString.split("=")[1] : null;
  }

  return null; // Si no estamos en el cliente, devolver null
}
