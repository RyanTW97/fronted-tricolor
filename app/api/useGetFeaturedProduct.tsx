import { useEffect, useState } from "react";
import React from "react";

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log("useGetFeaturedProducts - Fetching from:", url);
        const res = await fetch(url);
        const json = await res.json();

        // Muestra la respuesta completa de Strapi
        console.log("useGetFeaturedProducts - Full JSON response:", json);
        console.log("useGetFeaturedProducts - data:", json.data);

        setResult(json.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
