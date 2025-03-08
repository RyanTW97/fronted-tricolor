import { memo, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { FaMapMarkerAlt, FaPhoneAlt, FaDirections } from "react-icons/fa";
import { LatLngBounds, LatLngLiteral, Map } from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type MapLocation = LatLngLiteral & {
  id: string;
  title: string;
  address: string;
  phone: string;
  directionLink: string;
};

type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
};

// 🟢 Ajustar el mapa para que muestre todas las ubicaciones
const FitBounds = ({ locations }: { locations: MapLocation[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = new LatLngBounds(
        locations.map((loc) => [loc.lat, loc.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] }); // Ajustamos padding para mejor visualización
    }
  }, [locations, map]);

  return null;
};

const MapComponent: React.FC<MapProps> = memo(({ center, locations }) => {
  const mapRef = useRef<Map | null>(null); // ⛔ Evita múltiples instancias

  const renderMarkers = () => {
    return locations.map((location) => (
      <Marker
        key={location.id}
        position={{ lat: location.lat, lng: location.lng }}
        icon={L.icon({
          iconUrl:
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          `),
          iconSize: [48, 48], // 🟢 Icono de ubicación más grande
          iconAnchor: [24, 48], // Ajuste para centrar correctamente
          popupAnchor: [0, -48], // Ajuste para evitar desplazamiento del Popup
        })}
      >
        {/* 🟢 Tooltip mejorado: solo texto azul oscuro sin fondo */}
        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
          <span className="text-blue-900 font-semibold text-sm">
            {location.title}
          </span>
        </Tooltip>

        <Popup>
          {/* 📌 Contenedor del popup estilizado */}
          <div className="p-4 w-64 text-gray-800">
            {/* 📌 Logo centrado */}
            <div className="flex justify-center mb-3">
              <Image src="/logo.png" width={60} height={60} alt="Logo" />
            </div>

            {/* 📌 Título en azul oscuro */}
            <h3 className="text-lg font-bold text-blue-900 text-center mb-3">
              {location.title}
            </h3>

            {/* 📌 Dirección */}
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              {location.address}
            </p>

            {/* 📌 Teléfono clickeable */}
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <FaPhoneAlt className="text-green-500 mr-2" />
              <a
                href={`tel:${location.phone}`}
                className="text-blue-600 font-bold hover:underline"
              >
                {location.phone}
              </a>
            </p>

            {/* 📌 Botón "Cómo llegar" con texto blanco */}
            <div className="flex justify-center mt-3">
              <a
                href={location.directionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-blue-800 transition"
              >
                <FaDirections className="text-white" />{" "}
                {/* 🟢 Forzamos que el icono también sea blanco */}
                <span className="text-white">Cómo llegar</span>{" "}
                {/* 🟢 Forzamos el texto blanco */}
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
    ));
  };

  return (
    <div className="mt-10 mb-10">
      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        attributionControl={false}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds locations={locations} />{" "}
        {/* 🟢 Ajustar el mapa a todas las ubicaciones */}
        {renderMarkers()}
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
});

// ✅ Exportar el componente correctamente
export default MapComponent;
