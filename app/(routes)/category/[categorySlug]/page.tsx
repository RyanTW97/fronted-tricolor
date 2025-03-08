"use client";

import { useGetCategoryProduct } from "@/app/api/getCategoryProduct";
import { useParams, useRouter } from "next/navigation";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "../components/Productcard";
import Filters from "../components/Filters";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Definimos la estructura del producto
interface Product {
  id: number;
  productName: string;
  description: string;
  image: string;
  categoryName: string;
  categorySlug: string;
  slug: string;
  presentations: any[];
  prices: any[];
  color: any[];
  discountPercentage: number;
}

export default function Page() {
  const params = useParams() as { categorySlug?: string };
  const router = useRouter();
  const categorySlug = params.categorySlug ?? "";

  const {
    result,
    loading: apiLoading,
    error,
  } = useGetCategoryProduct(categorySlug);
  const [filterCategory, setFilterCategory] = useState<string>(categorySlug);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFilterCategory(categorySlug);
  }, [categorySlug]);

  if (apiLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SkeletonSchema grid={3} />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : (error as any)?.message || "Ocurrió un error";

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error al cargar productos: {errorMessage}</p>
      </div>
    );
  }

  // ✅ Mejor manejo de los productos
  const formattedProducts: Product[] = (result || [])
    .map((product: any) => {
      if (!product?.attributes) return null;
      const { attributes } = product;

      const categoryName =
        attributes.category?.data?.attributes?.categoryName ||
        "Categoría no disponible";
      const categorySlug = attributes.category?.data?.attributes?.slug || "";
      const slug = attributes.slug || product.slug || "unknown";
      const discountPercentage = attributes.discountPercentage || 0;

      // ✅ Manejo seguro de imágenes
      let imageUrl = "/placeholder.png";
      if (attributes.images?.data?.length > 0) {
        const imageData = attributes.images.data[0];
        const rawUrl = imageData?.attributes?.url;
        if (rawUrl) {
          imageUrl = rawUrl.startsWith("http")
            ? rawUrl
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl}`;
        }
      }

      return {
        id: product.id,
        productName: attributes.productName || "Producto sin nombre",
        description: attributes.description || "Sin descripción",
        image: imageUrl,
        categoryName,
        categorySlug,
        slug,
        presentations: attributes.prices || [],
        prices: attributes.prices || [],
        color: attributes.color || [],
        discountPercentage,
      };
    })
    .filter(Boolean) as Product[];

  const handleFilterChange = (category: string) => {
    setIsLoading(true);
    router.push(`/category/${category}`);
    setTimeout(() => setIsLoading(false), 500);
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <motion.h1
          className="text-center text-6xl cormorant text-blue-800 py-4"
          key={formattedProducts?.[0]?.categoryName || "default"}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={titleVariants}
          transition={{ duration: 0.5 }}
        >
          {formattedProducts?.[0]?.categoryName || "Categoría no disponible"}
        </motion.h1>
      </header>

      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-100 p-4">
          <Filters
            setFilterCategory={handleFilterChange}
            selectedCategory={filterCategory}
          />
        </aside>

        <main className="w-3/4 p-6">
          <div className="grid gap-5 mt-8 md:grid-cols-3 md:gap-10">
            {isLoading || apiLoading ? (
              <SkeletonSchema grid={3} />
            ) : formattedProducts.length > 0 ? (
              formattedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No se encontraron productos para esta categoría.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
