export function getAuthToken(): string | null {
  // Obtiene el token del almacenamiento local (o cualquier fuente que uses)
  return localStorage.getItem("token");
}
