import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Leaf, TrendingUp, ChefHat, ArrowRight } from "lucide-react";
import { Food } from "@/types/Food.types";

type RelatedFoodProps = {
  relatedFoods: Food[];
};

export default function RelatedItems({ relatedFoods }: RelatedFoodProps) {
  if (!relatedFoods.length) return null;

  return (
    <section className="mt-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.75 0.18 85)" }}>
            Curated for You
          </p>
          <h2 className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            You May Also Like
          </h2>
        </div>
        <span className="text-sm pb-1" style={{ color: "oklch(0.45 0 0)" }}>
          {relatedFoods.length} dishes
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedFoods.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            viewport={{ once: true }}
          >
            <Link to={`/food/${item.id}`}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-3xl overflow-hidden h-full"
                style={{
                  background: "oklch(0.18 0 0)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  boxShadow: "0 4px 24px oklch(0 0 0 / 20%)",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    style={{ transition: "transform 0.5s ease" }}
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "oklch(0.12 0 0 / 80%)", backdropFilter: "blur(8px)", color: "oklch(0.75 0.18 85)", border: "1px solid oklch(0.75 0.18 85 / 30%)" }}>
                    {item.category}
                  </div>

                  {/* Veg badge */}
                  {item.isVeg === "true" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white"
                      style={{ backdropFilter: "blur(8px)" }}>
                      <Leaf size={10} /> Veg
                    </div>
                  )}

                  {/* Price on image bottom */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #d4af37, #ffd700)", color: "oklch(0.15 0 0)" }}>
                    ₹{item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.name}
                  </h3>

                  {/* Tags row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.isTrending === "true" && (
                      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: "oklch(0.75 0.18 85 / 12%)", color: "oklch(0.75 0.18 85)", border: "1px solid oklch(0.75 0.18 85 / 25%)" }}>
                        <TrendingUp size={10} /> Trending
                      </span>
                    )}
                    {item.isChefRecommended === "true" && (
                      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: "oklch(1 0 0 / 6%)", color: "oklch(0.65 0 0)", border: "1px solid oklch(1 0 0 / 10%)" }}>
                        <ChefHat size={10} /> Chef Pick
                      </span>
                    )}

                    {/* Arrow CTA on hover */}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowRight size={16} style={{ color: "oklch(0.75 0.18 85)" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}