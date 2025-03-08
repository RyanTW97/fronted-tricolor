// @ts-nocheck

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Importamos Dialog de ShadCN
import { Search } from "lucide-react"; // Ícono de búsqueda

export default function SearchModal({ products }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      {/* Trigger del diálogo, aparece al hacer click en el icono de búsqueda */}
      <DialogTrigger className="flex items-center">
        <Search strokeWidth="1" className="text-blue-800" />
      </DialogTrigger>

      {/* Contenido del diálogo */}
      <DialogContent className="w-full max-w-lg p-4">
        <DialogHeader>
          <DialogTitle>¿Qué producto estás buscando?</DialogTitle>
          <DialogDescription>
            Aquí puedes buscar productos por nombre.
          </DialogDescription>
        </DialogHeader>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Escribe el nombre del producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Resultados de búsqueda */}
        <div className="mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const imageUrl = product.images?.[0]?.url
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                : "https://via.placeholder.com/150"; // URL de imagen por defecto

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/product/${product.slug}`)
                  }
                >
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={product.productName || "Producto"}
                      className="w-12 h-12 rounded-md object-contain"
                    />
                  </div>

                  {/* Información del producto */}
                  <div>
                    <p className="font-medium text-gray-800">
                      {product.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.description || "Sin descripción"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="px-4 py-2 text-gray-500">
              No se encontraron productos
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
