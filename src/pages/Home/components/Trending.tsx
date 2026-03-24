import { Badge, Button, Card } from "@/shared";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { motion } from "@/shared";
import { FoodService } from "@/service/food.service";
import { VendorService } from "@/service/vendor.service";
import { useEffect, useState } from "react";
import { Food } from "@/types/Food.types";

type DomoDoc<T> = { id: string; content: T };

export default function Trending() {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      /* fetch foods */
      const foodRes =
        ((await FoodService.getAll()) as DomoDoc<Food>[]) ?? [];

      const flattenedFoods = foodRes.map((f) => ({
        docId: f.id,
        ...f.content,
      }));

      /* fetch vendors */
      const vendorRes =
        ((await VendorService.getAll()) as DomoDoc<any>[]) ?? [];

      const vendors = vendorRes.map((v) => ({
        docId: v.id,
        ...v.content,
      }));

      const vendorMap = vendors.reduce((acc: any, v: any) => {
        acc[v.docId] = v;
        return acc;
      }, {});

      /* trending filter + merge vendor */
      const trending = flattenedFoods
        .filter((f: any) => f.isTrending === "true")
        .map((food: any) => {
          const vendor = vendorMap[food.vendorId];

          const price = Number(food.price);
          const originalPrice = Math.round(price * 1.2); // +20%

          return {
            ...food,
            restaurant: vendor?.name,
            rating: vendor?.rating || "4.0",
            originalPrice,
            discount: "20% OFF",
          };
        });

      setFoods(trending);
    };

    fetchTrending();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <Badge className="mb-4 bg-accent/20 text-accent border-accent">
            <TrendingUp className="w-3 h-3 mr-1" />
            Hot Right Now
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Trending Foods</h2>
          <p className="text-muted-foreground text-lg">
            What everyone's ordering today
          </p>
        </div>

        <Link to="/foods">
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food, index) => (
          <motion.div
            key={food.docId}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link to={`/food/${food.docId}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition">
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />

                    <Badge className="absolute top-2 left-2 text-xs">
                      {food.discount}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold truncate">
                      {food.name}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {food.restaurant}
                    </p>

                    <div className="flex items-center gap-1 my-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs font-semibold">
                        {food.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs line-through text-muted-foreground">
                        ₹{food.originalPrice}
                      </span>

                      <span className="text-lg font-bold text-primary">
                        ₹{food.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}