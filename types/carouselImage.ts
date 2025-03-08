export type CarouselImage = {
  id: number;
  Nombre: string; // Nombre del ítem
  Imagen: {
    id: number;
    formats: {
      small?: {
        url: string; // Versión de imagen pequeña
      };
      thumbnail?: {
        url: string; // Versión de imagen en miniatura
      };
    };
    url: string; // URL de la imagen principal
  };
};
