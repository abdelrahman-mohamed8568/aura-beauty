"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  fetchProducts,
  setPage,
  setCategory,
  selectPaginatedProducts,
  selectTotalPages,
  selectCategories,
  setStockFilter,
  setPriceFilter,
  setDateFilter,
  setFromPath,
} from "@/store/products/productsSlice";
import { usePathname, useSearchParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/app/components/animations";
import { FilterSection } from "@/appComponents/filter/FilterSection";
import {
  PRICE_OPTIONS,
  STOCK_OPTIONS,
  DATE_OPTIONS,
} from "@/appComponents/filter/filterOptions";
import ProductsList from "@/appComponents/productsList";

function Centers() {
  const router = useTransitionRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageFromURL = searchParams.get("page");
  const currentCategory = pathname.split("/")[2] || "all";

  const { products, totalPages, currentPage } = useSelector(
    (state) => ({
      products: selectPaginatedProducts(state),
      totalPages: selectTotalPages(state),
      currentPage: state.products.currentPage,
    }),
    shallowEqual
  );

  const [stockValue, setStockValue] = useState("1");
  const [priceValue, setPriceValue] = useState("1");
  const [dateValue, setDateValue] = useState("1");

  const categories = useSelector(selectCategories);
  const pathSegments = pathname.split("/");
  const FromPath = pathSegments[1];
  const categoryFromPath = pathSegments[2] || "all";

  useEffect(() => {
    const initialPage = pageFromURL ? parseInt(pageFromURL, 10) : 1;
    dispatch(setFromPath(FromPath));
    dispatch(setCategory(currentCategory));
    dispatch(setPage(initialPage));
    dispatch(setStockFilter("1"));
    dispatch(setPriceFilter("1"));
    dispatch(setDateFilter("1"));
    dispatch(fetchProducts());
  }, [pageFromURL, currentCategory, pathname, dispatch]);

  return (
    <div className="mainContainer">
      <div className="productsContainer">
        <div className="filter">
          <FilterSection
            title="price"
            options={PRICE_OPTIONS}
            value={priceValue}
            onValueChange={(e) => {
              setPriceValue(e.value);
              dispatch(setPriceFilter(e.value));
            }}
          />
          <FilterSection
            title="stock"
            options={STOCK_OPTIONS}
            value={stockValue}
            onValueChange={(e) => {
              setStockValue(e.value);
              dispatch(setStockFilter(e.value));
            }}
          />
          <FilterSection
            title="sort by"
            options={DATE_OPTIONS}
            value={dateValue}
            onValueChange={(e) => {
              setDateValue(e.value);
              dispatch(setDateFilter(e.value));
            }}
          />
        </div>
        <ProductsList
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          currentCategory={currentCategory}
          router={router}
          slideInOut={slideInOut}
          categories={categories}
          FromPath={FromPath}
        />
      </div>
    </div>
  );
}

export default Centers;
