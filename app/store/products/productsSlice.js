import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/products.json");
    const data = await response.json();
    return data || [];
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  currentCategory: "all",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const selectProductsState = (state) => state.products;

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  (productsState) => {
    const { products, currentCategory } = productsState;
    if (!Array.isArray(products)) return [];
    return currentCategory === "all"
      ? products
      : products.filter((item) => item.category === currentCategory);
  }
);

export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectProductsState],
  (filteredProducts, productsState) => {
    const { currentPage, itemsPerPage } = productsState;
    if (!Array.isArray(filteredProducts)) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }
);

export const selectTotalPages = createSelector(
  [selectFilteredProducts, selectProductsState],
  (filteredProducts, productsState) => {
    if (!Array.isArray(filteredProducts) || filteredProducts.length === 0)
      return 1;
    return Math.ceil(filteredProducts.length / productsState.itemsPerPage);
  }
);

export const { setPage, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
