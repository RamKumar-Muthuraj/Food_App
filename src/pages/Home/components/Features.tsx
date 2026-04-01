import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredRestaurants } from "@/data/mockData";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VendorService } from "@/service/vendor.service";
import { Vendor } from "@/types/Vendor.types";
import { ReviewService } from "@/service/review.service";
import { FoodService } from "@/service/food.service";

type DomoDoc<T> = { id: string; content: T };
export default function Features() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

 useEffect(() => {
  const fetchAll = async () => {
    const [vendorRes, foodRes, reviewRes] = await Promise.all([
      VendorService.getAll(),
      FoodService.getAll(),
      ReviewService.getAll(),
    ]);

    // map foodId -> vendorId
    const foodVendorMap = (foodRes as any[]).reduce((acc: any, f: any) => {
      acc[f.content.id] = f.content.vendorId;
      return acc;
    }, {});

    // count reviews per vendor
    const vendorReviewCount = (reviewRes as any[]).reduce(
      (acc: any, r: any) => {
        const foodId = r.content.foodId;
        const vendorId = foodVendorMap[foodId];

        if (vendorId) {
          acc[vendorId] = (acc[vendorId] || 0) + 1;
        }

        return acc;
      },
      {}
    );

    // vendors
    const flattened = (vendorRes as any[]).map((v: any) => ({
      docId: v.id,
      ...v.content,
    }));

    const top = flattened
      .filter((v: any) => v.isTopChoice === "true")
      .map((v: any) => ({
        ...v,
        reviews: vendorReviewCount[v.docId] || 0,
      }));

    setVendors(top);
  };

  fetchAll();
}, []);

console.log(vendors);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">Featured Restaurants</h2>
          <p className="text-muted-foreground text-lg">
            Premium partners delivering excellence
          </p>
        </div>
        <Link to="/foods">
          <Button
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vendors.map((restaurant, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link to={`/vendor/${restaurant.docId}`}>
              <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/20">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-linear-to-r from-primary to-accent">
                    {restaurant.type}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {restaurant.location}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-muted-foreground">
                        ({restaurant.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
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
