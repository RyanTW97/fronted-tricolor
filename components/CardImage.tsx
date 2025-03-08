"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/button"; // Asegúrate de que la ruta sea correcta

const CardImage = ({
  image,
  title,
  subtitle,
  buttonText,
  buttonColor = "#333", // Color para el botón y el título
  buttonLink = "#", // Enlace predeterminado para el botón
  onModalOpen, // Función opcional para abrir el modal
  direction = "ltr",
  backgroundColor = "#fff",
}) => {
  const isLeftToRight = direction === "ltr";

  return (
    <div
      className={`h-[50vh] px-6 md:px-20 rounded-2xl justify-start items-center gap-6
        ${isLeftToRight ? "flex-row" : "flex-row-reverse"} 
        md:flex-row flex-col`} // Cambia a columna en pantallas pequeñas y medianas
      style={{
        display: "flex",
        alignItems: "center",
        background: `radial-gradient(circle, ${backgroundColor}CC 0%, ${backgroundColor} 100%)`, // Gradiente radial
        padding: "20px",
        borderRadius: "10px",
        margin: "20px auto",
      }}
    >
      <div className="flex-shrink-0 ">
        <Image src={image} alt="Card Image" width={150} height={150} />
      </div>
      <div
        className="flex-1 text-center flex flex-col justify-center"
        style={{ flex: 2, padding: "0 20px" }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ margin: "0 0 20px", color: buttonColor }}
        >
          {title}
        </h2>
        <p className="mb-4 text-md text-white">{subtitle}</p>

        <Button
          color={buttonColor}
          texto={buttonText}
          link={buttonLink}
          onModalOpen={onModalOpen} // Pasar la función de apertura del modal si existe
        />
      </div>
    </div>
  );
};

export default CardImage;
