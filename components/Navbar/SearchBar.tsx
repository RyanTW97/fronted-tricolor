// @ts-nocheck

"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react"; // Ícono de búsqueda
import { GetServerSideProps } from "next";

export default function SearchBar({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);

  // Filtrar productos usando la propiedad 'productName' dentro de attributes
  const filteredProducts = products.filter((product) =>
    product.attributes?.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
      <div className="flex items-center border-2 border-blue-500 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="¿Qué estás buscando hoy?"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearchVisible(true);
          }}
          className="w-full px-5 py-3 text-lg rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400"
        />

        <div
          className="cursor-pointer text-blue-600 p-2"
          onClick={() => console.log("Buscar")}
        >
          <Search size={22} />
        </div>
      </div>

      {isSearchVisible && searchTerm && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto w-full z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const attributes = product.attributes;
              if (!attributes) return null;

              const imageUrl = attributes.images?.data?.[0]?.attributes?.url
                ? attributes.images.data[0].attributes.url.startsWith("http")
                  ? attributes.images.data[0].attributes.url
                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}${attributes.images.data[0].attributes.url}`
                : "https://via.placeholder.com/150";

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/product/${attributes.slug}`)
                  }
                >
                  <div className="flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={attributes.productName || "Producto"}
                      className="w-12 h-12 rounded-md object-contain"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {attributes.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {attributes.description || "Sin descripción"}
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
      )}
    </div>
  );
}

// Obtiene los productos desde el servidor
export const getServerSideProps: GetServerSideProps = async () => {
  let products = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
    );
    const data = await response.json();
    products = data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return {
    props: {
      products,
    },
  };
};
