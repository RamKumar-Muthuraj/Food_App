import { cartSlice } from "./reducer";
import { RootState } from "../store";

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (acc: number, item: { price: any; quantity: number }) =>
      acc + Number(item.price) * item.quantity,
    0,
  );

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
