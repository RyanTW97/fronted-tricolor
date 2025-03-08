"use client";
import CardLink from "@/components/CardLink";
import Carousel from "@/components/Carousel";
import Linea from "@/components/Linea";
import LogoCarousel from "@/components/LogoCarousel";
import ProductLineButton from "@/components/ProductLineButton";
import ImageSection from "@/components/ImageSection";
import ProductFeature from "@/components/ProductFeature";
import { motion } from "framer-motion";
import FeaturedProducts from "@/components/FeaturedProducts";
import Offers from "@/components/Offers";
import ProductsByCategory from "@/components/ProductsByCategory";
import PublicidadVideo from "@/components/PublicidadVideo";

export default function Home() {
  return (
    <main>
      <PublicidadVideo src="/FIBRASEAL.mp4" />
      <FeaturedProducts />
      <Linea />
      <Offers />
      <ProductFeature />
      <div className="py-10">
        <ProductsByCategory
          categorySlug="pisos-industriales"
          title="Pisos industriales"
        />
      </div>

      <ImageSection />
      <div className="py-10">
        <ProductsByCategory
          categorySlug="linea-arquitectonica"
          title="Linea Arquitectonica"
        />
      </div>

      <Linea />
      <section className="px-4 sm:px-[4vw] md:px-[5vw] lg:px-[6vw]">
        <CardLink
          bgColor="#6b21a8" // Color de fondo
          title="¡Capacítate Maestro!" // Título
          subtitle="Descubre nuestros cursos diseñados para maestros y expertos en construcción. Mejora tus habilidades y lleva tu oficio al siguiente nivel." // Subtítulo
          imageSrc="/worker.webp" // Ruta de la imagen
          buttonColor="#84cc16" // Color del botón
          buttonText="Conoce más" // Texto del botón
          buttonLink="/maestro"
          buttonBackground="#FFFFFF16"
        />
      </section>
      <Linea />
      <section>
        <LogoCarousel />
      </section>
    </main>
  );
}
