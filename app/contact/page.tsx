"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // 📌 Corrección: usar usePathname en Next.js 13+
import {
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import Image from "next/image";
import Button from "@/components/button";
import dynamic from "next/dynamic";

// 📌 Importación dinámica de MapComponent con SSR desactivado
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>,
});

const socialLinks = [
  {
    href: "https://www.facebook.com/TRICOLOR.PinturasAmerica",
    icon: <FaFacebookF size={24} />,
    color: "text-gray-700 hover:text-blue-600",
  },
  {
    href: "https://www.instagram.com/tri_color_by_america/",
    icon: <FaInstagram size={24} />,
    color: "text-gray-700 hover:text-pink-600",
  },
  {
    href: "https://www.tiktok.com/@tricolor_by_ameri",
    icon: <FaTiktok size={24} />,
    color: "text-gray-700 hover:text-black",
  },
];

const Contactos = () => {
  const mapaRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); // 📌 Detecta cambios en la URL

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      pathname.includes("#mapa") &&
      mapaRef.current
    ) {
      mapaRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); // 📌 Mueve el mapa al inicio del viewport

      // 📌 Desplazamiento adicional hacia abajo para centrar el mapa en la parte inferior
      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" });
      }, 500); // Espera 500ms para evitar conflicto con scrollIntoView
    }
  }, [pathname]); // 📌 Se ejecuta cuando cambia la URL

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: videoContainerRef, inView: isVideoInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (videoRef.current && isVideoInView) {
      videoRef.current.play().catch((error) => {
        console.log("Error al reproducir el video:", error);
      });
    }
  }, [isVideoInView]);

  const { ref: mensajeRef, inView: inViewMensaje } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // 📌 Información de contacto
  const infoBoxes = [
    {
      title: "Estamos disponibles para revisar tus mensajes en estos horarios:",
      content: (
        <>
          <div className="flex items-center mb-2">
            <FaClock className="mr-2" />
            <span>08:00 a.m. a 05:30 p.m.</span>
          </div>
          <div className="flex items-center mb-2">
            <FaPhoneAlt className="mr-2" />
            <span>Línea de Atención Técnica: 099-863-8866</span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2" />
            <span>Línea de Atención Corporativa: 096-262-4716</span>
          </div>
        </>
      ),
    },
    {
      title: "¿Necesitas más ayuda sobre ventas para tu negocio?",
      content: (
        <>
          <h2 className="mb-5">
            Conoce sobre cómo ser un distribuidor autorizado.
          </h2>
          <Button
            texto="¡Quiero ser un distribuidor!"
            color="#030712"
            link="https://wa.link/s8ymbi"
          />
        </>
      ),
    },
  ];

  // 📌 Coordenadas centrales del mapa
  const center = { lat: -0.18974372357367217, lng: -78.49791941781044 };

  // 📌 Ubicaciones de los markers en el mapa
  const locations = [
    {
      id: "1",
      lat: -0.18974372357367217,
      lng: -78.49791941781044,
      title: "Tricolor by America",
      address: "Ruiz de Castilla 30-13, Quito 170521",
      phone: "0962624716",
      directionLink: "https://maps.app.goo.gl/yT6K6Jb5ncAZ4QP89",
    },
    {
      id: "2",
      lat: -0.09130591678391227,
      lng: -78.47632808466274,
      title: "Tricolor Carcelen",
      address: "Av Diego Vásquez de Cepeda N77-360, Quito 170310",
      phone: "0998638866",
      directionLink: "https://maps.app.goo.gl/bea6d4asNSDQqr2CA",
    },
  ];

  return (
    <>
      <Head>
        <title>Contactos - Tricolor</title>
        <meta
          name="description"
          content="Contáctanos y conoce más sobre cómo ser un distribuidor autorizado de Tricolor."
        />
      </Head>

      <div
        ref={videoContainerRef}
        className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/Contactos.mp4"
          autoPlay
          muted
          loop
        />
        <div className="relative z-10 bg-white/80 bg-opacity-70 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-center w-9/12 lg:w-8/12 xl:w-6/12 max-w-screen-lg h-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-sky-800">
            Contáctanos
          </h1>
          <p className="mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl text-gray-700">
            Queremos que tu experiencia sea la mejor. Si tienes alguna pregunta,
            estamos aquí para ayudarte.
          </p>
          <hr className="border-t-2 border-gray-500 my-4" />
          <p className="font-semibold mb-4 text-lg sm:text-xl">
            ¡Únete a nuestra comunidad en las redes sociales!
          </p>
          {/* 🔵 Iconos de Redes Sociales Restaurados */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map(({ href, icon, color }, index) => (
              <a
                key={index}
                href={href}
                className={`text-gray-700 hover:scale-110 transition ${color}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Mensaje + Información */}
      <section
        ref={mensajeRef}
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={inViewMensaje ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="w-full flex flex-col lg:flex-row mt-10 px-10 space-y-10 lg:space-y-0 lg:space-x-10"
        >
          {/* 🟢 Sección Izquierda: Déjanos un mensaje */}
          <div ref={mapaRef} id="mapa" />
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-4">¡Déjanos un mensaje!</h2>
            <p className="mb-6 text-lg">
              Escanea o haz clic en el código QR para comunicarte con nuestro
              equipo técnico vía WhatsApp.
            </p>
            <a
              href="https://wa.link/vtt4zc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 200, damping: 7 }}
              >
                <Image
                  src="/QrCarcelen.png"
                  width={384}
                  height={384}
                  className="shadow-2xl"
                  alt="QR Code"
                />
              </motion.div>
            </a>
          </div>

          {/* 🔵 Sección Derecha: Información de Contacto + Distribuidor */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-10">
            {infoBoxes.map(({ title, content }, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-xl text-left w-full max-w-md"
              >
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                {content}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 📌 Sección del mapa */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }} // 📌 Aparece desde abajo
        animate={{ opacity: 1, y: 0 }} // 📌 Se muestra suavemente
        transition={{ duration: 0.8, ease: "easeOut" }} // 📌 Animación suave
        className="text-xl    xl:text-6xl font-extrabold text-center mt-10 mb-6  bg-clip-text text-blue-800 drop-shadow-lg tracking-wide"
      >
        Encuentra nuestras sucursales
      </motion.h2>
      <div className="mt-10 mb-10 w-full h-[400px] sm:h-[50px] md:h-[450px] lg:h-[500px]">
        <MapComponent center={center} locations={locations} />
      </div>
    </>
  );
};

export default Contactos;
