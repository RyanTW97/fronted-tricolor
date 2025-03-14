"use client";

import { motion } from "framer-motion";

const OfferBanner: React.FC = () => {
  return (
    <div className="bg-gradient-radial from-blue-500 to-blue-800 ">
      <motion.div
        initial={{ rotate: 10 }}
        animate={{ rotate: -8 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="relative w-full h-64 md:h-80 lg:h-[50vh] text-white overflow-hidden p-5 flex justify-center items-center"
      >
        {/* Contenedor del texto superior: PRECIOS DE LOCURA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 120,
          }}
          className="absolute flex items-center space-x-2 top-14 md:top-20 lg:top-36"
        >
          {/* Línea amarilla */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-32 md:w-44 lg:w-60 h-1 bg-yellow-400 origin-left"
          ></motion.div>

          {/* Texto: PRECIOS DE LOCURA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wide"
          >
            PRECIOS DE LOCURA
          </motion.div>
        </motion.div>

        {/* Texto central: OFERTAS */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          className="relative bg-blue-300 text-white text-5xl md:text-7xl lg:text-8xl font-extrabold py-6 px-8 rounded-lg inline-block shadow-lg"
        >
          OFERTAS
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-4/5 h-2 bg-yellow-400 origin-left -z-10"
          ></motion.div>
          {/* Etiqueta: COMPRA AHORA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.8,
              type: "spring",
              stiffness: 80,
            }}
            className="absolute bottom-[-20px] left-4 bg-yellow-400 text-blue-800 text-xs md:text-sm lg:text-base font-bold py-2 px-4 rounded transform shadow-md"
          >
            COMPRA AHORA
          </motion.div>
          {/* Etiqueta: HASTA 50% OFF */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 2.2,
              type: "spring",
              stiffness: 120,
            }}
            className="absolute bottom-[-40px] md:bottom-[-45px] lg:bottom-[-50px] right-4 bg-blue-700 text-yellow-300 text-xs md:text-sm lg:text-base font-bold py-3 px-6 rounded-lg text-center shadow-md"
          >
            HASTA
            <br /> 50% OFF
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OfferBanner;
