import { useEffect, useState } from "react";
import React from "react";

export function useGetOfferProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isOffer][$eq]=true&populate=*`;
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        setResult(json.data || []);
      } catch (error: any) {
        console.error("Error fetching offer products:", error.message);
        setError(error.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
