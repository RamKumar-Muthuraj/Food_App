import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, UtensilsCrossed } from "lucide-react";

import RelatedItems from "./components/RelatedItems";
import DisplayFood from "./components/DisplayFood";

import { FoodService } from "@/service/food.service";
import { VendorService } from "@/service/vendor.service";
import { Food, Review } from "@/types/Food.types";
import { Vendor } from "@/types/Vendor.types";
import { ReviewService } from "@/service/review.service";
import DomoApi from "@/API/domoAPI";
import { ChefCustomLoader, CollectionName } from "@/shared";

type DomoDoc<T> = { id: string; content: T };

export default function FoodDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [food, setFood] = useState<Food | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [relatedFoods, setRelatedFoods] = useState<Food[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const foodsRes = ((await FoodService.getAll()) as DomoDoc<Food>[]) ?? [];

      const flattenedFoods: Food[] = foodsRes.map((f) => {
        const { docId, ...rest } = f.content as any;
        return { docId: f.id, ...rest };
      });

      const selectedFood = flattenedFoods.find((f) => f.docId === id);
      if (!selectedFood) return;

      setFood(selectedFood);
      fetchReviewData(selectedFood.id);

      if (selectedFood.vendorId) {
        const vendorRes =
          ((await VendorService.getAll()) as DomoDoc<Vendor>[]) ?? [];
        const vendors = vendorRes.map((v) => {
          const { docId, ...rest } = v.content as any;
          return { docId: v.id, ...rest };
        });
        setVendor(
          vendors.find((v) => v.docId === selectedFood.vendorId) || null,
        );
      }

      setRelatedFoods(
        flattenedFoods
          .filter((f) => f.id !== id && f.category === selectedFood.category)
          .slice(0, 3),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewData = async (foodId: string) => {
    try {
      const res = ((await ReviewService.getAll()) as DomoDoc<Review>[]) ?? [];
      const flattened = res.map((r) => ({ docId: r.id, ...r.content }));
      const filtered = flattened.filter((r: any) => r.foodId === foodId);

      const usersRes =
        ((await DomoApi.ListDocuments(
          CollectionName.FOODAPP_USERS,
        )) as DomoDoc<any>[]) ?? [];
      const usersMap = usersRes.reduce((acc: any, u: any) => {
        acc[u.id] = u.content;
        return acc;
      }, {});

      setReviews(
        filtered.map((review: any) => ({
          ...review,
          userName: usersMap[review.userId]
            ? `${usersMap[review.userId].firstName} ${usersMap[review.userId].lastName}`
            : "Anonymous",
        })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  if (loading) {
    return  <ChefCustomLoader />;
  }

  if (!food) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.12 0 0)" }}
      >
        <div className="text-center">
          <p
            className="text-white text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dish not found
          </p>
          <Link
            to="/foods"
            className="text-sm mt-2 block"
            style={{ color: "oklch(0.75 0.18 85)" }}
          >
            ← Browse all foods
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0 0)" }}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs mb-10"
          style={{ color: "oklch(0.45 0 0)" }}
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/foods" className="hover:text-white transition-colors">
            Foods
          </Link>
          <ChevronRight size={12} />
          <span
            style={{ color: "oklch(0.75 0.18 85)" }}
            className="font-semibold truncate max-w-40"
          >
            {food.name}
          </span>
        </motion.nav>

        {/* Main content */}
        <DisplayFood
          food={food}
          reviews={reviews}
          relatedFoods={relatedFoods}
          vendor={vendor}
          quantity={quantity}
          setQuantity={setQuantity}
        />

        {/* Related section */}
        <RelatedItems relatedFoods={relatedFoods} />
      </div>
    </div>
  );
}
