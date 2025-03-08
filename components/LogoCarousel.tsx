"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

const LogoCarousel = () => {
  return (
    <div className="bg-slate-300 py-5 text-center space-y-3">
      <h1 className="font-cormorant font-semibold text-sky-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        Empresas asociadas
      </h1>
      <Marquee autoFill pauseOnHover gradient gradientColor="#cbd5e1">
        <div className="flex items-center">
          <a
            href="https://www.pinturasamerica.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-32 md:w-40 lg:w-48 xl:w-60 mx-10 object-contain"
              src="/logo_america.webp"
              alt="Logo America"
              width={200}
              height={100}
            />
          </a>
          <a
            href="https://www.instagram.com/constructoramedinacueva/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-32 md:w-40 lg:w-48 xl:w-60 mx-10 object-contain"
              src="/logo_cmc.webp"
              alt="Logo Cmc"
              width={200}
              height={100}
            />
          </a>
          <a
            href="https://www.instagram.com/globar_group/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-32 md:w-40 lg:w-48 xl:w-60 mx-10 object-contain"
              src="/logo_globar.webp"
              alt="Logo Globar"
              width={200}
              height={100}
            />
          </a>
          <a
            href="https://www.pinturasamerica.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-32 md:w-40 lg:w-48 xl:w-60 mx-10 object-contain"
              src="/logo_america.webp"
              alt="Logo America"
              width={200}
              height={100}
            />
          </a>
          <a
            href="https://www.instagram.com/constructoramedinacueva/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-32 md:w-40 lg:w-48 xl:w-60 mx-10 object-contain"
              src="/logo_cmc.webp"
              alt="Logo Cmc"
              width={200}
              height={100}
            />
          </a>
          <a
            href="https://www.instagram.com/globar_group/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-32 md:w-40 lg:w-48 xl:w-60 mx-10 object-contain"
              src="/logo_globar.webp"
              alt="Logo Globar"
              width={200}
              height={100}
            />
          </a>
          <div className="w-4 md:w-4 lg:w-4 xl:w-2"></div>
        </div>
      </Marquee>
    </div>
  );
};

export default LogoCarousel;
