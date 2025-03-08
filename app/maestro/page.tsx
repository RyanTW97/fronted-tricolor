"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Importamos useInView
import CursoCard from "./components/cursos"; // Asegúrate de importar correctamente

const Maestro = () => {
  const cursos = [
    {
      title: "Curso de Resina Epóxica",
      description: "Aprende a crear piezas únicas con resina epóxica.",
      contents: [
        "Introducción a la resina epóxica.",
        "Herramientas y materiales necesarios.",
        "Técnicas básicas de mezcla y aplicación.",
        "Proyectos prácticos para principiantes.",
      ],
      price: "$49.99",
      buttonText: "Inscribirme",
    },
    {
      title: "Curso de Carpintería Básica",
      description: "Descubre cómo trabajar la madera de forma profesional.",
      contents: [
        "Conceptos básicos de carpintería.",
        "Uso de herramientas manuales y eléctricas.",
        "Técnicas de ensamblaje.",
        "Construcción de un proyecto simple.",
      ],
      price: "$39.99",
      buttonText: "Inscribirme",
    },
  ];

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "#000000", // Fondo negro
      },
    },
    particles: {
      number: {
        value: 100, // Más partículas
      },
      color: {
        value: "#1d4ed8", // Color de las partículas
      },
      shape: {
        type: "circle", // Forma de las partículas
      },
      opacity: {
        value: 0.5, // Opacidad de las partículas
      },
      size: {
        value: 3, // Tamaño de las partículas
      },
      move: {
        enable: true,
        speed: 1, // Velocidad de las partículas
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
      links: {
        enable: true, // Habilita las líneas entre partículas
        distance: 150, // Distancia para conectarse
        color: "#ffffff", // Color de las líneas
        opacity: 0.4, // Opacidad de las líneas
        width: 1, // Ancho de las líneas
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Las líneas se destacan al pasar el mouse
        },
        onClick: {
          enable: true,
          mode: "push", // Agrega partículas al hacer clic
        },
      },
      modes: {
        grab: {
          distance: 200, // Distancia para destacar líneas
          lineLinked: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  const words = ["Capacítate", "Maestro"];

  return (
    <div className="relative flex flex-col items-center min-h-screen px-6">
      {/* Fondo negro con partículas conectadas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Título animado palabra por palabra */}
      <div className="flex space-x-4 mt-36 mb-4 z-10">
        {words.map((word, index) => (
          <motion.span
            key={word}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.3,
                  duration: 0.8,
                  type: "spring",
                },
              }),
            }}
            className={`text-6xl font-extrabold ${
              index === 0 ? "text-white" : "text-blue-700"
            }`}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Subtítulo animado */}
      <motion.p
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut", delay: 1.5 },
          },
        }}
        className="text-xl text-gray-200 text-center max-w-3xl z-10 mb-16"
      >
        Inicia tu camino hacia la{" "}
        <span className="text-blue-600 font-bold text-3xl">
          excelencia profesional
        </span>{" "}
        con cursos diseñados para transformar tu potencial.
      </motion.p>

      {/* Cursos animados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 z-10">
        {cursos.map((curso, index) => {
          const { ref, inView } = useInView({ triggerOnce: true });
          return (
            <motion.div
              key={index}
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 2.5 + index * 0.2, // Retraso de 1 segundo después del subtítulo
                    duration: 0.6,
                    type: "spring",
                  },
                },
              }}
            >
              <CursoCard
                title={curso.title}
                description={curso.description}
                contents={curso.contents}
                price={curso.price}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Maestro;
