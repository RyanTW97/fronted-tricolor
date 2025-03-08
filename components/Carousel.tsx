"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importar componentes de Swiper
import "swiper/css"; // Importar estilos de Swiper
import "swiper/css/navigation"; // Importar estilos de navegación
import { Navigation, Autoplay } from "swiper/modules"; // Importar módulos de navegación y autoplay
import { fetchCarouselImages } from "@/app/api/fetchCarouselImages"; // Asegúrate de que la ruta sea correcta
import { CarouselImage } from "@/types/carouselImage"; // Importa el tipo definido
import Image from "next/image"; // Importar el componente de Next.js
import Link from "next/link"; // Importar el componente de enlaces de Next.js

export default function Carousel() {
  // Estado tipado con el tipo `CarouselImage`
  const [photos, setPhotos] = useState<CarouselImage[]>([]);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const fetchedPhotos = await fetchCarouselImages();
        setPhotos(fetchedPhotos); // Guarda las fotos en el estado
      } catch (error) {
        console.error("Error al cargar imágenes del carrusel:", error);
      }
    }
    loadPhotos();
  }, []);

  // URL base para las imágenes desde una variable de entorno
  const BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <Swiper
      modules={[Navigation, Autoplay]} // Añadir navegación y autoplay
      navigation // Habilitar las flechas de navegación
      loop
      autoplay={{
        delay: 3000, // 3 segundos entre cada cambio de slide
        disableOnInteraction: false, // El autoplay no se detendrá al interactuar con el carrusel
      }}
      spaceBetween={0} // Sin espacio entre diapositivas
      slidesPerView={1} // Mostrar una diapositiva a la vez
      style={{
        width: "100vw", // Ancho total de la pantalla
        height: "66vh", // 2/3 de la altura de la pantalla
      }}
    >
      {photos.map((photo) => {
        // Validaciones antes de extraer datos
        const imageUrl = photo.Imagen?.formats?.small?.url ?? photo.Imagen?.url;

        if (!imageUrl) return null; // Si no hay URL de imagen, no renderiza

        return (
          <SwiperSlide key={photo.id}>
            <Link href="" passHref>
              <Image
                src={`${BASE_URL}${imageUrl}`} // Concatenar con URL base
                alt=""
                fill // Ocupa todo el espacio disponible
                style={{
                  objectFit: "cover", // Escalar la imagen para que ocupe todo el espacio
                }}
              />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
