import { useGetProductField } from "@/app/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

type Category = {
  id: string;
  slug: string;
  categoryName: string;
};

type FiltersCategoryProps = {
  setFilterCategory: (category: string) => void;
  selectedCategory: string;
};

const FilterCategory = ({
  setFilterCategory,
  selectedCategory,
}: FiltersCategoryProps) => {
  const { result, loading, error } = useGetProductField();

  if (loading)
    return <p className="text-gray-600 animate-pulse">Cargando filtros...</p>;
  if (error)
    return <p className="text-red-500">Error al cargar categorías: {error}</p>;

  const categories: Category[] =
    (result as any)?.data?.map((cat: any) => ({
      id: cat.id,
      slug: cat.attributes?.slug ?? "sin-slug",
      categoryName: cat.attributes?.categoryName ?? "Sin nombre",
    })) || [];

  return categories.length > 0 ? (
    <div className="p-4 bg-white rounded-md shadow-lg">
      <h1 className="text-lg font-semibold text-blue-800 mb-4 border-b pb-2">
        Categorías
      </h1>
      <RadioGroup
        value={selectedCategory}
        onValueChange={setFilterCategory}
        className="space-y-4"
      >
        {categories.map(({ id, slug, categoryName }) => (
          <div
            key={id}
            className="flex items-center space-x-3 p-2 rounded-md transition-all duration-300 cursor-pointer hover:bg-blue-50 hover:shadow-sm"
          >
            <RadioGroupItem
              value={slug}
              id={`category-${id}`}
              className="appearance-none border-2 border-gray-300 rounded-full w-5 h-5 checked:bg-blue-800 checked:border-blue-800 focus:outline-none transition-all duration-300"
            />
            <Label
              htmlFor={`category-${id}`}
              className="text-gray-700 hover:text-blue-800 font-medium"
            >
              {categoryName}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  ) : (
    <p className="text-gray-500">No hay categorías disponibles.</p>
  );
};

export default FilterCategory;
