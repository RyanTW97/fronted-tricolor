"use client";

import { useState, useEffect } from "react";
import { AlignJustify, Heart, MapPin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/Navbar/SearchBar";
import NavbarDown from "./navbarDown";
import Linea from "../Linea";
import NavbarResponsive from "./navbarResponsive";
import CartBadge from "./CartBadge";

const Navbar = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

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

  const handleMapClick = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/contact#mapa");
  };

  return (
    <div
      data-theme="light"
      className="navbar fixed bg-stone-200 shadow-md z-50 flex flex-col w-full px-2 md:px-3 lg:px-4 xl:px-5"
    >
      <div className="w-full flex items-center justify-between">
        {/* Navbar izquierda */}
        <div className="flex items-center gap-2 md:gap-3">
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
              width={80} // Reducido en móviles
              height={100}
              priority
              className="hover:scale-110 transition-transform duration-300 md:w-[140px] lg:w-[160px] xl:w-[200px]"
            />
          </Link>
        </div>

        {/* Navbar centro */}
        <div className="hidden lg:flex justify-center w-full max-w-[250px] md:max-w-[300px] lg:max-w-[450px] xl:max-w-[800px]">
          <SearchBar products={products} />
        </div>

        {/* Navbar derecha */}
        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5">
          {/* Carrito */}
          <div className="relative">
            <CartBadge />
          </div>
          {/* Favoritos */}
          <Link href="/favorites">
            <Heart
              strokeWidth="1"
              className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 transition-transform duration-200"
            />
          </Link>
          <a href="/contact#mapa" onClick={handleMapClick}>
            <MapPin
              strokeWidth="1"
              className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 transition-transform duration-200"
            />
          </a>
          {/* Ícono de usuario */}
          <Link href="/signin">
            <User
              strokeWidth="1"
              className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 transition-transform duration-200"
            />
          </Link>
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
