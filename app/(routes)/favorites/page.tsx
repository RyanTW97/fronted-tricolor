// @ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { HeartCrack, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const [selectedPresentations, setSelectedPresentations] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    console.log("Favoritos cargados:", favorites);
  }, [favorites]);

  const handlePresentationChange = (
    productId: number,
    presentation: string
  ) => {
    setSelectedPresentations((prev) => ({
      ...prev,
      [productId]: presentation,
    }));
  };

  const handleRemoveFavorite = (productId: number, productName: string) => {
    removeFavorite(productId);
    toast.info(`"${productName}" ha sido eliminado de tus favoritos ❤️`);
  };

  const handleAddToCart = (product: any, selectedPresentation: string) => {
    try {
      const productData = product.attributes;
      const priceItem = productData.prices.find(
        (p: any) => p.presentacion === selectedPresentation
      );
      const selectedPrice = priceItem?.precio || 0;

      if (!selectedPrice) {
        toast.error("No se pudo añadir el producto al carrito");
        return;
      }

      const discount = Number(productData.discountPercentage) || 0;
      const discountedPrice =
        discount > 0 ? selectedPrice - (selectedPrice * discount) / 100 : null;

      addItem({
        id: product.id,
        productName: productData.productName,
        slug: productData.slug,
        description: productData.description,
        image: getImageUrl(productData.images),
        quantity: 1,
        prices: [{ precio: selectedPrice, presentacion: selectedPresentation }],
        discountPercentage: discount,
        discountedPrice,
      });

      toast.success(`${productData.productName} añadido al carrito 🛒`);
    } catch (error) {
      console.error("Error inesperado:", error);
      toast.error("Ocurrió un error. Inténtalo nuevamente.");
    }
  };

  const getImageUrl = (images: any) => {
    if (images?.data?.length > 0) {
      const imageObject = images.data[0];
      if (imageObject?.attributes?.url) {
        const imageSrc = imageObject.attributes.url;
        return imageSrc.startsWith("http")
          ? imageSrc
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageSrc}`;
      }
    }
    return "/placeholder.png";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl text-blue-700 font-bold text-center sm:text-left">
          Productos Favoritos
        </h1>

        <div className="grid gap-8">
          {favorites.length === 0 && (
            <p className="text-center text-gray-500">
              No tienes productos favoritos.
            </p>
          )}
          <ul className="space-y-6">
            {favorites.map((product, index) => {
              if (!product || !product.attributes) {
                return (
                  <li key={`undefined-${index}`}>
                    <p>Error: No se recibió información del producto.</p>
                  </li>
                );
              }

              const productData = product.attributes;
              const imageUrl = getImageUrl(productData.images);

              const priceArray = Array.isArray(productData.prices)
                ? productData.prices
                : [];

              const selectedPresentation =
                selectedPresentations[product.id] ||
                (priceArray.length > 0 ? priceArray[0].presentacion : "N/A");

              const selectedPrice =
                priceArray.find((p) => p.presentacion === selectedPresentation)
                  ?.precio || "0";

              const parsedPrice = parseFloat(selectedPrice) || 0;

              const discount = parseFloat(productData.discountPercentage) || 0;
              const discountedPrice =
                discount > 0
                  ? (parsedPrice - (parsedPrice * discount) / 100).toFixed(2)
                  : parsedPrice.toFixed(2);

              return (
                <li
                  key={`${product.id}-${selectedPresentation}`}
                  className="relative flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg shadow-lg bg-white max-w-lg mx-auto"
                >
                  {/* Imagen con enlace al producto */}
                  <Link href={`/product/${productData.slug}`} passHref>
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden cursor-pointer">
                      <Image
                        src={imageUrl}
                        alt={productData.productName || "Producto"}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </Link>

                  <div className="flex-1">
                    <h3 className="text-md font-bold text-gray-800">
                      {productData.productName || "Producto sin nombre"}
                    </h3>

                    {/* Descripción con limitación de líneas */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {productData.description}
                    </p>

                    {discount > 0 && (
                      <p className="text-sm font-semibold text-green-600">
                        {`Descuento: ${discount}%`}
                      </p>
                    )}

                    {/* Controles de presentación */}
                    {priceArray.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-800">
                          Presentaciones:
                        </p>
                        <div className="flex gap-1 mt-1">
                          {priceArray.map((pres, idx) => (
                            <button
                              key={`${product.id}-${idx}`}
                              className={`px-2 py-1 border rounded-md text-xs ${
                                selectedPresentation === pres.presentacion
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              }`}
                              onClick={() =>
                                handlePresentationChange(
                                  product.id,
                                  pres.presentacion
                                )
                              }
                            >
                              {pres.presentacion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Precios con descuento */}
                    <div className="mt-2">
                      {discount > 0 ? (
                        <>
                          <span className="text-xs text-red-600 line-through mr-2">
                            ${parsedPrice.toFixed(2)}
                          </span>
                          <span className="text-lg font-bold text-green-600">
                            ${discountedPrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-gray-800">
                          ${parsedPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Botón para añadir al carrito */}
                    <button
                      className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-500 transition flex items-center gap-2 text-sm"
                      onClick={() =>
                        handleAddToCart(product, selectedPresentation)
                      }
                    >
                      <ShoppingCart size={16} />
                      Añadir
                    </button>
                  </div>

                  {/* Botón para eliminar de favoritos */}
                  <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md cursor-pointer z-10"
                    onClick={() =>
                      handleRemoveFavorite(product.id, productData.productName)
                    }
                  >
                    <HeartCrack className="text-red-500" size={18} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
