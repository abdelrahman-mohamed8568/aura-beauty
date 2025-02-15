import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import productsReducer from "./products/productsSlice";
import cardSlice from "@/store/card/cardSlice";
import wishlistSlice from "@/store/wishlist/wishlistSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["card", "wishlist"], // حفظ بيانات `card` و `wishlist` فقط
};

const rootReducer = combineReducers({
  products: productsReducer,
  card: cardSlice, // ✅ تأكد من أن `card` تمت إضافته هنا
  wishlist: wishlistSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
