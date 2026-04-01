import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { categories } from "@/data/mockData";

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-14 lg:py-16">
      <div className="text-center mb-8 md:mb-10 lg:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Explore Cuisines
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Discover flavors from around the world
        </p>
      </div>

      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-6 
        xl:grid-cols-8 
        gap-3 md:gap-4
      ">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link to="/foods">
              <Card className="group cursor-pointer overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:scale-[1.03] md:hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                
                <div className="aspect-square h-60 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
                    {/* <div className="text-xl md:text-2xl lg:text-3xl mb-0.5 md:mb-1">
                      {category.icon}
                    </div> */}
                    <h3 className="text-xs md:text-sm font-semibold leading-tight">
                      {category.name}
                    </h3>
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
