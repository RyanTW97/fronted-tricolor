// @ts-nocheck
import { useEffect, useState } from "react";

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
        );
        if (!response.ok) throw new Error("Error al obtener los productos");

        const jsonData = await response.json();
        console.log("Raw JSON data:", jsonData);

        // Asegúrate de procesar correctamente el JSON
        const productsArray = jsonData.data || [];
        console.log("Processed products:", productsArray);

        setProducts(productsArray);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
