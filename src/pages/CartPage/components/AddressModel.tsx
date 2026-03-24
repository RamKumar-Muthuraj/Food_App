import { AddressService } from "@/service/address.service";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddressModal({
  open,
  setOpen,
  editingAddress,
  setEditingAddress,
  currentUserId,
  loadAddresses,
}: any) {
  const blank = {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    isDefault: "false",
  };

  const [form, setForm] = useState<any>(blank);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(editingAddress ? { ...editingAddress } : blank);
  }, [editingAddress, open]);

  const handleChange = (e: any) =>
    setForm((p: any) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);

    const payload = { ...form, userId: currentUserId };

    if (editingAddress?.docId) {
      await AddressService.update(editingAddress.docId, payload);
    } else {
      await AddressService.create({
        ...payload,
        id: crypto.randomUUID(),
      });
    }

    await loadAddresses();
    setEditingAddress(null);
    setOpen(false);
    setSaving(false);
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
          onClick={() => {
            setOpen(false);
            setEditingAddress(null);
          }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden
                     bg-neutral-900 border border-white/10"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/10">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-yellow-400 mb-1">
                {editingAddress ? "Edit Address" : "New Address"}
              </div>
              <h2 className="text-xl font-bold text-white font-serif">
                Delivery Location
              </h2>
            </div>

            <button
              title="Close modal"
              className="w-8 h-8 rounded-full flex items-center justify-center
                         bg-white/10 hover:bg-white/20 transition"
              onClick={() => {
                setOpen(false);
                setEditingAddress(null);
              }}
            >
              <X size={16} className="text-white/70" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {[
              {
                label: "Street Address",
                name: "street",
                placeholder: "123 Main Street",
              },
              { label: "City", name: "city", placeholder: "Mumbai" },
              { label: "State", name: "state", placeholder: "Maharashtra" },
              { label: "PIN Code", name: "zip", placeholder: "400001" },
              { label: "Country", name: "country", placeholder: "India" },
            ].map((f) => (
              <div key={f.name} className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                  {f.label}
                </label>

                <input
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white
                             placeholder-white/30 bg-white/5
                             border border-white/10
                             focus:border-yellow-400
                             outline-none transition"
                />
              </div>
            ))}

            {/* Default toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isDefault === "true"}
                onChange={() =>
                  setForm((p: any) => ({
                    ...p,
                    isDefault: p.isDefault === "true" ? "false" : "true",
                  }))
                }
                className="accent-yellow-400 w-4 h-4"
              />

              <span className="text-sm text-white/70">
                Set as default address
              </span>
            </label>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              title="Cancel address"
              className="flex-1 py-3 rounded-xl text-sm font-semibold
                         bg-white/10 text-gray-300 hover:bg-white/20 transition"
              onClick={() => {
                setOpen(false);
                setEditingAddress(null);
              }}
            >
              Cancel
            </button>

            <button
              title="Save address"
              disabled={saving}
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl text-sm font-bold
                         bg-linear-to-br from-yellow-500 to-yellow-300
                         text-black hover:scale-[1.02]
                         disabled:opacity-70 transition"
            >
              {saving
                ? "Saving..."
                : editingAddress
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
