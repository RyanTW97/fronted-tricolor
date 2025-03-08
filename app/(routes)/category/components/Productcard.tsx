"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

type PriceType = {
  precio: number;
  presentacion?: string;
};

type ColorType = {
  titulo: string;
  codigo: string;
};

type ProductCardProps = {
  product: {
    id: number;
    productName?: string;
    slug?: string;
    description?: string;
    image?: string;
    prices?: PriceType[];
    color?: ColorType[];
    discountPercentage?: number;
    // Campos dentro de attributes (cuando vienen de Strapi)
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
};

function ProductCard({ product }: ProductCardProps) {
  // Unificamos el acceso a los datos (si la página ya formateó el producto, se usan los campos a nivel raíz)
  const slug = product.slug ?? product.attributes?.slug ?? "unknown";
  const title =
    product.productName ??
    product.attributes?.productName ??
    "Producto sin nombre";
  const description =
    product.description ?? product.attributes?.description ?? "Sin descripción";

  // Colores: usamos product.color o, si no, attributes.color
  const colors: ColorType[] = product.color ?? product.attributes?.color ?? [];

  // Precios: usamos product.prices o, si no, attributes.prices
  const rawPrices: PriceType[] =
    product.prices ?? product.attributes?.prices ?? [];

  // Imagen: usamos product.image o, de no existir, buscamos en attributes.images.data
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

  // Descuento: buscamos en product o attributes. Si no existe, será 0.
  const discountPercentage =
    product.discountPercentage ?? product.attributes?.discountPercentage ?? 0;
  const discount = Number(discountPercentage) || 0;

  // Estado para presentaciones y precio
  const [selectedPresentation, setSelectedPresentation] = useState<
    string | null
  >(rawPrices[0]?.presentacion ?? null);
  const [currentPrice, setCurrentPrice] = useState<number | string>(
    rawPrices[0]?.precio ?? "No disponible"
  );

  // Calculamos el precio con descuento, si aplica
  let discountedPrice: number | null = null;
  if (typeof currentPrice === "number" && discount > 0) {
    discountedPrice = currentPrice - (currentPrice * discount) / 100;
  }

  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handlePresentationChange = (presentation: string | null) => {
    const selected = rawPrices.find((p) => p.presentacion === presentation);
    if (selected) {
      setSelectedPresentation(presentation);
      setCurrentPrice(selected.precio);
    }
  };

  const handleAddToCart = () => {
    if (currentPrice === "No disponible") {
      toast.error("No se puede añadir al carrito, precio no disponible");
      return;
    }
    addItem({
      id: product.id,
      productName: title,
      image: imageUrl,
      prices: [
        { presentacion: selectedPresentation || "Única", precio: currentPrice },
      ],
      quantity: 1,
    });
    toast.success(`${title} añadido al carrito 🛒`);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isFavorite = favorites.some((item) => item.id === product.id);
    if (isFavorite) {
      removeFavorite(product.id);
      toast.info("Producto removido de favoritos ❤️");
    } else {
      addFavorite({ ...product, productName: title, image: imageUrl });
      toast.success("Producto añadido a favoritos ❤️");
    }
  };

  const isFavoriteProduct = favorites.some((item) => item.id === product.id);

  return (
    <Card className="border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col justify-between min-h-[450px]">
      <div className="relative h-[200px] w-full flex justify-center items-center rounded-lg overflow-hidden mb-4">
        {imageUrl ? (
          <Link href={`/product/${slug}`}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </Link>
        ) : (
          <p className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
            Sin imagen disponible
          </p>
        )}
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
                      handlePresentationChange(price.presentacion || null)
                    }
                  >
                    {price.presentacion || "Única"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {discount > 0 &&
            typeof currentPrice === "number" &&
            discountedPrice !== null ? (
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
                {typeof currentPrice === "number"
                  ? `$${currentPrice}`
                  : currentPrice}
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
}

export default ProductCard;
