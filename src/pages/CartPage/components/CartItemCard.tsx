import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <div className="bg-neutral-900 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
        {/* Image */}
        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate font-serif">
            {item.name}
          </h3>

          <p className="text-sm text-yellow-400 mt-0.5">₹{item.price}</p>

          {/* Qty controls */}
          <div className="flex items-center gap-2 mt-2.5">
            <button
              title="decrease"
              onClick={() => onDecrease(item)}
              disabled={item.quantity === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center 
                         bg-white/10 border border-white/10 
                         disabled:opacity-30 hover:bg-white/20 transition"
            >
              <Minus size={12} className="text-white" />
            </button>

            <span className="w-8 text-center text-sm font-bold text-white">
              {item.quantity}
            </span>

            <button
              title="increase"
              onClick={() => onIncrease(item)}
              className="w-7 h-7 rounded-lg flex items-center justify-center
                         bg-linear-to-br from-yellow-500 to-yellow-300
                         text-black hover:scale-105 transition"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end justify-between h-20 shrink-0">
          <button
            title="remove"
            onClick={() => onRemove(item)}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       bg-red-500/10 border border-red-500/30
                       hover:bg-red-500/20 transition"
          >
            <Trash2 size={14} className="text-red-400" />
          </button>

          <span className="font-bold text-base text-white">
            ₹{item.quantity * item.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
