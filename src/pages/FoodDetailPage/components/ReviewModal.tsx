import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Send } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function ReviewFormModal({ open, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isHelpful, setIsHelpful] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    await onSubmit({
      rating: String(rating),
      comment,
      isHelpful: isHelpful ? "true" : "false",
    });
    setSubmitting(false);
    setRating(5);
    setComment("");
    setIsHelpful(false);
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          style={{
            background: "oklch(0.16 0 0)",
            border: "1px solid oklch(1 0 0 / 8%)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 pt-6 pb-5 flex items-start justify-between"
            style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
          >
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: "oklch(0.75 0.18 85)" }}
              >
                Share Your Experience
              </p>
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Write a Review
              </h2>
            </div>
            <button
             title="close"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-colors"
              style={{ background: "oklch(1 0 0 / 6%)" }}
            >
              <X size={15} className="text-white/50" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Star Rating */}
            <div className="space-y-3">
              <label
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <motion.button
                    key={n}
                    whileTap={{ scale: 0.85 }}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                  >
                    <Star
                      size={32}
                      className="transition-all duration-150"
                      style={{
                        fill:
                          n <= (hoverRating || rating)
                            ? "#fbbf24"
                            : "transparent",
                        color:
                          n <= (hoverRating || rating)
                            ? "#fbbf24"
                            : "oklch(1 0 0 / 15%)",
                        filter:
                          n <= (hoverRating || rating)
                            ? "drop-shadow(0 0 6px #fbbf2480)"
                            : "none",
                      }}
                    />
                  </motion.button>
                ))}
                <span
                  className="ml-2 text-sm font-semibold transition-all"
                  style={{ color: "oklch(0.75 0.18 85)" }}
                >
                  {ratingLabels[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Your Review
              </label>
              <textarea
                rows={4}
                placeholder="Tell others what you thought about this dish..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 resize-none outline-none transition-all"
                style={{
                  background: "oklch(1 0 0 / 5%)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "oklch(0.75 0.18 85 / 60%)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "oklch(1 0 0 / 10%)")
                }
              />
              <p
                className="text-xs text-right"
                style={{ color: "oklch(0.4 0 0)" }}
              >
                {comment.length} chars
              </p>
            </div>

            {/* Helpful toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                className="relative w-10 h-5 rounded-full transition-all duration-200"
                style={{
                  background: isHelpful
                    ? "linear-gradient(135deg, #d4af37, #ffd700)"
                    : "oklch(1 0 0 / 12%)",
                }}
                onClick={() => setIsHelpful((p) => !p)}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
                  style={{ left: isHelpful ? "calc(100% - 18px)" : "2px" }}
                />
              </div>
              <span
                className="text-sm font-medium transition-colors"
                style={{
                  color: isHelpful ? "oklch(0.75 0.18 85)" : "oklch(0.6 0 0)",
                }}
              >
                Mark as helpful for others
              </span>
            </label>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: "oklch(1 0 0 / 6%)",
                color: "oklch(0.65 0 0)",
              }}
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={submitting || !comment.trim()}
              className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
              style={{
                background: comment.trim()
                  ? "linear-gradient(135deg, #d4af37, #ffd700)"
                  : "oklch(1 0 0 / 8%)",
                color: comment.trim() ? "oklch(0.15 0 0)" : "oklch(0.4 0 0)",
                opacity: submitting ? 0.7 : 1,
                cursor: comment.trim() ? "pointer" : "not-allowed",
              }}
            >
              <Send size={14} />
              {submitting ? "Submitting…" : "Submit Review"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
