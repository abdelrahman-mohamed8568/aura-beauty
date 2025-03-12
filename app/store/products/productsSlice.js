import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }
      return data.map((product) => ({
        ...product,
        category: product.category || [],
        subCategory: product.subCategory?.toString().trim() || "",
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  currentCategory: "all",
  currentFromPath: "products",
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
    setFromPath: (state, action) => {
      state.currentFromPath = action.payload;
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
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

const selectProductsState = (state) => state.products;

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  (productsState) => {
    const {
      products,
      currentCategory,
      currentFromPath,
      stockFilter,
      priceFilter,
      dateFilter,
    } = productsState;

    let filtered = products.filter((product) => {
      const categoryMatch =
        currentCategory === "all" ||
        product.category.some(
          (c) => c.toLowerCase() === currentCategory.toLowerCase()
        );
      const subCategoryMatch =
        currentFromPath === "products" ||
        product.subCategory.toLowerCase() === currentFromPath.toLowerCase();
      const stockMatch =
        stockFilter === "1"
          ? true
          : stockFilter === "2"
          ? product.store === true
          : product.store === false;
      return categoryMatch && subCategoryMatch && stockMatch;
    });
    if (priceFilter === "2") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceFilter === "3") {
      filtered.sort((a, b) => a.price - b.price);
    }
    if (dateFilter === "1") {
    } else if (dateFilter === "2") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (dateFilter === "3") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }
);
export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectProductsState],
  (filteredProducts, { currentPage, itemsPerPage }) => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }
);

export const selectTotalPages = createSelector(
  [selectFilteredProducts, selectProductsState],
  (filteredProducts, { itemsPerPage }) => {
    return Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  }
);

export const selectCategories = createSelector(
  [selectProductsState],
  ({ products, currentFromPath }) => {
    const categories = products
      .filter(
        (product) =>
          currentFromPath === "products" ||
          product.subCategory.toLowerCase() === currentFromPath.toLowerCase()
      )
      .flatMap((product) => product.category)
      .map((c) => c.toLowerCase());
    return ["all", ...new Set(categories)];
  }
);

export const {
  setPage,
  setCategory,
  setFromPath,
  setStockFilter,
  setPriceFilter,
  setDateFilter,
} = productsSlice.actions;

export default productsSlice.reducer;

export const initializeRealTime = (store) => {
  const channel = supabase
    .channel("products")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      (payload) => {
        store.dispatch(updateProduct(payload.new));
      }
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
};
