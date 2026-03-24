import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge, Button, motion } from "@/shared";

import { FoodService } from "@/service/food.service";
import { Food } from "@/types/Food.types";

type DomoDoc<T> = {
  id: string;
  content: T;
};

export default function HomeSliders() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Food[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = ((await FoodService.getAll()) as DomoDoc<Food>[]) ?? [];

        const flattened = res.map((item) => ({
          docId: item.id,
          ...item.content,
        }));

        console.log(flattened,"flattened");
        

        // only show slider items
        const sliderFoods = flattened.filter((f) => f.isShowAsSlide === "true");

        setSlides(sliderFoods);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSlides();
  }, []);

  if (!slides.length) return null;

  return (
    <section className="relative h-150 overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${
            currentSlide === index ? "z-10" : "z-0"
          }`}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                Premium Quality
              </Badge>

              <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
                {slide.name}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {slide.description}
              </p>

              <div className="flex gap-4">
                <Link to={`/food/${slide.docId}`}>
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-primary to-accent hover:opacity-90 text-lg px-8"
                  >
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/foods">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 text-lg"
                  >
                    Explore Menu
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            title="naviagtion"
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-primary w-8"
                : "bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
