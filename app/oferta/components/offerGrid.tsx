// @ts-nocheck
"use client";

import { useState } from "react";
import { useGetOfferProducts } from "@/app/api/useGetOfferProducts";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Linea from "@/components/Linea";
import Link from "next/link";
import { toast } from "react-toastify";

const OffersGrid = () => {
  const { loading, result, error } = useGetOfferProducts();
  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [selectedPresentations, setSelectedPresentations] = useState({});

  const handlePresentationChange = (productId, presentation) => {
    setSelectedPresentations((prev) => ({
      ...prev,
      [productId]: presentation,
    }));
  };

  const handleAddToCart = (product, selectedPresentation) => {
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
      discount > 0 ? selectedPrice - (selectedPrice * discount) / 100 : null;

    addItem({
      id: product.id,
      productName: attributes.productName,
      slug: attributes.slug,
      description: attributes.description,
      image: getImageUrl(attributes.images),
      quantity: 1,
      prices: [{ precio: selectedPrice, presentacion: selectedPresentation }],
      discountPercentage: discount,
      discountedPrice,
    });

    toast.success(`${attributes.productName} añadido al carrito 🛒`);
  };

  const handleFavoriteClick = (product, event) => {
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
  };

  const getImageUrl = (images) => {
    const imageUrl = images?.data?.[0]?.attributes?.url;
    if (!imageUrl) return null;
    return imageUrl.startsWith("http")
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <SkeletonSchema grid={4} />}
        {Array.isArray(result) &&
          result.map((rawProduct: ProductType, index) => {
            if (!rawProduct?.attributes || !rawProduct.attributes.isOffer)
              return null;

            const { id, attributes } = rawProduct;
            const {
              productName,
              description,
              prices = [],
              discountPercentage,
              slug,
              images,
            } = attributes;

            const uniqueKey = id || `product-${index}`;
            const selectedPresentation =
              selectedPresentations[id] ||
              (prices.length > 0 ? prices[0].presentacion : undefined);

            const selectedPrice =
              prices.find((p) => p.presentacion === selectedPresentation)
                ?.precio || "No disponible";

            const priceAfterDiscount =
              discountPercentage && selectedPrice !== "No disponible"
                ? (
                    selectedPrice -
                    (selectedPrice * discountPercentage) / 100
                  ).toFixed(2)
                : selectedPrice;

            const imageUrl = getImageUrl(images);
            const isFavoriteProduct = favorites.some((item) => item.id === id);

            return (
              <motion.div
                key={uniqueKey}
                className="group overflow-visible relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="py-4 border border-gray-200 shadow-lg p-5 min-h-[450px] flex flex-col justify-between">
                  <div className="relative">
                    <div
                      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md cursor-pointer z-10"
                      onClick={(event) =>
                        handleFavoriteClick(rawProduct, event)
                      }
                    >
                      <Heart
                        className={
                          isFavoriteProduct ? "text-red-600" : "text-gray-400"
                        }
                      />
                    </div>
                    <Link href={`/product/${slug}`}>
                      <div className="relative h-[200px] w-full flex justify-center items-center rounded-lg">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={productName || "Imagen destacada"}
                            width={200}
                            height={250}
                            className="object-contain h-full w-full"
                          />
                        ) : (
                          <p className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
                            Sin imagen disponible
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {productName}
                      <Linea />
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span>Presentación: </span>
                      {prices.map((price, idx) => (
                        <button
                          key={`${uniqueKey}-${idx}`}
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
                      {discountPercentage ? (
                        <>
                          <span className="text-lg font-semibold text-green-600">
                            ${priceAfterDiscount}
                          </span>
                          <span className="text-sm text-red-600 line-through">
                            ${selectedPrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-gray-800">
                          ${selectedPrice}
                        </span>
                      )}
                      <button
                        className="flex bg-blue-800 text-white py-1 px-6 rounded-lg hover:bg-blue-600 transition"
                        onClick={() =>
                          handleAddToCart(rawProduct, selectedPresentation)
                        }
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default OffersGrid;
