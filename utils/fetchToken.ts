async function fetchToken() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  try {
    const response = await fetch(`${baseUrl}/api/token`, {
      method: "GET",
      credentials: "include", // Asegura que las cookies se envíen con la solicitud
    });

    if (!response.ok) {
      throw new Error(`Error fetching token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
}
