"use client";
import { useGetProductBySlug } from "@/app/api/getProductBySlug";
import { useParams } from "next/navigation";
import Link from "next/link";
import SkeletonProduct from "../components/skeletonProduct";
import { useState, useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import ImageGallery from "../components/ImageGallery";

const Page = () => {
  const { productSlug } = useParams();
  const { result } = useGetProductBySlug(productSlug);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPresentation, setSelectedPresentation] = useState<
    number | null
  >(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  useEffect(() => {
    if (result?.length) {
      const product = result[0]?.attributes;
      if (!product) return;

      const colors = product.color || [];
      const presentations = product.prices || [];

      setSelectedColor(colors.length ? colors[0].titulo : null);
      setSelectedPresentation(presentations.length ? 0 : null);
      setSelectedPrice(
        presentations.length ? presentations[0]?.precio || 0 : null
      );
    }
  }, [result]);

  if (!result?.length) return <SkeletonProduct />;

  const product = result[0].attributes;
  const processedImages =
    product.images?.data?.map((img: any) => ({
      url: img.attributes.url.startsWith("http")
        ? img.attributes.url
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${img.attributes.url}`,
      alt: img.attributes.name,
    })) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-8">
          <p className="text-sm text-gray-500 mb-6">
            <Link
              href={`/category/${product.category?.data?.attributes?.slug}`}
              className="text-blue-800 hover:underline transition duration-300"
            >
              {product.category?.data?.attributes?.categoryName}
            </Link>{" "}
            /{" "}
            <span className="font-bold text-blue-800">
              {product.productName}
            </span>
          </p>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <ImageGallery images={processedImages} />
              {product.fichaTecnica?.data?.attributes?.url && (
                <div className="mt-6">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.fichaTecnica.data.attributes.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-800 text-white py-3 rounded-md shadow-lg hover:bg-blue-900 transition duration-300"
                  >
                    Ficha Técnica
                  </a>
                </div>
              )}
            </div>

            <ProductDetails
              product={product}
              colors={product.color || []}
              presentations={product.prices || []}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedPresentation={selectedPresentation}
              setSelectedPresentation={setSelectedPresentation}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;
