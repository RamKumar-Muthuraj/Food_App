import { UtensilsCrossed } from 'lucide-react';
import React from 'react'
import { motion } from 'framer-motion';

export function ChefCustomLoader() {
  return (
     <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.12 0 0)" }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #d4af37, #ffd700)" }}
          >
            <UtensilsCrossed size={28} style={{ color: "oklch(0.15 0 0)" }} />
          </div>
          <p
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Loading…
          </p>
        </motion.div>
      </div>
  )
}
