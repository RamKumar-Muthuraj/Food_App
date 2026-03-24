import { Badge, Button, Card, Separator } from "@/shared";
import {
  Clock,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  ChefHat,
  Leaf,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { addToCart, selectCartItems } from "@/store/FoodCart/actions";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "@/API/currentUserContext";
import { CartService } from "@/service/cart.service";
import { ReviewService } from "@/service/review.service";
import ReviewList from "./ReviewList";
import ReviewFormModal from "./ReviewModal";
import { motion } from "framer-motion";

type DisplayFoodProps = {
  food: any;
  reviews: any[];
  relatedFoods: any[];
  vendor: any;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function DisplayFood({
  food,
  reviews,
  relatedFoods,
  vendor,
  quantity,
  setQuantity,
}: DisplayFoodProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isAlreadySelected = cartItems.some((item) => item.id === food.id);
  const { currentUserId } = useCurrentUser();
  const [openReview, setOpenReview] = useState(false);

  const handleAddToCart = async () => {
    const payload = {
      userId: currentUserId,
      foodId: food.id,
      vendorId: food.vendorId,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity,
      createdAt: new Date().toISOString(),
    };
    const res: any = await CartService.create(payload);
    dispatch(addToCart({ docId: res.id, id: food.id, ...payload }));
  };

  const filteredReviews = reviews.filter((r: any) => r.foodId === food.id);

  const handleSubmitReview = async (data: any) => {
    await ReviewService.create({
      id: crypto.randomUUID(),
      userId: currentUserId,
      foodId: food.id,
      rating: data.rating,
      comment: data.comment,
      isHelpful: data.isHelpful,
      createdAt: new Date().toISOString(),
    });
    setOpenReview(false);
  };

  const avgRating =
    filteredReviews.length > 0
      ? filteredReviews.reduce((a: number, r: any) => a + Number(r.rating), 0) /
        filteredReviews.length
      : 4;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {food.isChefRecommended === "true" && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #ffd700)",
                    color: "oklch(0.15 0 0)",
                  }}
                >
                  <ChefHat size={12} /> Chef's Pick
                </span>
              )}
              {food.isVeg === "true" && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
                  <Leaf size={12} /> Veg
                </span>
              )}
            </div>

            {/* Price tag on image */}
            <div
              className="absolute bottom-4 right-4 px-4 py-2 rounded-2xl"
              style={{
                background: "oklch(0.12 0 0 / 85%)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(1 0 0 / 15%)",
              }}
            >
              <span
                className="text-2xl font-bold"
                style={{ color: "oklch(0.75 0.18 85)" }}
              >
                ₹{food.price}
              </span>
            </div>
          </motion.div>

          {/* Food Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                  style={{ color: "oklch(0.75 0.18 85)" }}
                >
                  {food.category}
                </span>
                <h1
                  className="text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {food.name}
                </h1>
              </div>
            </div>

            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.62 0 0)" }}
            >
              {food.description}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.round(avgRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/20"
                    }
                  />
                ))}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.6 0 0)" }}
              >
                {avgRating.toFixed(1)} · {filteredReviews.length} reviews
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }} />

          {/* Quantity + Cart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-5 flex-wrap">
              {/* Qty control */}
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: "oklch(0.18 0 0)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                }}
              >
                <button
                  title="decrease"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: "oklch(1 0 0 / 8%)",
                    opacity: quantity === 1 ? 0.35 : 1,
                  }}
                >
                  <Minus size={14} className="text-white" />
                </button>
                <span className="text-xl font-bold w-8 text-center text-white">
                  {quantity}
                </span>
                <button
                  title="increase"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #ffd700)",
                  }}
                >
                  <Plus size={14} style={{ color: "oklch(0.15 0 0)" }} />
                </button>
              </div>

              {/* Sub-total */}
              <div className="flex-1 text-right">
                <p
                  className="text-xs uppercase tracking-widest mb-0.5"
                  style={{ color: "oklch(0.5 0 0)" }}
                >
                  Total
                </p>
                <span
                  className="text-3xl font-bold"
                  style={{
                    color: "oklch(0.75 0.18 85)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  ₹{(Number(food.price) * quantity).toFixed(0)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all"
              style={
                isAlreadySelected
                  ? {
                      background: "oklch(0.22 0 0)",
                      color: "oklch(0.75 0.18 85)",
                      border: "2px solid oklch(0.75 0.18 85 / 40%)",
                    }
                  : {
                      background: "linear-gradient(135deg, #d4af37, #ffd700)",
                      color: "oklch(0.15 0 0)",
                    }
              }
            >
              <ShoppingCart size={20} />
              {isAlreadySelected ? "Already in Cart ✓" : "Add to Cart"}
            </motion.button>
          </motion.div>

          {/* Related Foods inline */}
          {relatedFoods.length > 0 && (
            <div className="space-y-4">
              <div
                style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
                className="pt-8"
              >
                <h2
                  className="text-2xl font-bold text-white mb-5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  From the Same Kitchen
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedFoods.slice(0, 4).map((item) => (
                    <Link key={item.id} to={`/food/${item.id}`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex gap-4 p-3 rounded-2xl transition-all"
                        style={{
                          background: "oklch(0.18 0 0)",
                          border: "1px solid oklch(1 0 0 / 8%)",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white truncate text-sm">
                            {item.name}
                          </h4>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "oklch(0.5 0 0)" }}
                          >
                            {item.category}
                          </p>
                          <p
                            className="text-sm font-bold mt-1"
                            style={{ color: "oklch(0.75 0.18 85)" }}
                          >
                            ₹{item.price}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-24 lg:h-fit">
          {/* Vendor Card */}
          {vendor && (
            <Link to={`/vendor/${vendor.docId}`}>
              <motion.div
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "oklch(0.18 0 0)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                }}
              >
                {/* Vendor image */}
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                  {/* Rating pill */}
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.12 0 0 / 80%)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-white">
                      {vendor.rating}
                    </span>
                  </div>

                  {/* Name on image */}
                  <div className="absolute bottom-3 left-4">
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                      style={{ color: "oklch(0.75 0.18 85)" }}
                    >
                      Restaurant
                    </p>
                    <h3
                      className="text-lg font-bold text-white leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {vendor.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs" style={{ color: "oklch(0.55 0 0)" }}>
                    {vendor.type}
                  </p>

                  <div
                    style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
                    className="pt-3 space-y-2"
                  >
                    <div
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: "oklch(0.6 0 0)" }}
                    >
                      <MapPin
                        size={14}
                        style={{ color: "oklch(0.75 0.18 85)" }}
                      />
                      <span className="truncate">{vendor.location}</span>
                    </div>
                    <div
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: "oklch(0.6 0 0)" }}
                    >
                      <Clock
                        size={14}
                        style={{ color: "oklch(0.75 0.18 85)" }}
                      />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Reviews Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-5"
            style={{
              background: "oklch(0.18 0 0)",
              border: "1px solid oklch(1 0 0 / 8%)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                  style={{ color: "oklch(0.75 0.18 85)" }}
                >
                  Community
                </p>
                <h3
                  className="font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Reviews
                </h3>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenReview(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #ffd700)",
                  color: "oklch(0.15 0 0)",
                }}
              >
                <Plus size={12} /> Write Review
              </motion.button>
            </div>

            {/* Mini stats */}
            <div
              className="rounded-xl p-3 flex items-center gap-4"
              style={{
                background: "oklch(1 0 0 / 4%)",
                border: "1px solid oklch(1 0 0 / 6%)",
              }}
            >
              <div className="text-center">
                <p
                  className="text-3xl font-bold"
                  style={{
                    color: "oklch(0.75 0.18 85)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {avgRating.toFixed(1)}
                </p>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={
                        i < Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/15"
                      }
                    />
                  ))}
                </div>
              </div>
              <div
                style={{ borderLeft: "1px solid oklch(1 0 0 / 8%)" }}
                className="pl-4"
              >
                <p className="text-lg font-bold text-white">
                  {filteredReviews.length}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.5 0 0)" }}>
                  Total reviews
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── REVIEWS ROW ── */}
      {filteredReviews.length > 0 && (
        <div
          className="pt-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What People Say
            </h2>
            <span className="text-sm" style={{ color: "oklch(0.5 0 0)" }}>
              {filteredReviews.length} reviews
            </span>
          </div>
          <ReviewList reviews={filteredReviews} />
        </div>
      )}

      <ReviewFormModal
        open={openReview}
        onClose={() => setOpenReview(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
