import { SlidersHorizontal } from "lucide-react";
import { Card, Checkbox, Slider, Button } from "@/shared";

import { useEffect, useState } from "react";
import { FoodService } from "@/service/food.service";
import { Food } from "@/types/Food.types";

type DomoDoc<T> = { id: string; content: T };

export default function FiltersSidebar({
  categories,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
}: any) {

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(
        selectedCategories.filter((c: string) => c !== cat)
      );
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <aside className="lg:col-span-1 space-y-6">
      <Card className="p-6 border-primary/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Filters
        </h3>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Categories</h4>

          <div className="space-y-2">
            {categories.map((category : any) => (
              <div
                key={category}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() =>
                    toggleCategory(category)
                  }
                />

                <label className="text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">
            Price Range
          </h4>

          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            step={10}
          />

          <div className="flex justify-between text-xs mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        <Button className="w-full">
          Apply Filters
        </Button>
      </Card>
    </aside>
  );
}