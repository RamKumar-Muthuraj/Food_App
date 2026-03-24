import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MapPin, Package } from "lucide-react";
import { useState } from "react";

export default function ConfirmModal({
  open,
  setOpen,
  grandTotal,
  handleSubmitOrder,
  selectedAddress,
}: any) {
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  const onPlace = async () => {
    setPlacing(true);
    await handleSubmitOrder();
    setPlacing(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, 2200);
  };

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
          onClick={() => !placing && setOpen(false)}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden
                     bg-neutral-900 border border-white/10 text-center"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
        >
          {done ? (
            <motion.div
              className="p-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <CheckCircle2 size={64} className="text-yellow-400" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white font-serif">
                Order Placed!
              </h2>

              <p className="text-sm text-gray-400">
                Your order of ₹{grandTotal} is on its way.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="px-8 pt-8 pb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center
                             mx-auto mb-4 bg-linear-to-br from-yellow-500 to-yellow-300"
                >
                  <Package size={28} className="text-black" />
                </div>

                <h2 className="text-2xl font-bold text-white font-serif mb-2">
                  Confirm Order
                </h2>

                <p className="text-sm text-gray-400">
                  Review your order details before placing
                </p>
              </div>

              {/* Summary */}
              <div className="mx-6 mb-5 rounded-xl p-4 text-left space-y-2 bg-white/5 border border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Grand Total</span>
                  <span className="font-bold text-yellow-400">
                    ₹{grandTotal}
                  </span>
                </div>

                {selectedAddress && (
                  <div className="flex gap-2 pt-1 border-t border-white/10">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-yellow-400"
                    />

                    <p className="text-xs leading-snug text-gray-400">
                      {selectedAddress.street},{" "}
                      {selectedAddress.city},{" "}
                      {selectedAddress.state} —{" "}
                      {selectedAddress.zip}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  title="Go back"
                  className="flex-1 py-3 rounded-xl text-sm font-semibold
                             bg-white/10 text-gray-300 hover:bg-white/20 transition"
                  onClick={() => setOpen(false)}
                  disabled={placing}
                >
                  Back
                </button>

                <button
                  title="Confirm order"
                  onClick={onPlace}
                  disabled={placing}
                  className="flex-1 py-3 rounded-xl text-sm font-bold
                             bg-linear-to-br from-yellow-500 to-yellow-300
                             text-black hover:scale-[1.02]
                             disabled:opacity-70 transition"
                >
                  {placing ? "Placing..." : "Place Order →"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}