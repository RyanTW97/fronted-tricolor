"use client";

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const socialLinks = [
  {
    href: "https://www.facebook.com/TRICOLOR.PinturasAmerica",
    icon: <FaFacebookF size={24} />,
    hoverColor: "text-white hover:text-blue-700",
  },
  {
    href: "https://www.instagram.com/tri_color_by_america/",
    icon: <FaInstagram size={24} />,
    hoverColor: "text-white hover:text-pink-700",
  },
  {
    href: "https://www.tiktok.com/@tricolor_by_ameri",
    icon: <FaTiktok size={24} />,
    hoverColor: "text-white hover:text-gray-200",
  },
];

const Footer = () => (
  <div
    className="relative min-h-[18rem] md:min-h-[11rem] lg:min-h-[20rem] xl:min-h-[22rem] bg-gray-900 "
    style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
  >
    <div className="fixed w-full bottom-0">
      <div className="bg-gradient-to-r from-neutral-950 from-5% via-neutral-800 via-50% to-neutral-950 to-95% flex flex-col md:flex-row md:gap-10 lg:gap-0">
        {/* Logo Section */}
        <div className="flex flex-col justify-center items-center md:items-start md:basis-1/3 my-10">
          <Link href="/" className="btn btn-ghost text-xl hover:bg-transparent">
            <Image
              src="/logo_tricolor.webp"
              alt="Tricolor Logo"
              width={450}
              height={160}
              priority
              className="w-auto h-auto max-w-[150px] md:max-w-[250px] lg:max-w-[350px] xl:max-w-[450px]"
            />
          </Link>
        </div>

        {/* Social Icons and Text Section */}
        <div className="flex flex-col basis-full md:basis-2/3 justify-center items-center space-y-6 p-5 md:space-y-8 lg:space-y-10 lg:p-20">
          <div className="flex justify-center space-x-4">
            {socialLinks.map(({ href, icon, hoverColor }, index) => (
              <Link
                key={index}
                href={href}
                className={`text-gray-700 ${hoverColor} hover:scale-150 transition`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </Link>
            ))}
          </div>

          <p className="text-white text-xs md:text-base lg:text-lg">
            Copyright © {new Date().getFullYear()} - Todos los derechos
            reservados
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-red-600">
            <span className={openSans.variable}>
              ¡Siente la diferencia, Elige calidad!
            </span>
          </h1>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
