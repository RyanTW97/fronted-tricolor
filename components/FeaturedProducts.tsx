// @ts-nocheck
"use client";

import { useState, useCallback } from "react";
import { useGetFeaturedProducts } from "@/app/api/useGetFeaturedProduct";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { Card } from "./ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductType } from "@/types/product";

const FeaturedProducts = () => {
  const { loading, result } = useGetFeaturedProducts();
  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [selectedPresentations, setSelectedPresentations] = useState({});

  const handlePresentationChange = useCallback((productId, presentation) => {
    setSelectedPresentations((prev) => ({
      ...prev,
      [productId]: presentation,
    }));
  }, []);

  const getImageUrl = useCallback((images) => {
    const imageUrl = images?.data?.[0]?.attributes?.url;
    if (!imageUrl) return null;
    return imageUrl.startsWith("http")
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  }, []);

  const handleAddToCart = useCallback(
    (product, selectedPresentation) => {
      try {
        const { attributes } = product;
        const priceItem = attributes.prices.find(
          (p) => p.presentacion === selectedPresentation
        );
        const selectedPrice = priceItem?.precio || 0;
        if (!selectedPrice) {
          toast.error("No se pudo añadir el producto al carrito");
          return;
        }
        const discount = Number(attributes.discountPercentage) || 0;
        const discountedPrice =
          discount > 0 && typeof selectedPrice === "number"
            ? selectedPrice - (selectedPrice * discount) / 100
            : null;

        addItem({
          id: product.id,
          productName: attributes.productName,
          slug: attributes.slug,
          description: attributes.description,
          image: getImageUrl(attributes.images),
          quantity: 1,
          prices: [
            { precio: selectedPrice, presentacion: selectedPresentation },
          ],
          discountPercentage: discount,
          discountedPrice,
        });

        toast.success(`${attributes.productName} añadido al carrito 🛒`);
      } catch (error) {
        console.error("Error inesperado:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      }
    },
    [addItem, getImageUrl]
  );

  const handleFavoriteClick = useCallback(
    (product, event) => {
      event.stopPropagation();
      const isFavorite = favorites.some((item) => item.id === product.id);
      if (isFavorite) {
        removeFavorite(product.id);
      } else {
        addFavorite(product);
      }
      toast[isFavorite ? "info" : "success"](
        `Producto ${isFavorite ? "removido" : "añadido"} de favoritos ❤️`
      );
    },
    [favorites, addFavorite, removeFavorite]
  );

  return (
    <div>
      <motion.h1
        className="text-3xl md:text-4xl xl:text-6xl lg:text-5xl font-bold cormorant text-center my-8 text-blue-700"
        initial={{ x: -200, scale: 0.5, opacity: 0 }}
        animate={{ x: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Productos Destacados
      </motion.h1>

      <Carousel className="carousel-container overflow-hidden relative">
        <CarouselContent className="overflow-visible relative -ml-2 md:ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result?.map((product: ProductType) => {
            if (!product?.attributes || !product.attributes.isFeatured)
              return null;

            const { id, attributes } = product;
            const {
              productName,
              description,
              prices = [],
              discountPercentage,
              slug,
              images,
            } = attributes;

            const selectedPresentation =
              selectedPresentations[id] || prices[0]?.presentacion;
            const selectedPrice =
              prices.find((p) => p.presentacion === selectedPresentation)
                ?.precio || "No disponible";

            const discount = Number(discountPercentage) || 0;
            const discountedPrice =
              discount > 0 && typeof selectedPrice === "number"
                ? selectedPrice - (selectedPrice * discount) / 100
                : null;

            const imageUrl = getImageUrl(images);
            const isFavoriteProduct = favorites.some((item) => item.id === id);

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
                  <Card className="py-4 border border-gray-200 shadow-lg p-5 h-[450px] flex flex-col justify-between">
                    <div className="relative flex justify-center items-center rounded-lg overflow-hidden">
                      <Link href={`/product/${slug}`}>
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={productName || "Imagen destacada"}
                            width={200}
                            height={250}
                            className="object-contain"
                          />
                        ) : (
                          <p className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
                            Sin imagen disponible
                          </p>
                        )}
                      </Link>
                      <div
                        className="absolute top-2 right-2 p-1 rounded-full cursor-pointer shadow-md"
                        onClick={(event) => handleFavoriteClick(product, event)}
                      >
                        <Heart
                          className={
                            isFavoriteProduct
                              ? "border-red-600 text-red-600"
                              : "border-gray-400 text-gray-400"
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-blue-800">
                        {productName}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span>Presentación:</span>
                        {prices.map((price) => (
                          <button
                            key={price.presentacion}
                            className={`py-1 px-3 rounded-lg text-sm ${
                              selectedPresentation === price.presentacion
                                ? "bg-blue-700 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                            onClick={() =>
                              handlePresentationChange(id, price.presentacion)
                            }
                          >
                            {price.presentacion}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        {discountedPrice !== null ? (
                          <div>
                            <span className="text-lg text-red-600 line-through mr-2">
                              ${selectedPrice}
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-semibold text-gray-800">
                            ${selectedPrice}
                          </span>
                        )}
                        <button
                          className="bg-blue-800 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
                          onClick={() =>
                            handleAddToCart(product, selectedPresentation)
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
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
