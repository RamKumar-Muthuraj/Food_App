import { Star } from 'lucide-react';
import React from 'react'

export default function RatingDisplay({
  rating,
  reviews,
  small = false,
}: {
  rating: number;
  reviews: number;
  small?: boolean;
}) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      <Star
        className={`${small ? "w-3 h-3" : "w-4 h-4"} fill-primary text-primary`}
      />
      <span className={`font-semibold ${small ? "text-xs" : "text-sm"}`}>
        {Number(rating).toFixed(1)}
      </span>
      {reviews > 0 && (
        <span className={`text-muted-foreground ${small ? "text-xs" : "text-xs"}`}>
          ({reviews})
        </span>
      )}
    </div>
  );
}
