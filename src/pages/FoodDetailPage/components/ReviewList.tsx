import { Star, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/FormateDate";

type Props = {
  reviews: any[];
};

export default function ReviewList({ reviews }: Props) {
  if (!reviews.length) return null;

  return (
    <div className="relative">
      {/* Horizontal scroll container */}
      <div
        className="flex gap-4 overflow-x-auto pb-3 custom-scroll"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="shrink-0 w-72 rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: "oklch(0.18 0 0)",
              border: "1px solid oklch(1 0 0 / 8%)",
              scrollSnapAlign: "start",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #d4af37, #ffd700)", color: "oklch(0.15 0 0)" }}
                >
                  {(review.userName || "A")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {review.userName || "Anonymous"}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.48 0 0)" }}>
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>

              {/* Rating pill */}
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full shrink-0"
                style={{ background: "oklch(0.75 0.18 85 / 12%)", border: "1px solid oklch(0.75 0.18 85 / 25%)" }}
              >
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold" style={{ color: "oklch(0.75 0.18 85)" }}>
                  {review.rating}
                </span>
              </div>
            </div>

            {/* Stars row */}
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={
                    i < Number(review.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-white/15"
                  }
                />
              ))}
            </div>

            {/* Comment */}
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "oklch(0.62 0 0)" }}
            >
              {review.comment}
            </p>

            {/* Helpful badge */}
            {review.isHelpful === "true" && (
              <div
                className="flex items-center gap-1.5 text-xs font-medium mt-auto pt-2"
                style={{
                  borderTop: "1px solid oklch(1 0 0 / 6%)",
                  color: "oklch(0.6 0 0)",
                }}
              >
                <ThumbsUp size={11} />
                Marked helpful
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fade edge right */}
      <div
        className="absolute top-0 right-0 h-full w-16 pointer-events-none"
        style={{ background: "linear-gradient(to left, oklch(0.12 0 0), transparent)" }}
      />
    </div>
  );
}