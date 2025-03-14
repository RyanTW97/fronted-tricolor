// @ts-nocheck

"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import React from "react";

type PriceType = {
  precio: number;
  presentacion?: string;
};

type ColorType = {
  titulo: string;
  codigo: string;
};

type ProductType = {
  id: number;
  productName?: string;
  slug?: string;
  description?: string;
  image?: string;
  prices?: PriceType[];
  color?: ColorType[];
  discountPercentage?: number;
  attributes?: {
    productName?: string;
    slug?: string;
    description?: string;
    images?: { data: { attributes?: { url: string } }[] };
    prices?: PriceType[];
    color?: ColorType[];
    discountPercentage?: number;
  };
};

type CartItemType = {
  id: number;
  productName: string;
  image: string;
  prices: PriceType[];
  quantity: number;
};

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const slug = product.slug ?? product.attributes?.slug ?? "unknown";
  const title =
    product.productName ??
    product.attributes?.productName ??
    "Producto sin nombre";
  const description =
    product.description ?? product.attributes?.description ?? "Sin descripción";

  const colors: ColorType[] = product.color ?? product.attributes?.color ?? [];
  const rawPrices: PriceType[] =
    product.prices ?? product.attributes?.prices ?? [];

  let imageUrl = product.image ?? "/placeholder.png";
  if (
    !product.image &&
    product.attributes?.images?.data?.[0]?.attributes?.url
  ) {
    const rawUrl = product.attributes.images.data[0].attributes.url;
    imageUrl = rawUrl.startsWith("http")
      ? rawUrl
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl}`;
  }

  const discountPercentage =
    product.discountPercentage ?? product.attributes?.discountPercentage ?? 0;
  const discount = Number(discountPercentage) || 0;

  const [selectedPresentation, setSelectedPresentation] = useState<string>(
    rawPrices[0]?.presentacion ?? "Única"
  );
  const [currentPrice, setCurrentPrice] = useState<number>(
    rawPrices[0]?.precio ?? 0
  );

  let discountedPrice: number | null = null;
  if (typeof currentPrice === "number" && discount > 0) {
    discountedPrice = currentPrice - (currentPrice * discount) / 100;
  }

  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handlePresentationChange = (presentation: string) => {
    const selected = rawPrices.find((p) => p.presentacion === presentation);
    if (selected) {
      setSelectedPresentation(presentation);
      setCurrentPrice(selected.precio);
    }
  };

  const handleAddToCart = () => {
    if (!currentPrice) {
      toast.error("No se puede añadir al carrito, precio no disponible");
      return;
    }

    const newItem: CartItemType = {
      id: product.id,
      productName: title,
      slug: slug, // Asegurar que slug esté presente
      description: description, // Asegurar que description esté presente
      image: imageUrl,
      prices: [
        { presentacion: selectedPresentation || "Única", precio: currentPrice },
      ],
      quantity: 1,
      active: true, // Si el tipo lo requiere
      discountPercentage: discountPercentage, // Si el tipo lo requiere
    };

    addItem(newItem); // ✅ Ahora `newItem` coincide con `CartItemType`
    toast.success(`${title} añadido al carrito 🛒`);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isFavorite = favorites.some((item) => item.id === product.id);
    if (isFavorite) {
      removeFavorite(product.id);
      toast.info("Producto removido de favoritos ❤️");
    } else {
      addFavorite({
        ...product,
        productName: title,
        image: imageUrl, // ✅ Se asegura de que `image` esté en FavoriteItem
      });
      toast.success("Producto añadido a favoritos ❤️");
    }
  };

  const isFavoriteProduct = favorites.some((item) => item.id === product.id);

  return (
    <Card className="border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col justify-between min-h-[450px]">
      <div className="relative h-[200px] w-full flex justify-center items-center rounded-lg overflow-hidden mb-4">
        <Link href={`/product/${slug}`} passHref>
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
            className="rounded-lg"
          />
        </Link>
        <Heart
          className={`absolute top-2 right-2 p-1 rounded-full cursor-pointer shadow-md border-2 ${
            isFavoriteProduct
              ? "border-red-600 text-red-600"
              : "border-gray-400 text-gray-400"
          }`}
          onClick={handleFavoriteClick}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>

      {colors.length > 0 && (
        <div className="mt-4">
          <span className="text-sm font-semibold text-gray-600">Colores:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((colorItem, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: colorItem.codigo }}
                title={colorItem.titulo}
              />
            ))}
          </div>
        </div>
      )}

      {rawPrices.length > 0 ? (
        <div className="mt-4">
          {rawPrices.length > 1 && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Presentación:
              </span>
              <div className="flex flex-wrap gap-2">
                {rawPrices.map((price) => (
                  <button
                    key={price.presentacion}
                    className={`py-1 px-3 rounded-lg text-sm ${
                      selectedPresentation === price.presentacion
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() =>
                      handlePresentationChange(price.presentacion || "Única")
                    }
                  >
                    {price.presentacion || "Única"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {discount > 0 && discountedPrice !== null ? (
              <div>
                <span className="text-sm text-gray-500 line-through mr-2">
                  ${currentPrice}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="text-lg font-semibold text-gray-800">
                ${currentPrice}
              </p>
            )}
            <button
              className="bg-blue-700 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm font-semibold text-red-600">
          Precio no disponible
        </p>
      )}
    </Card>
  );
};

export default ProductCard;
