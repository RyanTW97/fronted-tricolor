"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useGetProductBySlug } from "@/app/api/getProductBySlug";

// Variantes para el contenedor de elementos que aparecen después
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 1, // Espera 1 segundo antes de animar a los hijos
      staggerChildren: 0.2,
    },
  },
};

// Variantes para cada elemento hijo
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProductFeature = () => {
  const imageControls = useAnimation();
  const { result, isLoading, error } = useGetProductBySlug("fibraseal");
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
      // Extraer el arreglo de presentaciones: admite estructura directa o anidada en attributes.prices.prices
      const pres = Array.isArray(attributes.prices)
        ? attributes.prices
        : attributes.prices?.prices || [];
      setPresentations(pres);
      if (pres.length > 0) {
        setSelectedPresentation(0);
        setSelectedPrice(pres[0].precio);
      }
      // Si el producto tiene opciones de color, se almacena (aunque en este ejemplo no se muestran)
      if (attributes.color?.color && attributes.color.color.length > 0) {
        setSelectedColor(attributes.color.color[0].titulo);
      }
    }
  }, [result]);

  // Función para actualizar la presentación y el precio seleccionado
  const handleSelectPresentation = (index: number) => {
    setSelectedPresentation(index);
    const pres = presentations[index];
    if (pres) {
      setSelectedPrice(pres.precio);
    }
  };

  // Calculamos el descuento y el precio con descuento
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
      // Si es necesario, se puede incluir el color seleccionado
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
  // Usamos una imagen fija para visualización
  const imageUrlDisplay = "/cretonhard.png";

  return (
    <section className="mt-10">
      <div className="w-full h-auto py-10 bg-gradient-to-tr from-amber-200 to-yellow-400">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Lado izquierdo: Imagen animada */}
          <div className="flex-1 lg:pl-8">
            <div className="relative w-full h-[60vh] max-h-[500px] rounded-2xl overflow-hidden">
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
                        scale: [1, 1.05, 1],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      });
                    });
                }}
                className="w-full h-full"
              >
                <Image
                  src={imageUrlDisplay}
                  alt={attributes.productName || "Producto"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Lado derecho: Contenido textual y controles */}
          <div className="flex-1 flex flex-col items-center text-center">
            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1,
              }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold font-cormorant text-emerald-700 mb-4"
            >
              {attributes.productName}
            </motion.h2>

            {/* Contenedor para el resto del contenido */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Descripción */}
              <motion.p
                variants={childVariants}
                className="text-2xl text-emerald-800 mb-8"
              >
                {attributes.description}
              </motion.p>

              {/* Botones de presentación */}
              <motion.div
                variants={childVariants}
                className="flex gap-4 mb-4 justify-center"
              >
                {presentations.map((pres, index) => (
                  <motion.button
                    key={pres.presentacion}
                    variants={childVariants}
                    onClick={() => handleSelectPresentation(index)}
                    className={`px-4 py-2 rounded-lg text-lg font-bold border-2 ${
                      selectedPresentation === index
                        ? "bg-emerald-800 text-white border-emerald-800"
                        : "bg-white text-emerald-800 border-emerald-800"
                    }`}
                  >
                    {pres.presentacion}
                  </motion.button>
                ))}
              </motion.div>

              {/* Bloque de precios */}
              <motion.div variants={childVariants} className="mb-4">
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
                      <span className="text-2xl font-bold text-emerald-800">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-lg font-semibold text-black">
                      Precio:{" "}
                    </span>
                    <span className="text-2xl font-bold text-emerald-800">
                      ${selectedPrice ? selectedPrice.toFixed(2) : "0.00"}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Botón para añadir al carrito */}
              <motion.div variants={childVariants}>
                <button
                  className="px-6 py-3 rounded-lg text-lg font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition duration-300"
                  onClick={handleAddToCart}
                >
                  Añadir al carrito
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;
