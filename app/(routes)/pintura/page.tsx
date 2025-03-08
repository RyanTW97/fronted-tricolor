"use client";
import ProductLineButton from "@/components/ProductLineButton";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="mb-10">
      <motion.h1
        className="text-xl md:text-4xl xl:text-6xl lg:text-5xl font-bold cormorant text-center mt-10 text-blue-700"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Explora todas nuestras líneas de productos
      </motion.h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4 sm:px-[4vw] md:px-[5vw] lg:px-[6vw]">
        <ProductLineButton
          image="/Lineaarquitectonica.jpeg"
          title="Línea Arquitectónica"
          subtitle="Construye espacios únicos con estilo, distinción y calidad que transforman tu entorno en una obra de arte."
          href="/category/linea-arquitectonica"
        />

        <ProductLineButton
          image="/Madera.avif"
          title="Línea Madera"
          subtitle="Descubre la belleza natural de la madera, elevada con detalles que resaltan su calidez y perfección"
          href="/category/linea-madera"
        />
        <ProductLineButton
          image="/Metalica.avif"
          title="Línea Metálica"
          subtitle="Protección y durabilidad para estructuras de excelencia."
          href="/productos/linea-metalica"
        />
        <ProductLineButton
          image="/Automotriz.jpg"
          title="Línea Automotriz"
          subtitle="Protección, brillo y color para cada viaje inolvidable."
          href="/productos/linea-automotriz"
        />
        <ProductLineButton
          image="/demarcacion.jpg"
          title="Demarcación Vial"
          subtitle="Seguridad garantizada, visibilidad mejorada y durabilidad en cada trazo para vías más seguras."
          href="/productos/demarcacion-vial"
        />
        <ProductLineButton
          image="/industrial.jpg"
          title="Pisos Industriales"
          subtitle="Resistencia inigualable y un estilo impecable diseñados para los entornos más exigentes y dinámicos."
          href="/productos/pisos-industriales"
        />
        <ProductLineButton
          image="/petrolero.webp"
          title="Petrolera - Industrial"
          subtitle="Innovación de vanguardia y máxima durabilidad para entornos extremos donde la excelencia es esencial."
          href="/productos/petrolera-industrial"
        />
        <ProductLineButton
          image="/especiales.jpg"
          title="Línea Especial"
          subtitle="Soluciones personalizadas, modernas y funcionales que dan vida a proyectos únicos y extraordinarios"
          href="/productos/linea-especial"
        />
      </div>
    </div>
  );
};

export default Page;
