"use client"; // Habilita el modo cliente

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Importamos Link para la navegación interna

interface ProductLineButtonProps {
  image: string;
  title: string;
  subtitle: string;
  href: string; // Ruta a donde navegará el botón
}

const ProductLineButton: React.FC<ProductLineButtonProps> = ({
  image,
  title,
  subtitle,
  href,
}) => {
  return (
    <Link href={href}>
      <motion.div
        className="relative w-full h-64 overflow-hidden cursor-pointer rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.07 }} // Efecto de zoom al hacer hover
        whileTap={{ scale: 1.1 }} // Efecto de zoom al hacer click
        transition={{ type: "spring", stiffness: 160, damping: 8 }}
      >
        {/* Imagen de fondo */}
        <Image
          src={image}
          alt={title}
          fill // Ocupa todo el contenedor
          className="absolute top-0 left-0 object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Título y subtítulo */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-30 p-4 transition-opacity duration-500 ease-in-out group hover:bg-opacity-50">
          <h2 className="text-4xl font-bold text-white text-center">{title}</h2>
          <p className="text-lg font-bold text-white mt-2 opacity-100 md:opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 leading-relaxed flex items-center justify-center text-center">
            {subtitle}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductLineButton;
