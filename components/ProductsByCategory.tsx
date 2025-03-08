// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import { Card } from "./ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface ProductsByCategoryProps {
  categorySlug: string;
  title: string;
}

const ProductsByCategory = ({
  categorySlug,
  title,
}: ProductsByCategoryProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const [filteredProducts, setFilteredProducts] = useState<
    ProductType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  // Guarda el índice de la presentación seleccionada por producto (clave: producto.id)
  const [selectedPresentations, setSelectedPresentations] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}`
        );
        const data = await res.json();
        setFilteredProducts(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  // Manejar la adición al carrito usando la presentación seleccionada
  const handleAddToCart = (product: ProductType, selectedIndex: number) => {
    const { attributes } = product;
    // Extraer el array de precios (estructura flexible)
    const priceArray = Array.isArray(attributes.prices)
      ? attributes.prices
      : attributes.prices?.prices || [];
    const pres = priceArray[selectedIndex];
    const selectedPrice = pres?.precio;
    if (!selectedPrice || selectedPrice === 0) {
      toast.error("No se pudo añadir el producto al carrito");
      return;
    }

    // Construir la URL de la imagen usando la primera imagen del producto
    let imageUrl = "https://via.placeholder.com/150";
    if (
      attributes.images &&
      attributes.images.data &&
      attributes.images.data.length > 0
    ) {
      const rawUrl = attributes.images.data[0].attributes.url;
      imageUrl = rawUrl.startsWith("http")
        ? rawUrl
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl}`;
    }

    // Calcular descuento si aplica
    const discount = Number(attributes.discountPercentage) || 0;
    let discountedPrice: number | null = null;
    if (typeof selectedPrice === "number" && discount > 0) {
      discountedPrice = selectedPrice - (selectedPrice * discount) / 100;
    }

    const productToAdd = {
      id: product.id,
      productName: attributes.productName,
      slug: attributes.slug,
      description: attributes.description,
      image: imageUrl,
      quantity: 1,
      prices: [{ presentacion: pres.presentacion, precio: selectedPrice }],
      discountPercentage: discount,
      discountedPrice,
    };

    addItem(productToAdd);
    toast.success(
      `Producto añadido al carrito: ${attributes.productName} - ${pres.presentacion}`
    );
  };

  // Manejar favoritos
  const handleFavoriteClick = (
    product: ProductType,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    const isFavorite = favorites.some((item) => item.id === product.id);
    if (isFavorite) {
      removeFavorite(product.id);
      toast.info("Producto removido de favoritos ❤️");
    } else {
      addFavorite(product);
      toast.success("Producto añadido a favoritos ❤️");
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (filteredProducts && filteredProducts.length === 0)
    return <p>No se encontraron productos en esta categoría.</p>;

  return (
    <div className="w-full">
      {/* Título dinámico */}
      <h1 className="text-xl md:text-4xl font-bold text-blue-700 text-center">
        {title}
      </h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <Carousel className="carousel-container overflow-visible relative">
          <CarouselContent className="overflow-visible relative -ml-2 md:ml-4">
            {filteredProducts.map((product: ProductType) => {
              const { id, attributes } = product;
              const {
                productName,
                description,
                prices,
                images,
                isOffer,
                discountPercentage,
                slug,
              } = attributes;
              // Extraer arreglo de precios (estructura flexible)
              const priceArray = Array.isArray(prices)
                ? prices
                : prices?.prices || [];
              // Índice seleccionado para este producto; por defecto 0
              const selectedIndex =
                selectedPresentations[id] !== undefined
                  ? selectedPresentations[id]
                  : 0;
              const pres = priceArray[selectedIndex];
              const priceValue = pres?.precio;
              // Calcular descuento
              const discount = Number(discountPercentage) || 0;
              let discountedPrice: number | null = null;
              if (typeof priceValue === "number" && discount > 0) {
                discountedPrice = priceValue - (priceValue * discount) / 100;
              }
              // Construir la URL de la imagen
              let imageUrl = null;
              if (images && images.data && images.data.length > 0) {
                const rawUrl = images.data[0].attributes.url;
                imageUrl = rawUrl.startsWith("http")
                  ? rawUrl
                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl}`;
              }
              const isFavorite = favorites.some((item) => item.id === id);

              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/4 group overflow-visible relative"
                >
                  <motion.div
                    className="p-1 relative z-10"
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="py-6 px-4 border border-gray-200 shadow-lg w-96 h-[500px] flex flex-col">
                      <div className="relative w-full h-64">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={productName || "Imagen destacada"}
                            fill
                            className="object-contain rounded-lg bg-white"
                          />
                        ) : (
                          <p className="w-full h-full flex items-center justify-center bg-white text-gray-600 rounded-lg">
                            Sin imagen disponible
                          </p>
                        )}
                        <Heart
                          className={`absolute top-2 right-2 p-2 w-9 h-9 bg-white rounded-full cursor-pointer ${
                            isFavorite ? "text-red-500" : "text-gray-400"
                          }`}
                          onClick={(event) =>
                            handleFavoriteClick(product, event)
                          }
                        />
                        {isOffer && discount > 0 && (
                          <motion.div
                            className="absolute -bottom-6 right-4 bg-red-600 text-white text-sm font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg"
                            initial={{ scale: 1 }}
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0px 0px 10px rgba(0, 0, 0, 0.4)",
                                "0px 0px 20px rgba(0, 0, 0, 0.6)",
                                "0px 0px 10px rgba(0, 0, 0, 0.4)",
                              ],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {discountPercentage}%<br />
                            OFF
                          </motion.div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 mt-4">
                        <h2 className="text-xl font-bold text-blue-800">
                          {productName}
                        </h2>
                        <p
                          className="mt-2 text-sm text-gray-600"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {description}
                        </p>
                        {/* Bloque de presentación con un espacio extra */}
                        {priceArray.length > 0 && (
                          <div className="mt-4">
                            {priceArray.some(
                              (p) =>
                                p.presentacion && p.presentacion.trim() !== ""
                            ) && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">
                                  Presentación:
                                </span>
                                {priceArray.length > 1 ? (
                                  <div className="flex gap-2">
                                    {priceArray.map((p, idx) =>
                                      p.presentacion &&
                                      p.presentacion.trim() !== "" ? (
                                        <button
                                          key={p.presentacion}
                                          onClick={() =>
                                            setSelectedPresentations(
                                              (prev) => ({
                                                ...prev,
                                                [id]: idx,
                                              })
                                            )
                                          }
                                          className={`px-2 py-1 rounded text-xs font-bold border ${
                                            selectedIndex === idx
                                              ? "bg-blue-700 text-white"
                                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                          }`}
                                        >
                                          {p.presentacion}
                                        </button>
                                      ) : null
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-sm font-bold text-emerald-800">
                                    {presentationText}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        {/* Bloque de precio y botón alineados en la misma línea */}
                        <div className="mt-auto flex items-center justify-between">
                          {discount > 0 &&
                          typeof priceValue === "number" &&
                          discountedPrice !== null ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg text-red-600 line-through">
                                ${priceValue.toFixed(2)}
                              </span>
                              <span className="text-lg font-bold text-emerald-800">
                                ${discountedPrice.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-semibold text-gray-800">
                              $
                              {priceValue
                                ? priceValue.toFixed(2)
                                : "No disponible"}
                            </span>
                          )}
                          <button
                            className="bg-blue-800 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
                            onClick={() =>
                              handleAddToCart(product, selectedIndex)
                            }
                          >
                            Añadir al carrito
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 text-blue-800 hover:text-blue-600 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </CarouselPrevious>
          <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 text-blue-800 hover:text-blue-600 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </CarouselNext>
        </Carousel>
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ProductsByCategory;
