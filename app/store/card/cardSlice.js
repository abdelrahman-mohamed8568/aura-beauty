import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const { id, size, color, minQuantity, quantity, fromPath } =
        action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        const initialQuantity =
          minQuantity && minQuantity > 0 ? minQuantity : 1;
        state.items.push({
          ...action.payload,
          quantity: initialQuantity,
          maxQuantity: quantity,
          fromPath: fromPath,
        });
      }
    },
    removeCard: (state, action) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      );
    },
    plusQuantity: (state, action) => {
      const { id, size, color } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;
      }
    },
    minusQuantity: (state, action) => {
      const { id, size, color } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (item && item.quantity > item.minQuantity) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const getTotalItems = (state) => state.card.items.length;

export const getTotalPrice = (state) =>
  state.card.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const { addToCard, removeCard, plusQuantity, minusQuantity, clearCart } =
  cardSlice.actions;
export default cardSlice.reducer;
