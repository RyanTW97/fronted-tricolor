"use client";
import { useEffect, useState } from "react";

export function useGetProductField() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`; // Cambiamos el endpoint al de categorías
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json); // Guardamos la respuesta completa
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error desconocido");
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
