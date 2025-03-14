export const fetchFromStrapi = async (key: string, endpoint: string) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!API_URL) {
    console.error("⚠️ Error: NEXT_PUBLIC_BACKEND_URL no está definido en .env");
    return null;
  }

  try {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== "undefined") {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
        console.log(`📌 Usando caché para: ${endpoint}`);
        return JSON.parse(cachedData);
      }
    }

    // Hacer la petición a Strapi
    const res = await fetch(`${API_URL}/api/${endpoint}?populate=*`);
    if (!res.ok) {
      throw new Error(`❌ Error al obtener ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json();

    // Guardar en caché solo en el navegador
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data.data));
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error en fetchFromStrapi: ${error.message}`);
    } else {
      console.error(`Error desconocido en fetchFromStrapi: ${String(error)}`);
    }
    return null;
  }
};
