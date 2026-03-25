import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trendingFoods } from "@/data/mockData";
import { ChefHat, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FoodService } from "@/service/food.service";
import { Food, Review } from "@/types/Food.types";
import { VendorService } from "@/service/vendor.service";
import { Vendor } from "@/types/Vendor.types";
import { ReviewService } from "@/service/review.service";
type DomoDoc<T> = { id: string; content: T };
export default function ChefRecommendations() {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
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

      const foods = (foodsRes as any[])
        .map((f: any) => ({
          ...f.content,
          rating: vendorMap[f.content.vendorId] || 0,
          reviews: reviewMap[f.content.id] || 0,
        }))
        .filter((f: any) => f.isChefRecommended === "true");

      setFoods(foods);
    };

    fetchAll();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary">
          <ChefHat className="w-3 h-3 mr-1" />
          Chef's Choice
        </Badge>
        <h2 className="text-4xl font-bold mb-4">Curated by Our Chefs</h2>
        <p className="text-muted-foreground text-lg">
          Handpicked dishes that define culinary excellence
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.slice(0, 3).map((food, index) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link to={`/food/${food.docId}`}>
              <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/20">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-linear-to-r from-primary to-accent">
                    {food.category}
                  </Badge>
                  {food.isVeg && (
                    <div className="absolute top-4 right-4 w-6 h-6 border-2 border-accent rounded flex items-center justify-center bg-background/80">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {food.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {food.restaurant}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-sm">
                        {food.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({food.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {food.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${food.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-bold text-primary">
                        ${food.price}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
