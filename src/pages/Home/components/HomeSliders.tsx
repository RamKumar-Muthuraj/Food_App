import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomeSliders() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Gourmet Excellence",
      subtitle: "Premium dining experiences delivered to your door",
      image:
        "https://images.unsplash.com/photo-1765268811766-aaa41dac9dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb3VybWV0JTIwZm9vZCUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzc0MDc2MTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Fine Dining at Home",
      subtitle: "Michelin-star quality in every bite",
      image:
        "https://images.unsplash.com/photo-1769773297747-bd00e31b33aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NDA0NDI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Culinary Artistry",
      subtitle: "Where taste meets perfection",
      image:
        "https://images.unsplash.com/photo-1703797967062-70681a18f71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZm9vZCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NzQwNzYxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section className="relative h-150 overflow-hidden">
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${currentSlide === index ? "z-10" : "z-0"}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent"></div>
          </div>
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
                {slide.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {slide.subtitle}
              </p>
              <div className="flex gap-4">
                <Link to="/foods">
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            type="button"
            title="slide Indicators"
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
