import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard(state, action) {
      state.items.push(action.payload);
    },
    removeCard(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

const getTotal = createSelector(
  (state) => state.card.items,
  (items) => {
    const total = Object.keys(items).reduce((acc) => acc + 1, 0);
    return total;
  }
);

export { getTotal };
export const { addToCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
