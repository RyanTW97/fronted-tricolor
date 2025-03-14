import { useState } from "react";

// Lista de superficies con un único producto asignado
const surfaces = [
  { name: "Madera", product: "Producto 1" },
  { name: "Metal", product: "Producto 2" },
  { name: "Concreto", product: "Producto 3" },
  { name: "Cerámica", product: "Producto 4" },
  { name: "Plástico", product: "Producto 5" },
  { name: "Vidrio", product: "Producto 6" },
  { name: "Yeso", product: "Producto 7" },
  { name: "Ladrillo", product: "Producto 8" },
];

export default function CalculadoraProducto() {
  const [selectedSurface, setSelectedSurface] = useState<string>("");
  const [recommendedProduct, setRecommendedProduct] = useState<string>("");

  const handleSurfaceChange = (surfaceName: string) => {
    setSelectedSurface(surfaceName);
    const surface = surfaces.find((s) => s.name === surfaceName);
    setRecommendedProduct(surface?.product || "");
  };

  return (
    <div
      data-theme="retro"
      className="p-6  rounded-md shadow-md max-w-md mx-auto"
    >
      <h1 className="text-xl font-bold mb-4">Calculadora de Producto</h1>
      <label className="block text-gray-700 font-medium mb-2">
        Selecciona la superficie:
      </label>
      <select
        className="w-full p-2 border rounded-md"
        value={selectedSurface}
        onChange={(e) => handleSurfaceChange(e.target.value)}
      >
        <option value="" disabled>
          -- Selecciona una opción --
        </option>
        {surfaces.map((surface) => (
          <option key={surface.name} value={surface.name}>
            {surface.name}
          </option>
        ))}
      </select>

      {recommendedProduct && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Producto recomendado:</h2>
          <p className="mt-2 text-gray-700">{recommendedProduct}</p>
        </div>
      )}

      {selectedSurface && !recommendedProduct && (
        <p className="mt-6 text-red-500">
          No hay producto recomendado para esta superficie.
        </p>
      )}
    </div>
  );
}
