import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, MapPin, Pencil, X } from "lucide-react";

export default function AddressSelectSheet({
  open,
  setOpen,
  addresses,
  selectedAddress,
  setSelectedAddress,
  onAddNew,
  onEdit,
  onContinue,
}: any) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Sheet */}
        <motion.div
          className="relative z-10 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl 
                     overflow-hidden bg-neutral-900 border border-white/10
                     max-h-[90vh]"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="px-6 pt-4 pb-4 flex items-center justify-between border-b border-white/10">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-yellow-400 mb-0.5">
                Step 1 of 2
              </div>
              <h2 className="text-xl font-bold text-white font-serif">
                Select Address
              </h2>
            </div>

            <button
              title="Close address selector"
              className="w-8 h-8 rounded-full flex items-center justify-center
                         bg-white/10 hover:bg-white/20 transition"
              onClick={() => setOpen(false)}
            >
              <X size={16} className="text-white/60" />
            </button>
          </div>

          {/* Address List */}
          <div className="overflow-y-auto p-4 space-y-3 max-h-[50vh]">
            {addresses.length === 0 ? (
              <div className="text-center py-10">
                <MapPin
                  size={32}
                  className="mx-auto mb-3 opacity-30 text-white"
                />
                <p className="text-sm text-gray-400">
                  No addresses saved yet
                </p>
              </div>
            ) : (
              addresses.map((addr: any) => {
                const selected =
                  selectedAddress?.docId === addr.docId;

                return (
                  <motion.div
                    key={addr.docId}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl p-4 cursor-pointer transition-all 
                               flex items-start gap-3 border
                               ${
                                 selected
                                   ? "bg-yellow-500/10 border-yellow-400/60"
                                   : "bg-white/5 border-white/10 hover:bg-white/10"
                               }`}
                    onClick={() => setSelectedAddress(addr)}
                  >
                    {/* Radio */}
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center 
                                  justify-center shrink-0 border-2
                                  ${
                                    selected
                                      ? "border-none bg-linear-to-br from-yellow-500 to-yellow-300"
                                      : "border-white/30"
                                  }`}
                    >
                      {selected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="font-semibold text-sm text-white truncate">
                          {addr.street}
                        </p>

                        {addr.isDefault === "true" && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full 
                                       font-semibold shrink-0
                                       bg-linear-to-br from-yellow-500 to-yellow-300
                                       text-black"
                          >
                            Primary
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-400">
                        {addr.city}, {addr.state} · {addr.zip}
                      </p>
                    </div>

                    {/* Edit */}
                    <button
                      title="Edit address"
                      className="shrink-0 w-8 h-8 flex items-center justify-center
                                 rounded-lg bg-white/10 hover:bg-white/20 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(addr);
                      }}
                    >
                      <Pencil size={14} className="text-yellow-400" />
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 space-y-3 border-t border-white/10">
            <button
              title="Add new address"
              className="w-full py-3 rounded-xl text-sm font-semibold
                         bg-white/10 border border-dashed border-yellow-400/40
                         text-yellow-400 hover:bg-white/20 transition"
              onClick={onAddNew}
            >
              + Add New Address
            </button>

            <button
              title="Continue to payment"
              disabled={!selectedAddress}
              onClick={onContinue}
              className={`w-full py-3 rounded-xl text-sm font-bold
                          flex items-center justify-center gap-2 transition
                          ${
                            selectedAddress
                              ? "bg-linear-to-br from-yellow-500 to-yellow-300 text-black"
                              : "bg-white/10 text-gray-500 cursor-not-allowed"
                          }`}
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}