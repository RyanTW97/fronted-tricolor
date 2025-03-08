import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteItem {
  id: number;
  productName: string;
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  addFavorite: (product: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
}

export const useFavorites = create<FavoritesStore>(
  persist(
    (set) => ({
      favorites: [], // Inicializamos con un array vacío
      addFavorite: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "favorites-storage", // El nombre para la persistencia en localStorage
    }
  )
);
