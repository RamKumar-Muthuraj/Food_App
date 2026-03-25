import React from 'react'

export default function VegIndicator({
  isVeg,
  className = "",
}: {
  isVeg: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-5 h-5 border-2 rounded items-center justify-center bg-background/90 ${
        isVeg ? "border-green-500" : "border-red-500"
      } ${className}`}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isVeg ? "bg-green-500" : "bg-red-500"
        }`}
      />
    </span>
  );
}
