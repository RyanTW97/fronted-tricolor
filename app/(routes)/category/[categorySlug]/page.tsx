"use client";

import { useGetCategoryProduct } from "@/app/api/getCategoryProduct";
import { useParams, useRouter } from "next/navigation";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "../components/Productcard";
import Filters from "../components/Filters";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { categorySlug } = params || {};

  const {
    result,
    loading: apiLoading,
    error,
  } = useGetCategoryProduct(categorySlug);
  const [filterCategory, setFilterCategory] = useState(categorySlug || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilterCategory(categorySlug || "");
  }, [categorySlug]);

  if (apiLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SkeletonSchema grid={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error al cargar productos: {error.message || "Ocurrió un error"}</p>
      </div>
    );
  }

  const formattedProducts = (result || [])
    .map((product) => {
      const { attributes } = product || {};
      if (!attributes) return null;

      const categoryName =
        attributes.category?.data?.attributes?.categoryName ||
        "Categoría no disponible";

      let imageUrl = "/placeholder.png";
      if (attributes.images?.data?.length > 0) {
        const imageData = attributes.images.data[0];
        if (imageData?.attributes?.url) {
          const rawUrl = imageData.attributes.url;
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
        categorySlug: attributes.category?.data?.attributes?.slug || "",
        slug: attributes.slug || product.slug || "unknown",
        presentations: attributes.prices || [],
        prices: attributes.prices || [],
        color: attributes.color || product.color || [],
        discountPercentage: attributes.discountPercentage || 0,
      };
    })
    .filter(Boolean);

  const handleFilterChange = (category) => {
    setIsLoading(true);
    router.push(`/category/${category}`);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
