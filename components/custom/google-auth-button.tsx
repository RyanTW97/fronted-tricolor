"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";

interface GoogleAuthButtonProps {
  text?: string;
  className?: string;
}

export default function GoogleAuthButton({
  text = "Continuar con Google",
  className = "",
}: GoogleAuthButtonProps) {
  const handleClick = () => {
    console.log("Botón de Google clickeado"); // Placeholder para futura integración con NextAuth
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:scale-105 transition-transform duration-150 ${className}`}
    >
      <FcGoogle size={20} />
      <span className="font-medium">{text}</span>
    </button>
  );
}
