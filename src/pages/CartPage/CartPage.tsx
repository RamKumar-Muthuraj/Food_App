import { AnimatePresence, motion } from "framer-motion";
import CartItemCard from "./components/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "@/API/currentUserContext";
import { useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "@/store/FoodCart/actions";
import { CartService } from "@/service/cart.service";
import { CollectionName } from "@/shared";
import DomoApi from "@/API/domoAPI";
import { OrderService } from "@/service/order.service";
import { ChevronRight, MapPin, Package } from "lucide-react";
import AddressSelectSheet from "./components/AddressSeatSelection";
import AddressModal from "./components/AddressModel";
import ConfirmModal from "./components/confirmModal";

export default function CartPage() {
  const dispatch = useDispatch();
  const { currentUserId } = useCurrentUser();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addressSelectOpen, setAddressSelectOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cartItems = useSelector(selectCartItems).filter(
    (item: any) => item.userId === currentUserId,
  );

  const total = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const delivery = 20;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + delivery + tax;

  const loadCart = async () => {
    dispatch(clearCart());
    const res: any = await CartService.getAll();
    const mapped = res
      .map((doc: any) => ({
        docId: doc.id,
        id: doc.content.foodId,
        userId: doc.content.userId,
        vendorId: doc.content.vendorId,
        name: doc.content.name,
        price: Number(doc.content.price),
        image: doc.content.image,
        quantity: Number(doc.content.quantity),
        createdAt: doc.content.createdAt,
      }))
      .filter((item: any) => item.userId === currentUserId);
    mapped.forEach((item: any) => dispatch(addToCart(item)));
  };

  const loadAddresses = async () => {
    const res: any = await DomoApi.ListDocuments(
      CollectionName.FOODAPP_ADDRESSES,
    );
    const mapped = res
      .map((doc: any) => ({ docId: doc.id, ...doc.content }))
      .filter((a: any) => a.userId === currentUserId);
    setAddresses(mapped);
    const def = mapped.find((a: any) => a.isDefault === "true");
    setSelectedAddress(def || mapped[0] || null);
  };

  useEffect(() => {
    loadAddresses();
    loadCart();
  }, [currentUserId]);

  const handleSubmitOrder = async () => {
    await OrderService.create({
      id: crypto.randomUUID(),
      userId: currentUserId,
      vendorId: cartItems[0]?.vendorId,
      addressId: selectedAddress?.docId,
      address: JSON.stringify(selectedAddress),
      items: JSON.stringify(cartItems),
      totalAmount: grandTotal.toString(),
      status: "PLACED",
      createdAt: new Date().toISOString(),
    });
    await Promise.all(
      cartItems.map((item: any) => CartService.delete(item.docId)),
    );
    dispatch(clearCart());
    setConfirmOpen(false);
  };

  const handleIncrease = async (item: any) => {
    await CartService.update(item.docId, {
      ...item,
      quantity: item.quantity + 1,
    });
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = async (item: any) => {
    if (item.quantity === 1) return;
    await CartService.update(item.docId, {
      ...item,
      quantity: item.quantity - 1,
    });
    dispatch(decreaseQuantity(item.id));
  };

  const handleRemove = async (item: any) => {
    await CartService.delete(item.docId);
    dispatch(removeFromCart(item.id));
  };

  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0 0)" }}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.75 0.18 85)" }}
          >
            Your Selection
          </p>
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shopping Cart
          </h1>
          {!isEmpty && (
            <p className="text-sm mt-1" style={{ color: "oklch(0.55 0 0)" }}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          )}
        </motion.div>

        {isEmpty ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
              style={{
                background: "oklch(0.18 0 0)",
                border: "1px solid oklch(1 0 0 / 8%)",
              }}
            >
              <Package size={40} style={{ color: "oklch(0.75 0.18 85)" }} />
            </div>
            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your cart is empty
            </h2>
            <p className="text-sm" style={{ color: "oklch(0.5 0 0)" }}>
              Add some delicious items to get started
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* LEFT – ITEMS */}
            <div className="space-y-3">
              <AnimatePresence>
                {cartItems.map((item: any) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* RIGHT – ORDER SUMMARY */}
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="rounded-2xl overflow-hidden lg:sticky lg:top-24"
                style={{
                  background: "oklch(0.18 0 0)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                }}
              >
                {/* Summary Header */}
                <div
                  className="px-6 pt-6 pb-4"
                  style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
                >
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                    style={{ color: "oklch(0.75 0.18 85)" }}
                  >
                    Billing
                  </p>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Order Summary
                  </h3>
                </div>

                <div className="p-6 space-y-3">
                  {[
                    { label: "Subtotal", value: `₹${total}` },
                    { label: "Delivery", value: `₹${delivery}` },
                    { label: "Tax (5%)", value: `₹${tax}` },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between text-sm"
                    >
                      <span style={{ color: "oklch(0.6 0 0)" }}>
                        {row.label}
                      </span>
                      <span className="text-white font-medium">
                        {row.value}
                      </span>
                    </div>
                  ))}

                  <div
                    className="pt-3 mt-1"
                    style={{ borderTop: "1px solid oklch(1 0 0 / 10%)" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Total</span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "oklch(0.75 0.18 85)" }}
                      >
                        ₹{grandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Address Preview */}
                  {selectedAddress && (
                    <div
                      className="rounded-xl p-3 mt-2"
                      style={{
                        background: "oklch(1 0 0 / 4%)",
                        border: "1px solid oklch(1 0 0 / 8%)",
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "oklch(0.75 0.18 85)" }}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-xs font-semibold mb-0.5"
                            style={{ color: "oklch(0.75 0.18 85)" }}
                          >
                            Delivering to
                          </p>
                          <p className="text-xs text-white truncate">
                            {selectedAddress.street}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.55 0 0)" }}
                          >
                            {selectedAddress.city}, {selectedAddress.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-xl text-sm font-bold mt-2 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #ffd700)",
                      color: "oklch(0.15 0 0)",
                    }}
                    onClick={() => setAddressSelectOpen(true)}
                  >
                    Place Order <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Address Select Sheet */}
      <AddressSelectSheet
        open={addressSelectOpen}
        setOpen={setAddressSelectOpen}
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        onAddNew={() => {
          setEditingAddress(null);
          setAddressOpen(true);
        }}
        onEdit={(addr: any) => {
          setEditingAddress(addr);
          setAddressOpen(true);
        }}
        onContinue={() => {
          setAddressSelectOpen(false);
          setConfirmOpen(true);
        }}
      />

      {/* Add/Edit Address Modal */}
      <AddressModal
        open={addressOpen}
        setOpen={setAddressOpen}
        editingAddress={editingAddress}
        setEditingAddress={setEditingAddress}
        currentUserId={currentUserId}
        loadAddresses={loadAddresses}
      />

      {/* Confirm Order Modal */}
      <ConfirmModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        grandTotal={grandTotal}
        handleSubmitOrder={handleSubmitOrder}
        selectedAddress={selectedAddress}
      />
    </div>
  );
}
