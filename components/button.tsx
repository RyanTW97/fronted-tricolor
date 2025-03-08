// @ts-nocheck
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Button = ({ color, texto, link, colorBbg, onModalOpen }) => {
  // Estilos base para el botón
  const baseStyle = {
    backgroundColor: colorBbg || "rgba(255, 255, 255, 0.7)", // Fallback si no se proporciona colorBbg
    color: color, // Color del texto
    border: `2px solid ${color}`, // Borde con el color principal
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: 800, // Equivalente a font-semibold
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    outline: "none",
  };

  // Estilos para hover
  const hoverStyle = {
    backgroundColor: color, // El fondo cambia al color principal en hover
    color: "white", // Texto blanco en hover
  };

  const handleClick = (e) => {
    if (onModalOpen) {
      e.preventDefault(); // Evitar comportamiento predeterminado
      onModalOpen(); // Llamar la función para abrir el modal
    }
  };

  // Elemento del botón con animaciones
  const buttonElement = (
    <motion.button
      whileHover={{
        scale: 1.2,
        rotate: 2,
        boxShadow: `0 9px 14px rgba(0, 0, 0, 0.3)`,
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={baseStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseStyle)}
      onClick={handleClick}
    >
      {texto} ➞
    </motion.button>
  );

  // Condicional: Link interno o externo
  return link && link.startsWith("/") ? (
    <Link href={link} passHref>
      <div style={{ textDecoration: "none" }}>{buttonElement}</div>
    </Link>
  ) : (
    <a href={link} style={{ textDecoration: "none" }} onClick={handleClick}>
      {buttonElement}
    </a>
  );
};

export default Button;
