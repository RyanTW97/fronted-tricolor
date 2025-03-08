"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  product: {
    attributes?: {
      productName?: string;
      slug?: string;
      images?: {
        data: Array<{
          attributes?: {
            url: string;
          };
        }>;
      };
    };
  };
}

const Card: React.FC<CardProps> = ({ product }) => {
  if (!product || !product.attributes) return null;

  const { attributes } = product;

  // Extract title safely
  const title = attributes.productName || "Producto sin nombre";

  // Extract link (assuming category-based navigation)
  const link = `/product/${attributes.slug || "unknown"}`;

  // Extract images correctly
  let image1 = "/placeholder.png";
  let image2 = "/placeholder.png";

  if (attributes.images?.data) {
    const imagesArray = attributes.images.data;

    if (imagesArray.length > 0) {
      const rawUrl1 = imagesArray[0]?.attributes?.url;
      image1 = rawUrl1?.startsWith("http")
        ? rawUrl1
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl1}`;

      if (imagesArray.length > 1) {
        const rawUrl2 = imagesArray[1]?.attributes?.url;
        image2 = rawUrl2?.startsWith("http")
          ? rawUrl2
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl2}`;
      }
    }
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Card Container with Hover Effects */}
      <Link href={link}>
        <motion.div
          className="w-44 h-60 md:w-52 md:h-96 lg:w-64 lg:h-[28rem] relative overflow-hidden rounded-lg shadow-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", scale: 1 }}
          whileHover={{
            scale: 1.2,
            boxShadow: "0px 30px 80px rgba(128, 0, 128, 0.7)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* First Image */}
          <Image
            src={image1}
            alt={title}
            layout="fill"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out ${
              isHovered ? "-translate-y-full" : "translate-y-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Second Image */}
          <Image
            src={image2}
            alt={title}
            layout="fill"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </Link>

      {/* Title */}
      <h2 className="text-2xl text-white font-bold">{title}</h2>
    </div>
  );
};

export default Card;
