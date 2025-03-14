// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { provinces } from "@/utils/provinces";

const initialState = {
  nombre: "",
  apellido: "",
  provincia: "",
  ciudad: "",
  telefono: "",
  callePrincipal: "",
  referencias: "",
  email: "",
  username: "",
  id: "",
};

export default function ProfilePage() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      if (parsedData.provincia) {
        updateCities(parsedData.provincia);
      }
    } else {
      const loadUserData = async () => {
        try {
          const res = await fetch("/api/user");
          const userData = await res.json();

          if (userData.ok) {
            setFormData({ ...initialState, ...userData.data });
            updateCities(userData.data.provincia);
          } else {
            alert("No se pudo cargar la información del usuario.");
          }
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
          alert("Hubo un error al cargar los datos del usuario.");
        }
      };
      loadUserData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "provincia") {
      updateCities(value);
    }
  };

  const updateCities = (province: string) => {
    // Se usa Object.prototype.hasOwnProperty.call para evitar el error ESLint
    if (Object.prototype.hasOwnProperty.call(provinces, province)) {
      const selectedCities =
        provinces[province as keyof typeof provinces] || [];
      setCities(selectedCities);
      setFormData((prev) => ({
        ...prev,
        ciudad: selectedCities.length > 0 ? selectedCities[0] : "",
      }));
    } else {
      setCities([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.telefono ||
      !formData.callePrincipal ||
      !formData.provincia ||
      !formData.ciudad
    ) {
      setMessage("Por favor, completa todos los campos requeridos.");
      setLoading(false);
      return;
    }

    try {
      console.log("📌 Iniciando simulación de guardado...");

      setTimeout(() => {
        console.log("✅ Simulación de guardado completada.");
        setMessage("Perfil actualizado y bloqueado temporalmente.");
        setFormDisabled(true);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      setMessage("Hubo un error al actualizar tu perfil.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 shadow-xl bg-white rounded-xl max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Editar Perfil
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Actualiza tu información personal.
      </p>

      <div className="mb-6 px-6 py-4 bg-indigo-200 rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-sm font-medium text-blue-800">
            Nombre de usuario
          </label>
          <p className="text-gray-600 text-lg font-semibold">
            {formData.username}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-800">
            Correo
          </label>
          <p className="text-gray-600 text-lg font-semibold">
            {formData.email}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Nombre", name: "nombre", value: formData.nombre },
            { label: "Apellido", name: "apellido", value: formData.apellido },
            { label: "Teléfono", name: "telefono", value: formData.telefono },
            {
              label: "Calle Principal",
              name: "callePrincipal",
              value: formData.callePrincipal,
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-indigo-700">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={field.value}
                onChange={handleChange}
                disabled={loading || formDisabled}
                className="mt-1 block w-full px-4 py-2 border-2 rounded-lg shadow-md focus:outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Provincia
            </label>
            <select
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              disabled={loading || formDisabled}
              className="mt-1 block w-full px-4 py-2 border-2 rounded-lg shadow-md focus:outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una provincia</option>
              {Object.keys(provinces).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Ciudad
            </label>
            <select
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              disabled={loading || formDisabled}
              className="mt-1 block w-full px-4 py-2 border-2 rounded-lg shadow-md focus:outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || formDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition-all mt-6 shadow-md"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>

        {message && (
          <p className="text-center text-green-600 font-semibold mt-4">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
