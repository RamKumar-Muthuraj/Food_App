import { Badge, Button, Card, trendingFoods } from "@/shared";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { motion } from "@/shared";


export default function Trending() {
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
          <Button
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingFoods.map((food, index) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link to={`/food/${food.id}`}>
              <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/20">
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {food.isVeg && (
                      <div className="absolute top-2 right-2 w-4 h-4 border border-accent rounded flex items-center justify-center bg-background/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-1 truncate group-hover:text-primary transition-colors">
                      {food.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {food.restaurant}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs font-semibold">
                          {food.rating}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {food.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {food.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${food.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary">
                        ${food.price}
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
