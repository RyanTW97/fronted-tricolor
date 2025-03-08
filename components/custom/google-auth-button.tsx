import { FcGoogle } from "react-icons/fc"; // Icono de Google
import React from "react";

interface GoogleAuthButtonProps {
  text: string; // Texto del botón
  className?: string; // Clases opcionales para personalizar el estilo
}

export default function GoogleAuthButton({
  text,
  className,
}: GoogleAuthButtonProps) {
  return (
    <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/google`}>
      <button
        className={`flex items-center justify-center gap-2 w-full px-4 py-2 border rounded hover:bg-gray-100 ${className}`}
      >
        <FcGoogle className="w-5 h-5" /> {/* Icono de Google */}
        <span>{text}</span>
      </button>
    </a>
  );
}
