import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;