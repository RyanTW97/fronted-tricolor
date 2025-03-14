"use client";

import React from "react";
import { FaFacebookF } from "react-icons/fa";

interface FacebookAuthButtonProps {
  text?: string;
  className?: string;
}

export default function FacebookAuthButton({
  text = "Continuar con Facebook",
  className = "",
}: FacebookAuthButtonProps) {
  const handleClick = () => {
    // Placeholder para la integración futura con OAuth de Facebook
    console.log("Botón de Facebook clickeado");
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:scale-105 transition-transform duration  ${className}`}
    >
      <FaFacebookF size={20} className="text-blue-600" />
      <span className="font-medium">{text}</span>
    </button>
  );
}
