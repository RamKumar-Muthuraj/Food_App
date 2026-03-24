import { useEffect, useState } from "react";
import Categories from "./components/Categories";
import ChefRecommendations from "./components/ChefRecommendations";
import CoupenCarousel from "./components/CoupenCarousel";
import Features from "./components/Features";
import HomeSliders from "./components/HomeSliders";
import Trending from "./components/Trending";
import { ChefCustomLoader } from "@/shared";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ChefCustomLoader/>;
  }

  return (
    <div className="min-h-screen">
      <HomeSliders />
      <Categories />
      <CoupenCarousel />
      <Features />
      <ChefRecommendations />
      <Trending />
    </div>
  );
}