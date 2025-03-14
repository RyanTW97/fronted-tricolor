// @ts-nocheck
"use client"; // Para Next.js 13+

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./Carousel.module.css"; // Importar estilos

const Carousel = () => {
  const [images, setImages] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/carousel-images?populate=*`);
        const data = await res.json();

        const formattedImages = data.data.map((item) => ({
          id: item.id,
          name: item.attributes.Nombre,
          url: item.attributes.Imagen.data?.attributes?.url,
          width: item.attributes.Imagen.data?.attributes?.width, // Obtener ancho original
          height: item.attributes.Imagen.data?.attributes?.height, // Obtener altura original
          link: item.attributes.Link ? item.attributes.Link : "/", // Si Link es null, redirigir a home
        }));

        setImages(formattedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [API_URL]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id} className={styles.slide}>
            <a
              href={img.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block" }}
            >
              <Image
                src={img.url}
                alt={img.name}
                width={img.width}
                height={img.height}
                layout="intrinsic"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
