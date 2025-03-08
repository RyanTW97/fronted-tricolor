"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  syncUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // Ref para controlar si ya se está realizando la llamada y evitar llamadas repetitivas
  const loadingRef = useRef(false);

  const syncUser = useCallback(async () => {
    if (loadingRef.current) return; // Si ya está cargando, salimos
    loadingRef.current = true; // Marcamos que ya estamos realizando la llamada
    setLoading(true);

    try {
      const res = await fetch("/api/user", { cache: "no-store" });
      if (!res.ok) throw new Error("Error al obtener usuario");

      const userData = await res.json();
      if (userData.ok) {
        setUser(userData.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al sincronizar usuario:", error);
      setUser(null);
    } finally {
      loadingRef.current = false; // Liberamos el ref
      setLoading(false);
    }
  }, []); // No dependemos de loading, ya que lo controlamos con loadingRef

  // Sincronizar usuario una sola vez al montar la aplicación
  useEffect(() => {
    syncUser();
  }, [syncUser]);

  return (
    <UserContext.Provider value={{ user, setUser, syncUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
