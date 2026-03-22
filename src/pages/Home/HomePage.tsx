import { Link } from "react-router-dom";
import {
  Star,
  Clock,
  TrendingUp,
  ChefHat,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  categories,
  featuredRestaurants,
  trendingFoods,
  coupons,
} from "@/data/mockData";

export default function HomePage() {
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
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
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

      {/* Categories */}
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

      {/* Coupons Carousel */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Exclusive Offers</h2>
          <p className="text-muted-foreground text-lg">
            Limited time deals just for you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/20 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/20 to-accent/20 rounded-full -mr-16 -mt-16"></div>
                <div className="p-6">
                  <Badge className="mb-3 bg-linear-to-r from-primary to-accent">
                    {coupon.discount}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{coupon.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {coupon.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      Min order: ${coupon.minOrder}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Expires: {coupon.expiry}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-primary/20">
                    <code className="text-primary font-bold text-lg">
                      {coupon.code}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-primary/10"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
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
          {featuredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/vendor/${restaurant.id}`}>
                <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/20">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-linear-to-r from-primary to-accent">
                      {restaurant.badge}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {restaurant.cuisine}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-semibold">
                          {restaurant.rating}
                        </span>
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

      {/* Chef Recommendations */}
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
          {trendingFoods.slice(0, 3).map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/food/${food.id}`}>
                <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/20">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-linear-to-r from-primary to-accent">
                      {food.badge}
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

      {/* Trending Now */}
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
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
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
    </div>
  );
}
