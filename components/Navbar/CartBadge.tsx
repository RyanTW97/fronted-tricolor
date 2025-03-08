"use client";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartBadge = () => {
  const cart = useCart();
  const cartItemCount = cart.items.length;

  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingCart
          strokeWidth="1"
          className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 cursor-pointer text-blue-800 hover:scale-125 hover:text-red-500 hover:stroke-[1.5] transition-transform duration-200"
        />
      </Link>
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </div>
  );
};

export default CartBadge;
