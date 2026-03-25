import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FoodService } from "@/service/food.service";
import { Food } from "@/types/Food.types";
import { VendorService } from "@/service/vendor.service";
import { ReviewService } from "@/service/review.service";
import { Input } from "@/shared";
type DomoDoc<T> = { id: string; content: T };
export default function FoodGrid({
  priceRange,
  selectedCategories,
  setLoading,
  setCategories,
}: any) {
  const [foods, setFoods] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [foodsRes, vendorsRes, reviewsRes] = await Promise.all([
        FoodService.getAll(),
        VendorService.getAll(),
        ReviewService.getAll(),
      ]);

      const vendorMap = (vendorsRes as any[]).reduce((acc: any, v: any) => {
        acc[v.id] = v.content.rating;
        return acc;
      }, {});

      const reviewMap = (reviewsRes as any[]).reduce((acc: any, r: any) => {
        const foodId = r.content.foodId;
        acc[foodId] = (acc[foodId] || 0) + 1;
        return acc;
      }, {});

      const foods = (foodsRes as any[]).map((f: any) => ({
        docId: f.id,
        ...f.content,
        rating: vendorMap[f.content.vendorId] || 0,
        reviews: reviewMap[f.content.id] || 0,
      }));

      const unique = [...new Set(foods.map((f: any) => f.category))];
      setCategories(unique);
      setLoading(false);
      setFoods(foods);
    };

    fetchAll();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const price = Number(food.price);

    const priceMatch = price >= priceRange[0] && price <= priceRange[1];

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(food.category);

    const searchMatch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.category.toLowerCase().includes(search.toLowerCase());

    return priceMatch && categoryMatch && searchMatch;
  });

  return (
    <div className="lg:col-span-3">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-border 
               bg-background focus:outline-none 
               focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFoods.map((food, index) => (
          <FoodCard key={food.docId} food={food} index={index} />
        ))}
      </div>
    </div>
  );
}
