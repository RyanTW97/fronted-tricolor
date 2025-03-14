// @ts-nocheck
"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import CardLink from "@/components/CardLink";
import Linea from "@/components/Linea";

// Lazy load modal components
const CalculadoraPintura = dynamic(
  () => import("@/app/calculadora/components/CalculadoraPintura"),
  {
    ssr: false,
    loading: () => (
      <p className="text-center text-gray-500">
        Cargando calculadora de pintura...
      </p>
    ),
  }
);

const CalculadoraProducto = dynamic(
  () => import("@/app/calculadora/components/CalculadoraProducto"),
  {
    ssr: false,
    loading: () => (
      <p className="text-center text-gray-500">
        Cargando calculadora de productos...
      </p>
    ),
  }
);

const Calculadora: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleModalOpen = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleModalClose = () => {
    setOpenModal(null);
  };

  return (
    <div className="mb-10 px-4 sm:px-[4vw] md:px-[6vw] lg:px-[8vw] pt-4">
      {/* CardLink para Calculadora de Pintura */}
      <motion.div
        className="py-14"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CardLink
          bgColor="#FB9D00"
          title="¿No sabes cuánta pintura necesitas?"
          subtitle="Usa nuestra calculadora y obtén la cantidad exacta para tu proyecto."
          imageSrc="/womenworker.png"
          buttonColor="#0C4A6E"
          buttonText="Prueba nuestra calculadora de Pintura"
          buttonLink="/#"
          onModalOpen={() => handleModalOpen("pintura")}
        />
      </motion.div>
      <Linea />

      {/* CardLink para Calculadora de Producto */}
      <motion.div
        className="py-14"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <CardLink
          bgColor="#f472b6"
          title="Encuentra el producto ideal para tu proyecto"
          subtitle="Te ayudamos a elegir el mejor producto según tu necesidad"
          imageSrc="/women.png"
          buttonColor="#6D1B7B"
          buttonText="Descubre el producto perfecto"
          buttonLink="/#"
          position="left"
          onModalOpen={() => handleModalOpen("producto")}
        />
      </motion.div>
      <Linea />

      <motion.div
        className="py-14"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <CardLink
          bgColor="#7753A7"
          title="¿Buscas algo más?"
          subtitle="Ponte en contacto con uno de nuestros técnicos y obtén asesoramiento personalizado."
          imageSrc="/Happy.png"
          buttonColor="#f59e0b"
          buttonText="Hablar con un técnico"
          buttonLink="/contact"
          buttonBackground="#FFFFFF16"
        />
      </motion.div>

      {/* DaisyUI Modal - Lazy Loading Calculadoras */}
      {openModal && (
        <motion.div
          className="modal modal-open"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-box">
            <Suspense
              fallback={<p className="text-center">Cargando calculadora...</p>}
            >
              {openModal === "pintura" ? (
                <CalculadoraPintura />
              ) : (
                <CalculadoraProducto />
              )}
            </Suspense>
            <div className="modal-action">
              <button className="btn" onClick={handleModalClose}>
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Calculadora;
