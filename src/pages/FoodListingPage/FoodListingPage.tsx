import { useState } from "react";
import FiltersSidebar from "./components/FiltersSidebar";
import FoodGrid from "./components/FoodGrid";
import { ChefCustomLoader } from "@/shared";

export default function FoodListingPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      
      {loading && (
        <div className="absolute inset-0 bg-background/80 z-50 flex justify-center items-center">
          <ChefCustomLoader />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <FiltersSidebar
          categories={categories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <FoodGrid
          priceRange={priceRange}
          selectedCategories={selectedCategories}
          setLoading={setLoading}
          setCategories={setCategories}
        />
      </div>
    </div>
  );
}