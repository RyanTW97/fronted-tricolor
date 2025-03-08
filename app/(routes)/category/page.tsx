"use client";
import Card from "./components/Card";
import { motion } from "framer-motion";

const Category = () => {
  return (
    <div className="bg-gradient-radial from-blue-300  to-indigo-800">
      <motion.h1
        className="text-xl md:text-4xl xl:text-7xl lg:text-5xl font-bold cormorant text-center py-24 text-white"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Descubre el producto perfecto para ti
      </motion.h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        <Card
          title="Pinturas y Recubrimientos"
          link="/pintura"
          image1="/pintura1.webp"
          image2="/pintura2.png"
        />
        <Card
          title="Resinas Epóxicas "
          link="/herramientas"
          image1="/resina1.webp"
          image2="/resina2.jpg"
        />
        <Card
          title="Herramientas Manuales "
          link="/herramientas"
          image1="/herramientas1.jpg"
          image2="/herramientas2.jpg"
        />
        <Card
          title="⁠Lijas y Abrasivos"
          link="/herramientas"
          image1="/lija1.jpg"
          image2="/lija2.jpg"
        />
        <Card
          title="⁠Iluminación y Electricidad "
          link="/herramientas"
          image1="/iluminacion2.webp"
          image2="/iluminacion1.webp"
        />
        <Card
          title="⁠Selladores y Adhesivos"
          link="/herramientas"
          image1="/sellador1.jpg"
          image2="/sellador2.jpg"
        />
        <Card
          title="Equipos  para Aplicación"
          link="/herramientas"
          image1="/equiipo1.png"
          image2="/sellador2.jpg"
        />
        <Card
          title="Cosmética Capilar"
          link="/herramientas"
          image1="/cabello2.jpg"
          image2="/cabello1.avif"
        />
      </div>
    </div>
  );
};

export default Category;
