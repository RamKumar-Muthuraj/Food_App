import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { categories } from "@/data/mockData";

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Explore Cuisines</h2>
        <p className="text-muted-foreground text-lg">
          Discover flavors from around the world
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link to="/foods">
              <Card className="group cursor-pointer overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <div className="text-3xl mb-1">{category.icon}</div>
                    <h3 className="font-semibold">{category.name}</h3>
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
