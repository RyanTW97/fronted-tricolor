export type ProductType = {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  isOffer: boolean; // Campo para indicar si está en oferta
  discountPercentage?: number; // Campo para el porcentaje de descuento (opcional)
  category: CategoryType; // Relación con categoría
  color: {
    color?: ColorType[]; // En algunos productos aparece como `color`
    colores?: ColorType[]; // En otros productos aparece como `colores`
  };
  prices: {
    prices: PriceType[];
  };
  images: ImageType[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

// Definición de Category
export type CategoryType = {
  id: number;
  categoryName: string; // Nombre de la categoría
  slug: string; // Slug único para identificar la categoría
};

// Definición de Color
type ColorType = {
  codigo: string;
  titulo: string;
};

// Definición de Price
type PriceType = {
  precio: number;
  presentacion: string;
};

// Definición de Image
type ImageType = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  url: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
