import { CarouselImage } from "@/types/carouselImage";

export async function fetchCarouselImages(): Promise<CarouselImage[]> {
  const res = await fetch(
    "http://localhost:1337/api/carousel-images?populate=*"
  );

  if (!res.ok) {
    throw new Error("Error al obtener datos de la API");
  }

  const data = await res.json();
  return data.data; // Devuelve el arreglo de datos
}
