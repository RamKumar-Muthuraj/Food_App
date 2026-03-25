import { Link } from "react-router";
import { Star } from "lucide-react";
import { Card, Badge, Button, motion } from "@/shared";

export default function FoodCard({ food, index }: any) {
  return (
    <motion.div
      key={food.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/food/${food.docId}`}>
        <Card className="group overflow-hidden hover:shadow-xl transition">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4">{food.category}</Badge>
          </div>

          <div className="p-5">
            <h3 className="font-bold">{food.name}</h3>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-sm">{food.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({food.reviews})
              </span>
            </div>

            <div className="flex justify-between mt-3">
              <span className="text-xl font-bold">${food.price}</span>

              <Button size="sm">Add</Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
