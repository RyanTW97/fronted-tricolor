"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load components
const OfferBanner = dynamic(() => import("./components/offerBanner"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500">Cargando banner...</p>
  ),
});

const OffersGrid = dynamic(() => import("./components/offerGrid"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500">Cargando ofertas...</p>
  ),
});

const Ofertas = () => {
  return (
    <div>
      <OfferBanner />

      <Suspense fallback={<p className="text-center">Cargando ofertas...</p>}>
        <OffersGrid />
      </Suspense>
    </div>
  );
};

export default Ofertas;
