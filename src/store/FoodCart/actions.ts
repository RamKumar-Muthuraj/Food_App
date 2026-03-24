import { cartSlice } from "./reducer";
import { RootState } from "../store";

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) => state.cart.items.length;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (acc: number, item: { price: any; quantity: number }) =>
      acc + Number(item.price) * item.quantity,
    0,
  );
