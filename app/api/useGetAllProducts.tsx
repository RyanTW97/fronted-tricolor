import { useEffect, useState } from "react";

export function useGetAllProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        // Transformar los productos al formato adecuado
        const products = json.data.map((product) => ({
          id: product.id,
          name: product.attributes.productName, // Nombre del producto desde attributes
          slug: product.attributes.slug, // Corregido para extraer el slug
          price: product.attributes.prices?.prices?.[0]?.precio || 0,
          image: product.attributes.images?.data?.[0]?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`
            : "/placeholder.png",
        }));

        setResult(products);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error al obtener productos");
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
