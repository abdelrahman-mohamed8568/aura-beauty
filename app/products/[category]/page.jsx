"use client";
import { useState, useEffect, useMemo } from "react";
import "@/styles/products.css";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
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
} from "@/store/products/productsSlice";
import ProductsCard from "@/app/components/productsCard";
import { usePathname, useSearchParams } from "next/navigation";
import EmptySection from "@/app/components/emptySection";
import { ToastContainer } from "react-toastify";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/app/components/animations";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";

function Products() {
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
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pathSegments = pathname.split("/");
  const categoryFromPath = pathSegments[2] || "all";

  useEffect(() => {
    const initialPage = pageFromURL ? parseInt(pageFromURL, 10) : 1;
    dispatch(setCategory(categoryFromPath));
    dispatch(setPage(initialPage));
    dispatch(fetchProducts());
  }, [pageFromURL, categoryFromPath]);

  return (
    <div className="mainContainer">
      <div className="productsContainer">
        <div className="filter">
          <AccordionRoot collapsible variant="plain" className="filterBox">
            <AccordionItem>
              <AccordionItemTrigger className="filterText">
                price
              </AccordionItemTrigger>
              <AccordionItemContent>
                <RadioCardRoot
                  value={priceValue}
                  onValueChange={(e) => {
                    setPriceValue(e.value);
                    dispatch(setPriceFilter(e.value));
                  }}
                  orientation="vertical"
                >
                  <RadioCardItem
                    value="1"
                    indicator={false}
                    label={"default"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                  <RadioCardItem
                    value="2"
                    indicator={false}
                    label={"high to low"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                  <RadioCardItem
                    value="3"
                    indicator={false}
                    label={"low to high"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                </RadioCardRoot>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
          <AccordionRoot collapsible variant="plain" className="filterBox">
            <AccordionItem>
              <AccordionItemTrigger className="filterText">
                stock
              </AccordionItemTrigger>
              <AccordionItemContent>
                <RadioCardRoot
                  value={stockValue}
                  onValueChange={(e) => {
                    setStockValue(e.value);
                    dispatch(setStockFilter(e.value));
                  }}
                  orientation="vertical"
                >
                  <RadioCardItem
                    value="1"
                    indicator={false}
                    label={"default"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                  <RadioCardItem
                    value="2"
                    indicator={false}
                    label={"stock"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                  <RadioCardItem
                    value="3"
                    indicator={false}
                    label={"out of stock"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                </RadioCardRoot>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
          <AccordionRoot collapsible variant="plain" className="filterBox">
            <AccordionItem>
              <AccordionItemTrigger className="filterText">
                date
              </AccordionItemTrigger>
              <AccordionItemContent>
                <RadioCardRoot
                  value={dateValue}
                  onValueChange={(e) => {
                    setDateValue(e.value);
                    dispatch(setDateFilter(e.value));
                  }}
                  orientation="vertical"
                >
                  <RadioCardItem
                    value="1"
                    indicator={false}
                    label={"old to new"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                  <RadioCardItem
                    value="2"
                    indicator={false}
                    label={"new to old"}
                    className="filterRadioCard"
                    _checked={{
                      borderColor: "#d5ab42",
                      color: "#d5ab42",
                    }}
                  />
                </RadioCardRoot>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
        <div className="productsCards" id="1">
          <div className="tabList">
            {categories.map((item) => (
              <a
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${item}?page=${1}`, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className={
                  currentCategory === item ? "tabText disabledTab" : "tabText"
                }
              >
                {item.replace("-", " ")}
              </a>
            ))}
          </div>
          <div className="productsBox">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductsCard key={product.id} {...product} />
              ))
            ) : (
              <EmptySection />
            )}
          </div>
          {products.length > 0 ? (
            <div className="paginationContainer">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${currentCategory}?page=${prevPage}`, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className={currentPage === 1 ? "disabledBtn" : "arrowBtn"}
              >
                ←
              </a>
              <div className="pageNumbers">
                <span className="baseNumber">{currentPage}</span>
                <span className="separator">/</span>
                <span className="variableNumber">{totalPages}</span>
              </div>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${currentCategory}?page=${nextPage}`, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className={
                  currentPage === totalPages ? "disabledBtn" : "arrowBtn"
                }
              >
                →
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
        theme="dark"
      />
    </div>
  );
}

export default Products;
