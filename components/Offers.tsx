// @ts-nocheck
"use client";

import { useState } from "react";
import { useGetOfferProducts } from "@/app/api/useGetOfferProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card } from "./ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

const Offers = () => {
  const { loading, result }: ResponseType = useGetOfferProducts();
  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [selectedPresentations, setSelectedPresentations] = useState<{
    [key: number]: string;
  }>({});

  const handlePresentationChange = (
    productId: number,
    presentation: string
  ) => {
    setSelectedPresentations((prev) => ({
      ...prev,
      [productId]: presentation,
    }));
  };

  const handleAddToCart = (
    product: ProductType,
    selectedPresentation: string
  ) => {
    const { id, attributes } = product;
    const { prices, images, productName, discountPercentage, slug } =
      attributes;
    const priceArray = Array.isArray(prices) ? prices : prices?.prices ?? [];
    const selectedPrice =
      priceArray.find((p: any) => p.presentacion === selectedPresentation)
        ?.precio || 0;

    if (selectedPrice === 0) {
      toast.error("No se pudo añadir el producto al carrito");
      return;
    }

    const imageUrl = images?.data?.[0]?.attributes?.url
      ? images.data[0].attributes.url.startsWith("http")
        ? images.data[0].attributes.url
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`
      : "https://via.placeholder.com/150";

    // Calculamos el descuento si aplica
    const discount = Number(discountPercentage) || 0;
    let discountedPrice: number | null = null;
    if (typeof selectedPrice === "number" && discount > 0) {
      discountedPrice = selectedPrice - (selectedPrice * discount) / 100;
    }

    // Se envía un objeto plano al hook useCart
    const productToAdd = {
      id,
      productName,
      slug,
      image: imageUrl,
      quantity: 1,
      prices: [
        {
          precio: selectedPrice,
          presentacion: selectedPresentation,
        },
      ],
      discountPercentage: discount,
      discountedPrice,
    };

    console.log("Datos del producto enviados a addItem:", productToAdd);
    try {
      addItem(productToAdd);
      toast.success(`${productName} añadido al carrito 🛒`);
    } catch (error) {
      console.error("Error al añadir producto:", error);
      toast.error(
        "Hubo un problema al añadir el producto. Por favor, intenta de nuevo."
      );
    }
  };

  const handleFavoriteClick = (
    product: ProductType,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    const { id } = product;
    const isFavorite = favorites.some((item) => item.id === id);
    if (isFavorite) {
      removeFavorite(id);
      toast.info("Producto removido de favoritos ❤️");
    } else {
      addFavorite(product);
      toast.success("Producto añadido a favoritos ❤️");
    }
  };

  return (
    <div>
      <motion.h1
        className="text-xl md:text-4xl xl:text-6xl lg:text-5xl font-bold cormorant text-center mt-10 text-blue-700"
        initial={{ x: -200, scale: 0.5, opacity: 0 }}
        animate={{ x: 0, scale: 1, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        Ofertas
      </motion.h1>
      <Carousel>
        <CarouselContent className="-ml-2 md:ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result !== null &&
            result.map((product: ProductType, index) => {
              if (!product) return null;
              const { id, attributes } = product;
              const {
                images,
                productName,
                description,
                prices,
                isOffer,
                discountPercentage,
                slug,
              } = attributes;
              const uniqueKey = id || `product-${index}`;
              const priceArray = Array.isArray(prices)
                ? prices
                : prices?.prices ?? [];
              const defaultPresentation = priceArray[0]?.presentacion;
              const selectedPresentation =
                selectedPresentations[id] ?? defaultPresentation;
              const selectedPrice = priceArray.find(
                (p: any) => p.presentacion === selectedPresentation
              )?.precio;
              const displayPrice = selectedPrice || "No disponible";
              const priceAfterDiscount =
                isOffer && discountPercentage && selectedPrice
                  ? (
                      selectedPrice -
                      (selectedPrice * discountPercentage) / 100
                    ).toFixed(2)
                  : displayPrice;
              const imageUrl = images?.data?.[0]?.attributes?.url
                ? images.data[0].attributes.url.startsWith("http")
                  ? images.data[0].attributes.url
                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`
                : null;
              const isFavoriteProduct = favorites.some(
                (item) => item.id === id
              );

              return (
                <CarouselItem
                  key={uniqueKey}
                  className="md:basis-1/2 lg:basis-1/4 group overflow-visible relative"
                >
                  <motion.div
                    className="p-1 relative z-10"
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="py-4 border border-gray-200 shadow-lg p-5 min-h-[450px] flex flex-col justify-between relative">
                      {/* Agregamos el ícono de favoritos */}
                      <button
                        className="absolute top-2 right-2 p-1 rounded-full cursor-pointer shadow-md"
                        onClick={(event) => handleFavoriteClick(product, event)}
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            isFavoriteProduct ? "text-red-600" : "text-gray-400"
                          }`}
                        />
                      </button>
                      {isOffer && discountPercentage && (
                        <motion.div
                          className="absolute top-56 right-4 bg-red-600 text-white text-sm font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50"
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
                      <div className="relative flex justify-center items-center rounded-lg overflow-hidden">
                        <Link href={`/product/${slug}`} passHref>
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={productName || "Imagen destacada"}
                              width={200}
                              height={300}
                              className="object-contain"
                            />
                          ) : (
                            <p className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
                              Sin imagen disponible
                            </p>
                          )}
                        </Link>
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-lg font-bold text-blue-800">
                          {productName}
                        </h2>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <div>Presentación: </div>
                          {priceArray.map((price: any) => (
                            <button
                              key={`${uniqueKey}-price-${price.presentacion}`}
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
                          {isOffer && discountPercentage && selectedPrice ? (
                            <div>
                              <span className="text-sm text-red-600 line-through mr-2">
                                ${selectedPrice}
                              </span>
                              <span className="text-lg font-bold text-green-600">
                                ${priceAfterDiscount}
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
    </div>
  );
};

export default Offers;
