import { motion } from "framer-motion";
import Linea from "@/components/Linea";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

interface ProductDetailsProps {
  product: any;
  colors: any[];
  presentations: any[];
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  selectedPresentation: number | null;
  setSelectedPresentation: (presentation: number | null) => void;
  selectedPrice: number | null;
  setSelectedPrice: (price: number | null) => void;
}

const getImageUrl = (url: string) => {
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
};

const calculateDiscountedPrice = (originalPrice: number, discount: number) =>
  originalPrice - originalPrice * (discount / 100);

const ProductDetails = ({
  product,
  colors,
  presentations,
  selectedColor,
  setSelectedColor,
  selectedPresentation,
  setSelectedPresentation,
  selectedPrice,
  setSelectedPrice,
}: ProductDetailsProps) => {
  const {
    productName,
    description,
    category,
    images,
    discountPercentage,
    isOffer,
    selloCalidad,
  } = product;

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (selectedPresentation === null || selectedPrice === null) {
      toast.error("Selecciona una presentación antes de añadir al carrito");
      return;
    }

    const selectedPresObj = presentations[selectedPresentation];
    const imageUrl = images?.data?.[0]?.attributes?.url
      ? images.data[0].attributes.url.startsWith("http")
        ? images.data[0].attributes.url
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`
      : null;

    const productToAdd = {
      ...product,
      image: imageUrl,
      quantity: 1,
      prices: [
        {
          precio: selectedPresObj.precio,
          presentacion: selectedPresObj.presentacion,
        },
      ],
    };

    try {
      addItem(productToAdd);
      toast.success(`${productName} añadido al carrito 🛒`);
    } catch (error) {
      toast.error("Error al añadir el producto al carrito");
    }
  };

  const handlePresentationChange = (index: number) => {
    setSelectedPresentation(index);
    setSelectedPrice(presentations[index].precio);
  };

  return (
    <div className="flex flex-col justify-between">
      {/* Datos principales */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
          {productName}
          <Linea />
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          {category?.data?.attributes?.categoryName}
        </p>

        {isOffer && discountPercentage > 0 && (
          <div className="bg-red-600 text-white text-sm py-2 px-4 rounded-md animate-scale-pulse w-fit shadow-md mx-auto text-center">
            Este producto tiene {discountPercentage}% de descuento
          </div>
        )}

        {selloCalidad?.data?.attributes?.url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center pt-6"
          >
            <Image
              src={getImageUrl(selloCalidad.data.attributes.url)}
              alt="Sello de calidad inen"
              height={50}
              width={150}
              className="mb-2"
            />
            <div className="text-blue-800 font-semibold">
              Este sello cuenta con calidad inen
            </div>
          </motion.div>
        )}

        <p
          className="text-lg text-gray-700 mt-6"
          style={{ whiteSpace: "pre-line", textAlign: "justify" }}
        >
          {description}
        </p>
      </div>

      {/* Selección de colores con grilla */}
      {colors.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Colores Disponibles:
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {colors.map((colorItem, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(colorItem.titulo)}
                className="cursor-pointer flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
              >
                <div
                  className={`w-12 h-12 rounded-full border ${
                    selectedColor === colorItem.titulo
                      ? "border-blue-800 shadow-lg"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: colorItem.codigo }}
                ></div>
                <span
                  className={`mt-2 text-sm ${
                    selectedColor === colorItem.titulo
                      ? "font-bold text-blue-800"
                      : "text-gray-600"
                  }`}
                >
                  {colorItem.titulo}
                </span>
              </div>
            ))}
          </div>
          <h1 className="text-gray-500  text-sm">
            <span className="text-gray-800">Nota:</span> Los colores mostrados
            son referenciales y pueden presentar variaciones en la versión
            original.
          </h1>
        </div>
      )}

      {/* Selección de presentaciones */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Presentaciones Disponibles:
        </h3>
        <div className="flex flex-wrap gap-4">
          {presentations.map((presentation, index) => (
            <button
              key={index}
              onClick={() => handlePresentationChange(index)}
              className={`px-6 py-2 border rounded-lg transition duration-300 ${
                selectedPresentation === index
                  ? "bg-blue-800 text-white"
                  : "bg-white text-blue-800"
              }`}
            >
              {presentation.presentacion}
            </button>
          ))}
        </div>
      </div>

      {/* Precio con descuento (si aplica) */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-blue-800">Precio:</h3>
        {isOffer && discountPercentage > 0 && selectedPrice ? (
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-lg text-gray-500 line-through">
              ${selectedPrice.toFixed(2)}
            </span>
            <span className="text-xl font-bold text-green-600">
              $
              {calculateDiscountedPrice(
                selectedPrice,
                discountPercentage
              ).toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900 mt-2 block">
            ${selectedPrice ? selectedPrice.toFixed(2) : "0.00"}
          </span>
        )}
      </div>

      {/* Botón "Añadir al carrito" */}
      <div className="mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Añadir al carrito
        </motion.button>
      </div>
    </div>
  );
};

export default ProductDetails;
