import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          maxQuantity: action.payload.quantity, // نأخذ القيمة من البيانات المرسلة
        });
      }
    },
    removeCard: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    plusQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;
      }
    },
    minusQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const getTotalItems = (state) => state.card.items.length;

export const getTotalPrice = (state) =>
  state.card.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const { addToCard, removeCard, plusQuantity, minusQuantity } =
  cardSlice.actions;
export default cardSlice.reducer;
