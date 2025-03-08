"use client";

import React, { useState } from "react";

interface WallDimension {
  height: number | null;
  width: number | null;
  area: number | null;
  locked: boolean;
}

const CalculadoraPintura: React.FC = () => {
  const [numberOfWalls, setNumberOfWalls] = useState<number | null>(null);
  const [wallsDimensions, setWallsDimensions] = useState<WallDimension[]>([]);
  const [paintNeeded, setPaintNeeded] = useState<number | null>(null);

  const initializeWallDimensions = (num: number) => {
    return Array(num)
      .fill(null)
      .map(() => ({ height: null, width: null, area: null, locked: false }));
  };

  const handleNumberOfWallsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNumberOfWalls(value);
    setWallsDimensions(initializeWallDimensions(value));
  };

  const updateWallDimension = (
    index: number,
    field: "height" | "width" | "area",
    value: number
  ) => {
    setWallsDimensions((prev) => {
      const updatedWalls = [...prev];
      const wall = { ...updatedWalls[index], [field]: value };

      if (wall.height && wall.width) {
        wall.area = wall.height * wall.width;
        wall.locked = true;
      }

      updatedWalls[index] = wall;
      return updatedWalls;
    });
  };

  const unlockWall = (index: number) => {
    setWallsDimensions((prev) => {
      const updatedWalls = [...prev];
      updatedWalls[index] = {
        ...updatedWalls[index],
        area: null,
        locked: false,
      };
      return updatedWalls;
    });
  };

  const calculatePaintNeeded = () => {
    const totalArea = wallsDimensions.reduce(
      (sum, wall) => sum + (wall.area || 0),
      0
    );
    const paintCoveragePerLiter = 10; // 10 m² por litro
    setPaintNeeded(totalArea / paintCoveragePerLiter);
  };

  return (
    <div
      className="p-6 max-w-lg mx-auto rounded-lg shadow-md"
      data-theme="retro"
    >
      <h1 className="text-2xl font-bold mb-4">Calculadora de Pintura</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ¿Cuántas paredes vas a pintar?
        </label>
        <input
          type="number"
          min="1"
          value={numberOfWalls ?? ""}
          onChange={handleNumberOfWallsChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {wallsDimensions.map((wall, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Pared {index + 1}</h2>
          <div className="flex space-x-4 mb-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Altura (metros)
              </label>
              <input
                type="number"
                min="0"
                value={wall.height ?? ""}
                onChange={(e) =>
                  updateWallDimension(
                    index,
                    "height",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                disabled={wall.locked}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Ancho (metros)
              </label>
              <input
                type="number"
                min="0"
                value={wall.width ?? ""}
                onChange={(e) =>
                  updateWallDimension(
                    index,
                    "width",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                disabled={wall.locked}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Área Total (m²)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={wall.area ?? ""}
                onChange={(e) =>
                  updateWallDimension(
                    index,
                    "area",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                disabled={wall.locked}
              />
              {wall.locked && (
                <button
                  onClick={() => unlockWall(index)}
                  className="bg-red-400 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {numberOfWalls && (
        <button
          onClick={calculatePaintNeeded}
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 focus:ring-2 focus:ring-blue-400"
        >
          Calcular cantidad de pintura
        </button>
      )}

      {paintNeeded !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
          <p>
            Necesitarás aproximadamente{" "}
            <strong>{paintNeeded.toFixed(2)} litros</strong> de pintura.
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculadoraPintura;
