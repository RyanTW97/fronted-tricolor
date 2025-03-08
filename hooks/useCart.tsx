// useCart.tsx
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItemType } from "@/types/cart";

interface CartStore {
  items: CartItemType[];
  addItem: (data: CartItemType) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: CartItemType) => {
        console.log("Intentando añadir producto al carrito:", data);

        // Validar datos básicos
        if (
          !data ||
          !data.id ||
          !data.productName ||
          !data.prices?.[0]?.precio // Ahora se espera que prices sea un arreglo directo
        ) {
          console.error("Datos incompletos del producto:", data);
          return;
        }

        // Si no existe data.image, se asume que ya viene formateada;
        // en caso contrario, podrías agregar lógica para construirla.
        const imageUrl = data.image || null;

        const sanitizedData = {
          ...data,
          image: imageUrl,
        };

        const currentItems = get().items;
        console.log("Estado actual del carrito antes de añadir:", currentItems);

        // Verificar si el producto con la misma presentación ya existe en el carrito
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id &&
            item.prices?.[0]?.presentacion === data.prices?.[0]?.presentacion
        );

        if (existingItem) {
          console.log(
            "El producto ya existe en el carrito con la misma presentación, actualizando cantidad..."
          );
          set({
            items: currentItems.map((item) =>
              item.id === data.id &&
              item.prices?.[0]?.presentacion === data.prices?.[0]?.presentacion
                ? { ...item, quantity: (item.quantity || 1) + 1 } // Incrementar cantidad
                : item
            ),
          });
          console.log(
            "Estado del carrito después de actualizar cantidad:",
            get().items
          );
          return;
        }

        console.log(
          "El producto no existe en el carrito con esta presentación, añadiéndolo..."
        );
        set({
          items: [
            ...currentItems,
            {
              ...sanitizedData,
              quantity: 1,
            },
          ],
        });

        console.log(
          "Estado del carrito después de añadir el producto:",
          get().items
        );
      },

      removeItem: (id: number) => {
        console.log("Eliminando producto con ID:", id);
        const filteredItems = get().items.filter((item) => item.id !== id);

        set({
          items: filteredItems,
        });
        console.log("Estado del carrito después de eliminar:", filteredItems);
      },

      updateQuantity: (id: number, quantity: number) => {
        console.log(
          "Actualizando cantidad del producto con ID:",
          id,
          "a:",
          quantity
        );
        if (quantity <= 0) {
          console.log("Cantidad <= 0, eliminando el producto...");
          set({
            items: get().items.filter((item) => item.id !== id),
          });
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
        console.log(
          "Estado del carrito después de actualizar cantidad:",
          get().items
        );
      },

      removeAll: () => {
        console.log("Eliminando todos los productos del carrito...");
        set({ items: [] });
        console.log("Estado del carrito después de limpiar:", get().items);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
