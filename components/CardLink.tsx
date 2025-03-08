"use client";
import Image from "next/image";
import Button from "./button";

type CardLinkProps = {
  bgColor: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  buttonColor: string;
  buttonText: string;
  buttonLink: string;
  buttonBackground?: string; // Opcional
  onModalOpen: () => void;
  position?: "left" | "right"; // Opcional con valor por defecto
};

const CardLink: React.FC<CardLinkProps> = ({
  bgColor,
  title,
  subtitle,
  imageSrc,
  buttonColor,
  buttonText,
  buttonLink,
  buttonBackground, // Ahora es opcional
  onModalOpen,
  position = "right", // Valor por defecto
}) => {
  const isLeft = position === "left";

  return (
    <div
      className="flex flex-col lg:flex-row h-[60vh] rounded-2xl overflow-hidden"
      style={{
        background: `radial-gradient(circle, ${bgColor}CC 0%, ${bgColor} 100%)`,
      }}
    >
      {/* Imagen */}
      <div
        className={`relative w-full lg:w-1/2 h-1/2 lg:h-full ${
          isLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Contenido */}
      <div
        className={`w-full lg:w-1/2 flex flex-col justify-center items-center text-center px-8 h-1/2 lg:h-full ${
          isLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <h1
          className="text-4xl lg:text-6xl font-bold mb-4"
          style={{ color: buttonColor }}
        >
          {title}
        </h1>
        <p className="text-lg text-white lg:text-3xl mb-6">{subtitle}</p>
        <Button
          color={buttonColor}
          texto={buttonText}
          link={buttonLink}
          colorBbg={buttonBackground || "#FFFFFF"} // Fallback
          onModalOpen={onModalOpen}
        />
      </div>
    </div>
  );
};

export default CardLink;
