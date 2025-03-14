export const fetchFromStrapi = async (key: string, endpoint: string) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!API_URL) {
    console.error("⚠️ Error: NEXT_PUBLIC_BACKEND_URL no está definido en .env");
    return null;
  }

  try {
    // Revisar si hay datos en caché
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      console.log(`📌 Usando caché para: ${endpoint}`);
      return JSON.parse(cachedData);
    }

    // Hacer la petición a Strapi
    const res = await fetch(`${API_URL}/api/${endpoint}?populate=*`);
    if (!res.ok) {
      throw new Error(`❌ Error al obtener ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json();
    localStorage.setItem(key, JSON.stringify(data.data)); // Guardar en caché
    return data.data;
  } catch (error) {
    console.error(`Error en fetchFromStrapi: ${error.message}`);
    return null;
  }
};
