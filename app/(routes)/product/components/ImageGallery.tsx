import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images:
    | Array<{
        url: string;
        formats?: { thumbnail?: { url: string } };
        alt?: string;
      }>
    | {
        data: Array<{
          url: string;
          formats?: { thumbnail?: { url: string } };
          alt?: string;
        }>;
      };
}

const getImageUrl = (url: string) => {
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Si 'images' es un array, lo usamos directamente; de lo contrario, si es un objeto con la propiedad 'data', usamos esa propiedad.
  const imageArray = Array.isArray(images) ? images : images?.data || [];

  const imageList = imageArray.map((image) => ({
    url: getImageUrl(image.url),
    thumbnailUrl: image.formats?.thumbnail
      ? getImageUrl(image.formats.thumbnail.url)
      : getImageUrl(image.url),
    alt: image.alt || "Product Image",
  }));

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Imagen Principal */}
      <div className="relative w-full h-[400px] sm:h-[500px] shadow-lg rounded-lg overflow-hidden">
        {imageList.length > 0 ? (
          <Image
            src={imageList[selectedImage].url}
            alt={imageList[selectedImage].alt}
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg"
          />
        ) : (
          <p className="text-gray-500">No hay imágenes disponibles</p>
        )}
      </div>

      {/* Miniaturas */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {imageList.map((image, index) => (
          <div
            key={index}
            className={`w-20 h-20 border-2 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 ${
              selectedImage === index
                ? "border-black scale-105"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.thumbnailUrl}
              alt={image.alt}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
              className="rounded-md hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
