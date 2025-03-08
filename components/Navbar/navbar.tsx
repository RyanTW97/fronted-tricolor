"use client"; // Aseguramos que es un componente del cliente

import { useState, useEffect } from "react";
import { AlignJustify, Heart, MapPin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user-context";
import SearchBar from "@/components/Navbar/SearchBar";
import NavbarDown from "./navbarDown";
import Linea from "../Linea";
import NavbarResponsive from "./navbarResponsive";
import CartBadge from "./CartBadge";
import { LoggedInUser } from "@/components/Navbar/LoggedInUser";

const Navbar = () => {
  const router = useRouter();
  const { user, syncUser } = useUser();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Sincronizamos el usuario al montar
    syncUser();

    // Función para escuchar cambios en el localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "authToken") {
        // Cuando cambia el token, volvemos a sincronizar el usuario
        syncUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [syncUser]);

  // Efecto para obtener los productos desde el backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
        );
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Función para redirigir a `/contact` y desplazarse al mapa
  const handleMapClick = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/contact#mapa");
  };

  return (
    <div
      data-theme="light"
      className="navbar fixed bg-stone-200 px-2 sm:px-[3vw] md:px-[5vw] lg:px-[4vw] shadow-md z-50 flex flex-col w-full"
    >
      <div className="w-full flex items-center justify-between">
        {/* Navbar izquierda */}
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <AlignJustify />
            </div>
            <NavbarResponsive />
          </div>
          <Link href="/">
            <Image
              src="/logo_tricolor.webp"
              alt="Logo"
              width={100}
              height={150}
              priority
              className="hover:scale-110 transition-transform duration-300 md:w-[160px] lg:w-[180px] xl:w-[200px]"
            />
          </Link>
        </div>

        {/* Navbar centro */}
        <div className="navbar-center w-full max-w-[250px] md:max-w-[200px] lg:max-w-[450px] xl:max-w-[800px] hidden lg:block">
          {/* Aquí pasamos la lista de productos obtenida */}
          <SearchBar products={products} />
        </div>

        {/* Navbar derecha */}
        <div className="navbar-end flex items-center space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5">
          {/* Carrito */}
          <div className="relative">
            <CartBadge />
          </div>
          {/* Favoritos */}
          <div className="relative">
            <Link href="/favorites">
              <Heart
                strokeWidth="1"
                className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 hover:stroke-[1.5] transition-transform duration-200"
              />
            </Link>
          </div>
          <a href="/contact#mapa" onClick={handleMapClick}>
            <MapPin
              strokeWidth="1"
              className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 hover:stroke-[1.5] transition-transform duration-200"
            />
          </a>
          {user ? (
            <LoggedInUser userData={user} />
          ) : (
            <Link href="/signin">
              <User
                strokeWidth="1"
                className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 hover:stroke-[1.5] transition-transform duration-200"
              />
            </Link>
          )}
        </div>
      </div>
      {/* Navbar parte inferior */}
      <div className="w-full hidden lg:block">
        <Linea />
        <NavbarDown />
      </div>
    </div>
  );
};

export default Navbar;
