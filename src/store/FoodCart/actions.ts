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

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

export const selectCartCountByUser = (userId: string) => (state: RootState) =>
  state.cart.items
    .filter((i) => i.userId === userId)
    .reduce((sum, item) => sum + item.quantity, 0);