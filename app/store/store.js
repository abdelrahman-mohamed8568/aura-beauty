import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
// import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
