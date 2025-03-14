import type { Metadata } from "next";
import { Cormorant_SC, Flamenco } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify
import WhatsAppButton from "@/components/whatsappButton";
import React from "react";

// Fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Fuentes de Google
const cormorant = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cormorant",
});

const flamenco = Flamenco({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-flamenco",
});

// Metadatos del proyecto
export const metadata: Metadata = {
  title: "Tricolor",
  description: "Amor por la calidad",
};

// Componente principal de layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${flamenco.variable} antialiased`}
      >
        {" "}
        {/* Envuelve todo en UserProvider */}
        {/* Navbar siempre visible */}
        <Navbar />
        <main className="flex-grow pt-[70px] lg:pt-[170px] bg-gray-100">
          {children}
        </main>
        <WhatsAppButton />
        {/* Footer */}
        <Footer />
        {/* ToastContainer para manejar las notificaciones */}
        <ToastContainer
          position="bottom-right" // Posición de las notificaciones
          autoClose={3000} // Tiempo de cierre automático (en milisegundos)
          hideProgressBar={false} // Mostrar barra de progreso
          newestOnTop={false} // No colocar las notificaciones nuevas al principio
          closeOnClick // Cierra al hacer clic
          rtl={false} // Soporte para texto de derecha a izquierda
          pauseOnFocusLoss // Pausar si se pierde el foco
          draggable // Permitir arrastrar las notificaciones
          pauseOnHover // Pausar si se pasa el ratón por encima
          theme="light" // Tema de las notificaciones (light, dark, colored)
        />
      </body>
    </html>
  );
}
