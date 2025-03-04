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
  stockFilter: "1",
  priceFilter: "1",
  dateFilter: "1",
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
    setStockFilter: (state, action) => {
      state.stockFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
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
    const { products, currentCategory, stockFilter, priceFilter, dateFilter } =
      productsState;
    if (!Array.isArray(products)) return [];
    let filtered =
      currentCategory === "all"
        ? products
        : products.filter(
            (product) =>
              product.category.replace(/ /g, "-").toLowerCase() ===
              currentCategory.toLowerCase()
          );
    if (stockFilter === "2") {
      filtered = filtered.filter((product) => product.store === true);
    } else if (stockFilter === "3") {
      filtered = filtered.filter((product) => product.store === false);
    }
    if (priceFilter === "2") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (priceFilter === "3") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }
    if (dateFilter === "2") {
      filtered = [...filtered].reverse();
    }
    return filtered;
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

export const selectCategories = createSelector(
  [selectProductsState],
  (productsState) => {
    const { products } = productsState;
    if (!Array.isArray(products)) return [];
    const categories = products.map((product) =>
      product.category.replace(/ /g, "-")
    );
    const allCategories = [...new Set(categories)];
    return ["all", ...allCategories];
  }
);

export const {
  setPage,
  setCategory,
  setStockFilter,
  setPriceFilter,
  setDateFilter,
} = productsSlice.actions;
export default productsSlice.reducer;
