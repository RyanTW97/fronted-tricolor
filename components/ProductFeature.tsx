"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useGetProductBySlug } from "@/app/api/getProductBySlug";

// Variantes para animación escalonada
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const ProductFeature = () => {
  const imageControls = useAnimation();
  const { result, isLoading, error } = useGetProductBySlug("creton-hard");
  const { addItem } = useCart();

  // Estados para presentaciones, precio y color
  const [selectedPresentation, setSelectedPresentation] = useState<
    number | null
  >(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [presentations, setPresentations] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (result && Array.isArray(result) && result.length > 0) {
      const product = result[0];
      const { attributes } = product;
      // Si attributes.prices es un array directo, úsalo; de lo contrario, busca en attributes.prices.prices
      const pres = Array.isArray(attributes.prices)
        ? attributes.prices
        : attributes.prices?.prices || [];
      setPresentations(pres);
      if (pres.length > 0) {
        setSelectedPresentation(0);
        setSelectedPrice(pres[0].precio);
      }
      // Si el producto tiene opciones de color, se podría almacenar (aunque en este ejemplo no se muestran)
      if (attributes.color?.color && attributes.color.color.length > 0) {
        setSelectedColor(attributes.color.color[0].titulo);
      }
    }
  }, [result]);

  const handleSelectPresentation = (index: number) => {
    setSelectedPresentation(index);
    const pres = presentations[index];
    if (pres) {
      setSelectedPrice(pres.precio);
    }
  };

  // Definimos discount y discountedPrice en el scope del componente
  const discount =
    result && Array.isArray(result) && result.length > 0
      ? Number(result[0].attributes.discountPercentage) || 0
      : 0;
  let discountedPrice: number | null = null;
  if (typeof selectedPrice === "number" && discount > 0) {
    discountedPrice = selectedPrice - (selectedPrice * discount) / 100;
  }

  const handleAddToCart = () => {
    if (selectedPresentation === null) {
      toast.error("Por favor selecciona una presentación");
      return;
    }
    const pres = presentations[selectedPresentation];
    if (!pres || pres.precio === 0) {
      toast.error("No se pudo añadir el producto al carrito");
      return;
    }
    const product = result[0];
    const { attributes } = product;
    // Imagen fija desde public para el carrito
    const imageUrlCart = "/cretonhard.png";

    const productToAdd = {
      id: product.id,
      productName: attributes.productName,
      slug: attributes.slug,
      description: attributes.description,
      image: imageUrlCart,
      quantity: 1,
      prices: [
        {
          presentacion: pres.presentacion,
          precio: selectedPrice,
        },
      ],
      discountPercentage: discount,
      discountedPrice,
      // Puedes incluir también el color seleccionado si es necesario:
      color: selectedColor ? { titulo: selectedColor } : undefined,
    };

    addItem(productToAdd);
    toast.success(
      `Producto añadido al carrito: ${attributes.productName} - ${pres.presentacion}`
    );
  };

  if (isLoading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto.</p>;
  if (!result || !Array.isArray(result) || result.length === 0)
    return <p>No se encontró el producto.</p>;

  const product = result[0];
  const { attributes } = product;
  // Para la visualización, se usa una imagen fija desde public
  const imageUrlDisplay = "/cretonhard.png";

  return (
    <section className="mt-10">
      <div
        className="w-full h-auto py-10"
        style={{
          background: "linear-gradient(to bottom right, #A070E0, #F498D1)",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Video integrado a la izquierda */}
          <div className="flex-1 lg:pl-8">
            <video
              className="w-full h-[60vh] max-h-[500px] object-cover rounded-2xl"
              src="/Resina.mp4"
              autoPlay
              loop
              muted
              playsInline
            >
              Tu navegador no soporta el video.
            </video>
          </div>
          {/* Detalles del producto a la derecha con animación escalonada */}
          <motion.div
            className="flex-1 flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Imagen con efecto de pulso */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={imageControls}
              viewport={{ once: true }}
              onViewportEnter={() => {
                imageControls
                  .start({
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1, ease: "easeOut" },
                  })
                  .then(() => {
                    imageControls.start({
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    });
                  });
              }}
              className="relative w-1/3 h-auto mb-0"
            >
              <Image
                src={imageUrlDisplay}
                alt={attributes.productName || "Producto"}
                width={300}
                height={300}
                className="drop-shadow-lg rounded-lg"
              />
            </motion.div>

            {/* Título */}
            <motion.div
              variants={itemVariants}
              className="bg-white bg-opacity-40 px-10 py-2 rounded-lg shadow-2xl mt-[-20px] mb-2 border-2 border-violet-800"
            >
              <h2 className="text-4xl font-bold text-violet-800">
                {attributes.productName}
              </h2>
            </motion.div>

            {/* Descripción */}
            <motion.div variants={itemVariants}>
              <p className="text-2xl text-gray-100 mb-4">
                {attributes.description}
              </p>
            </motion.div>

            {/* Presentaciones, precio (con descuento) y botón */}
            <motion.div variants={itemVariants} className="w-full">
              {presentations.length > 0 && (
                <div className="flex gap-4 mb-4 justify-center">
                  {presentations.map((pres, index) => (
                    <button
                      key={pres.presentacion}
                      onClick={() => handleSelectPresentation(index)}
                      className={`px-4 py-2 rounded-lg text-lg font-bold border-2 ${
                        selectedPresentation === index
                          ? "bg-violet-700 text-white border-violet-800"
                          : "bg-white text-violet-800 border-violet-800"
                      }`}
                    >
                      {pres.presentacion}
                    </button>
                  ))}
                </div>
              )}
              <div className="mb-4">
                {discount > 0 &&
                typeof selectedPrice === "number" &&
                discountedPrice !== null ? (
                  <div>
                    <div>
                      <span className="text-lg font-semibold text-black">
                        Precio normal:{" "}
                      </span>
                      <span className="text-xl text-red-600 line-through mr-2">
                        ${selectedPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-black">
                        Precio con descuento:{" "}
                      </span>
                      <span className="text-2xl font-bold text-violet-800">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-lg font-semibold text-gray-100">
                      Precio:{" "}
                    </span>
                    <span className="text-2xl font-bold text-violet-800">
                      ${selectedPrice ? selectedPrice.toFixed(2) : "0.00"}
                    </span>
                  </div>
                )}
              </div>
              <motion.div variants={buttonVariants}>
                <button
                  className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-4 font-semibold rounded-md shadow-xl hover:shadow-2xl transition duration-300"
                  onClick={handleAddToCart}
                >
                  Añadir al carrito
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;
