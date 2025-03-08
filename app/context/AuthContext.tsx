"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken } from "@/utils/get-token";

// Definir el tipo de usuario
interface AuthUser {
  username: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Cargar el usuario desde el token cuando se monta la app
  useEffect(() => {
    const fetchUser = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const res = await fetch("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const userData = await res.json();
        setUser({ username: userData.username, email: userData.email });
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };

    fetchUser();
  }, []);

  // Función para iniciar sesión
  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
