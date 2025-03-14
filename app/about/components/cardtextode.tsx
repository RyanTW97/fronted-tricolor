import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

interface AboutProps {
  imageSrc: string;
  title: string;
  paragraph: string;
}

const CardTextoDe: React.FC<AboutProps> = ({ imageSrc, title, paragraph }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const typingAnimation = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col sm:flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 gap-4 sm:gap-8"
    >
      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 text-center lg:text-left"
      >
        <motion.h2
          variants={typingAnimation}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl sm:text-5xl lg:text-8xl font-bold mb-2 sm:mb-4 text-blue-800 cormorant whitespace-normal break-words"
        >
          {title.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordAnimation}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="text-lg sm:text-2xl lg:text-4xl leading-relaxed flamenco font-semibold mb-2 sm:mb-4"
        >
          {paragraph}
        </motion.p>
      </motion.div>

      {/* Imagen con tamaño adaptable */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5"
      >
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={300}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default CardTextoDe;
