import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addHeart(state, action) {
      state.items.push(action.payload);
    },
    removeHeart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addHeart, removeHeart } = wishlistSlice.actions;
export default wishlistSlice.reducer;
