"use client";

import Linea from "@/components/Linea";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

export default function Page() {
  const { items, removeAll, removeItem, updateQuantity } = useCart();

  // Calcular el precio total (aplicando descuento si existe)
  const totalPrice = items.reduce((total, product) => {
    const priceArray = Array.isArray(product.prices) ? product.prices : [];

    if (priceArray.length > 0) {
      const basePrice = parseFloat(priceArray[0]?.precio || "0");
      const discountPercentage = product.discountPercentage || 0;
      const finalPrice =
        discountPercentage > 0
          ? basePrice - basePrice * (discountPercentage / 100)
          : basePrice;
      const quantity = product.quantity || 1;
      return total + finalPrice * quantity;
    }
    return total;
  }, 0);

  console.log("Productos en el carrito:", items);

  return (
    <div className="min-h-screen max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl text-blue-700 font-bold text-center sm:text-left">
        Carrito de compras
      </h1>
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Lista de productos en el carrito */}
        <div className="space-y-6">
          {items.length === 0 && (
            <p className="text-center text-gray-500">
              No hay productos en el carrito.
            </p>
          )}
          <ul className="space-y-6">
            {items.map((product, index) => {
              if (!product) {
                return (
                  <li key={`undefined-${index}`}>
                    <p>Error: No se recibió información del producto.</p>
                  </li>
                );
              }

              // Asegurar que prices sea un array antes de acceder a sus elementos
              const priceArray = Array.isArray(product.prices)
                ? product.prices
                : [];

              const basePrice =
                priceArray.length > 0
                  ? parseFloat(priceArray[0]?.precio || "0")
                  : 0;

              const discountPercentage = product.discountPercentage || 0;
              const quantity = product.quantity || 1;

              // Precio unitario, aplicando descuento si existe
              const unitPrice =
                discountPercentage > 0
                  ? (
                      basePrice -
                      basePrice * (discountPercentage / 100)
                    ).toFixed(2)
                  : basePrice.toFixed(2);

              const imageUrl = (product as any).image
                ? (product as any).image
                : product.images?.[0]?.url
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                : "https://via.placeholder.com/150";

              // Presentación elegida
              const presentation =
                priceArray.length > 0 ? priceArray[0]?.presentacion : "default";

              // Key única combinando id y presentación
              const uniqueKey = `${product.id}-${presentation}`;

              return (
                <li
                  key={uniqueKey}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg shadow-lg bg-white"
                >
                  <img
                    src={imageUrl}
                    alt={product.productName || "Producto"}
                    className="h-24 w-24 rounded-md object-contain cursor-pointer sm:h-32 sm:w-32"
                    onClick={() => {
                      window.location.href = `/product/${product.slug}`;
                    }}
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.productName}
                    </h3>

                    {/* Controles de cantidad */}
                    <div className="flex items-center mt-2">
                      <p className="text-sm font-semibold text-blue-500">
                        Cantidad:
                      </p>
                      <button
                        className="ml-2 text-sm px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(product.id, Math.max(quantity - 1, 1))
                        }
                      >
                        <ArrowDown size={16} />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold border">
                        {quantity}
                      </span>
                      <button
                        className="text-sm px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <ArrowUp size={16} />
                      </button>
                    </div>

                    {/* Mostrar presentación debajo de la cantidad */}
                    <p className="mt-1 text-sm font-semibold text-gray-500">
                      Presentación: {presentation}
                    </p>

                    {/* Mostrar precio */}
                    {discountPercentage > 0 ? (
                      <>
                        <p className="mt-2 text-sm text-gray-500">
                          Precio Regular:{" "}
                          <s className="text-red-500">
                            ${basePrice.toFixed(2)}
                          </s>
                        </p>
                        <p className="text-sm text-emerald-600 font-bold">
                          Precio con Descuento: ${unitPrice}
                        </p>
                      </>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500 font-bold">
                        Precio: ${basePrice.toFixed(2)}
                      </p>
                    )}

                    <p className="text-sm text-gray-500">
                      Total: ${(parseFloat(unitPrice) * quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="rounded-full p-2 bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => {
                      console.log(`Eliminar producto con ID: ${product.id}`);
                      removeItem(product.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Resumen del pedido */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <p className="mb-4 text-lg font-semibold text-gray-800">
            Resumen de pedido
          </p>
          <Linea />
          <div className="flex items-center justify-between py-4">
            <p className="text-gray-600">Orden total:</p>
            <p className="text-lg font-bold text-gray-800">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <Button
            className="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 transition"
            onClick={() => console.log("buy")}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
