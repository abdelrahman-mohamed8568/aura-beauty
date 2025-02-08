import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ تحميل البيانات من ملف JSON
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/products.json");
    const data = await response.json();
    return data || []; // تأكد من أن البيانات مصفوفة حتى لا تكون `undefined`
  }
);

// ✅ الحالة الأولية
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
        state.products = action.payload || []; // تأكد من أن البيانات موجودة
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ تصفية المنتجات بناءً على الفئة
export const selectFilteredProducts = (state) => {
  const { products, currentCategory } = state.products;
  if (!Array.isArray(products)) return []; // تجنب الخطأ إذا لم تكن البيانات موجودة

  return currentCategory === "all"
    ? products
    : products.filter((item) => item.category === currentCategory);
};

// ✅ تحديد المنتجات التي سيتم عرضها في الصفحة الحالية
export const selectPaginatedProducts = (state) => {
  const { currentPage, itemsPerPage } = state.products;
  const filtered = selectFilteredProducts(state);

  if (!Array.isArray(filtered)) return []; // تجنب `undefined`

  const start = (currentPage - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
};

// ✅ حساب إجمالي الصفحات بناءً على المنتجات المصفاة
export const selectTotalPages = (state) => {
  const filtered = selectFilteredProducts(state);
  if (!Array.isArray(filtered) || filtered.length === 0) return 1; // تجنب القسمة على صفر
  return Math.ceil(filtered.length / state.products.itemsPerPage);
};

export const { setPage, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
