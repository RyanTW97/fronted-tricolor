"use client";

import CardTextoIz from "@/app/about/components/cardtextiz";
import CardTextoDe from "@/app/about/components/cardtextode";
import Linea from "@/components/Linea";

const About = () => {
  return (
    <div className="w-full min-h-screen relative">
      {/* Sección de contenido */}
      <section className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <CardTextoIz
          imageSrc="/3.webp"
          title="Quiénes Somos"
          paragraph="En Tricolor, somos una empresa líder en el mercado de pinturas, comprometidos con la calidad y la innovación en cada una de nuestras líneas de productos. Con una vasta experiencia en el sector, ofrecemos soluciones que abarcan distintos segmentos, tales como pinturas arquitectónicas, metálicas y para la industria petrolera, entre otras."
        />
        <Linea />

        <CardTextoDe
          imageSrc="/4.webp"
          title="Nuestra Misión"
          paragraph="Aportar color y protección a los espacios que construyen las personas, ayudando a crear ambientes que inspiran y reflejan la identidad de cada cliente. Sabemos que el color tiene el poder de transformar, y por ello desarrollamos productos de alto rendimiento, adecuados para cada necesidad y contexto."
        />
        <Linea />

        <CardTextoIz
          imageSrc="/5.webp"
          title="Nuestra Visión"
          paragraph="Desde el hogar hasta grandes proyectos industriales, nuestra visión es ser el referente de confianza en el mundo de las pinturas. Aportamos no solo productos, sino también conocimientos técnicos y asesoramiento especializado para que cada proyecto se convierta en una obra maestra."
        />
        <Linea />

        <CardTextoDe
          imageSrc="/7.webp"
          title="Calidad y Sostenibilidad"
          paragraph="Trabajamos bajo estrictos estándares de calidad y sostenibilidad, con el objetivo de minimizar nuestro impacto ambiental y contribuir a un futuro más limpio. En Tricolor, no solo nos dedicamos a fabricar pinturas; también estamos comprometidos con la innovación, la investigación continua y el desarrollo de soluciones personalizadas que superen las expectativas de nuestros clientes."
        />
        <Linea />

        <CardTextoIz
          imageSrc="/8.webp"
          title="Nuestro Equipo"
          paragraph="Nuestro equipo de profesionales está siempre listo para asistir a nuestros clientes en cada etapa, asegurándonos de que siempre tengan la mejor solución de color y protección para sus proyectos. Creemos en el poder de la colaboración y el servicio cercano para construir relaciones duraderas basadas en la confianza y la calidad."
        />
        <Linea />

        <CardTextoDe
          imageSrc="/6.webp"
          title="Innovación Tecnológica"
          paragraph="La innovación es el motor de nuestra empresa. Constantemente invertimos en nuevas tecnologías y en investigación para mejorar nuestros productos y procesos. Nuestro objetivo es ofrecer soluciones de pintura que no solo cumplan con los más altos estándares de calidad, sino que también sean eficientes y amigables con el medio ambiente."
        />
      </section>
    </div>
  );
};

export default About;
