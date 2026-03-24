import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FoodService } from "@/service/food.service";
import { Food } from "@/types/Food.types";
type DomoDoc<T> = { id: string; content: T };
export default function FoodGrid({ priceRange, selectedCategories, setLoading }: any) {

  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      const res = ((await FoodService.getAll()) as DomoDoc<Food>[]) ?? [];
      
      const flattened = res.map((f:any)=>({
        docId: f.id,
        ...f.content
      }));

      setFoods(flattened);
      setLoading(false);
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const price = Number(food.price);

    const priceMatch =
      price >= priceRange[0] && price <= priceRange[1];

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(food.category);

    return priceMatch && categoryMatch;
  });

  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFoods.map((food, index) => (
          <FoodCard key={food.docId} food={food} index={index} />
        ))}
      </div>
    </div>
  );
}