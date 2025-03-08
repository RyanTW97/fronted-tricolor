// @ts-nocheck

"use client";

import React, { useState } from "react";
import CardLink from "@/components/CardLink";
import Linea from "@/components/Linea";
import CalculadoraPintura from "@/app/calculadora/components/CalculadoraPintura";
import CalculadoraProducto from "@/app/calculadora/components/CalculadoraProducto";

const Calculadora: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleModalOpen = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleModalClose = () => {
    setOpenModal(null);
  };

  const modals = {
    pintura: <CalculadoraPintura />,
    producto: <CalculadoraProducto />,
  };

  return (
    <div className="mb-10 px-4 sm:px-[4vw] md:px-[6vw] lg:px-[8vw] pt-4">
      {/* CardLink para Calculadora de Pintura */}
      <div className="py-14">
        <CardLink
          bgColor="#FB9D00"
          title="¿No sabes cuánta pintura necesitas?"
          subtitle="Usa nuestra calculadora y obtén la cantidad exacta para tu proyecto."
          imageSrc="/womenworker.png"
          buttonColor="#0C4A6E"
          buttonText="Prueba nuestra calculadora de Pintura"
          buttonLink="/#"
          onModalOpen={() => handleModalOpen("pintura")} // Abrir modal de pintura
        />
      </div>
      <Linea />

      {/* CardLink para Calculadora de Producto */}
      <div className="py-14">
        <CardLink
          bgColor="#f472b6"
          title="Encuentra el producto ideal para tu proyecto"
          subtitle="Te ayudamos a elegir el mejor producto según tu necesidad"
          imageSrc="/women.png"
          buttonColor="#6D1B7B"
          buttonText="Descubre el producto perfecto"
          buttonLink="/#"
          position="left"
          onModalOpen={() => handleModalOpen("producto")} // Abrir modal de producto
        />
      </div>
      <Linea />
      <div className="py-14">
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

        {/* DaisyUI Modal */}
        {openModal && (
          <div
            className="modal modal-open"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Fondo transparente
          >
            <div className="modal-box">
              {modals[openModal as keyof typeof modals]}{" "}
              {/* Renderiza el modal correspondiente */}
              <div className="modal-action">
                <button className="btn" onClick={handleModalClose}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculadora;
