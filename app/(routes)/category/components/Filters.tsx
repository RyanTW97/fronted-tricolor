import Filtercategory from "./Filtercategory";

type FiltersProps = {
  setFilterCategory: (category: string) => void;
  selectedCategory: string;
};

function Filters({ setFilterCategory, selectedCategory }: FiltersProps) {
  return (
    <div>
      <Filtercategory
        setFilterCategory={setFilterCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Filters;
