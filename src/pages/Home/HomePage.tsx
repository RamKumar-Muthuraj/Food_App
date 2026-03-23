import Categories from "./components/Categories";
import ChefRecommendations from "./components/ChefRecommendations";
import CoupenCarousel from "./components/CoupenCarousel";
import Features from "./components/Features";
import HomeSliders from "./components/HomeSliders";
import Trending from "./components/Trending";

export default function HomePage() {
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
