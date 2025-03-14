// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./Carousel.module.css";
import { fetchFromStrapi } from "@/lib/api"; // Importar la función optimizada

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchFromStrapi("carousel-images", "carousel-images");

      if (data) {
        const formattedImages = data.map((item) => ({
          id: item.id,
          name: item.attributes.Nombre,
          url: item.attributes.Imagen.data?.attributes?.url,
          width: item.attributes.Imagen.data?.attributes?.width,
          height: item.attributes.Imagen.data?.attributes?.height,
          link: item.attributes.Link ? item.attributes.Link : "/",
        }));
        setImages(formattedImages);
      }
    };

    getImages();
  }, []);

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
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className={styles.slide}>
              <a href={img.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={img.url}
                  alt={img.name}
                  width={img.width}
                  height={img.height}
                  layout="intrinsic"
                />
              </a>
            </div>
          ))
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
