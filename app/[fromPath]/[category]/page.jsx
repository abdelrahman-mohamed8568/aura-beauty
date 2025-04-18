"use client";
import "@/styles/products.css";
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
  setCategoryOrder,
} from "@/store/products/productsSlice";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { FilterSection } from "@/appComponents/filter/FilterSection";
import {
  PRICE_OPTIONS,
  STOCK_OPTIONS,
  DATE_OPTIONS,
} from "@/appComponents/filter/filterOptions";
import EmptySection from "@/app/components/common/emptySection";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import { CloseButton } from "@/components/ui/close-button";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ProductsCard = dynamic(
  () => import("@/app/components/common/productsCard"),
  {
    ssr: false,
  }
);
const MemoProductsCard = React.memo(ProductsCard);

function Products() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageFromURL = searchParams.get("page");
  const pathSegments = pathname.split("/").filter(Boolean);
  const FromPath = pathSegments[0] || "products";
  const currentCategory = pathSegments[1]?.replace(/\-/g, " ") || "all";
  const { products, totalPages, currentPage } = useSelector(
    (state) => ({
      products: selectPaginatedProducts(state),
      totalPages: selectTotalPages(state),
      currentPage: state.products.currentPage,
    }),
    shallowEqual
  );
  const [priceValue, setPriceValue] = useState("1");
  const [stockValue, setStockValue] = useState("1");
  const [dateValue, setDateValue] = useState("1");
  const categories = useSelector(selectCategories);
  const Filters = () => (
    <>
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
    </>
  );
  const allProducts = useMemo(
    () =>
      products.map((product) => (
        <MemoProductsCard key={product.id} {...product} />
      )),
    [products]
  );
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  useEffect(() => {
    const initialPage = pageFromURL ? parseInt(pageFromURL, 10) : 1;
    dispatch(setFromPath(FromPath));
    dispatch(setCategory(currentCategory));
    dispatch(setPage(initialPage));
    dispatch(setStockFilter("1"));
    dispatch(setPriceFilter("1"));
    dispatch(setDateFilter("1"));
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    if (FromPath === "products") {
      dispatch(
        setCategoryOrder([
          "bio-stimulators",
          "exosomes",
          "fillers",
          "botox",
          "skin-boosters",
          "mesotherapy",
          "hair-removal-lasers",
          "tattoo-removal-lasers",
          "co2-fractional-lasers",
          "cryolipolysis",
          "hifu",
          "cavitation-fat-reduction",
          "hydrafacial",
          "devices",
        ])
      );
    } else {
      dispatch(setCategoryOrder([]));
    }
  }, [FromPath, currentCategory, pageFromURL, dispatch]);

  return (
    <div className="mainContainer">
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
      <div className="productsContainer">
        <DialogRoot>
          <DialogTrigger asChild>
            <button className="filterBtn">
              <p>Filter</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sliders2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
          </DialogTrigger>
          <DialogContent className="overlayBox" data-lenis-prevent>
            <DialogActionTrigger asChild>
              <div className="hiddenOverlay"></div>
            </DialogActionTrigger>
            <div className="filterDialog">
              <DialogActionTrigger asChild>
                <CloseButton className="closeButton" />
              </DialogActionTrigger>
              <div className="filterContent">
                <Filters />
              </div>
            </div>
          </DialogContent>
        </DialogRoot>
        <div className="filter">
          <Filters />
        </div>
        <div className="productsCards" id="1">
          <div className="tabListContainer">
            <div className="tabList">
              <Swiper
                loop={true}
                easing="ease-in-out"
                speed={2000}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
                className="productsSwiper"
              >
                {categories.map((item, index) => (
                  <SwiperSlide className="productsSwiperSlide" key={index}>
                    <Link
                      href={`/${FromPath}/${item.replace(/ /g, "-")}?page=1`}
                      key={item}
                      className={
                        currentCategory === item
                          ? "tabText disabledTab"
                          : "tabText"
                      }
                    >
                      {item.replace("-", " ")}
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="productsBox">
            {products.length > 0 ? allProducts : <EmptySection />}
          </div>
          {products.length > 0 && (
            <div className="paginationContainer">
              <Link
                href={`/${FromPath}/${currentCategory}?page=${prevPage}`}
                className={currentPage === 1 ? "disabledBtn" : "arrowBtn"}
              >
                ←
              </Link>
              <div className="pageNumbers">
                <span className="baseNumber">{currentPage}</span>
                <span className="separator">/</span>
                <span className="variableNumber">{totalPages}</span>
              </div>
              <Link
                href={`/${FromPath}/${currentCategory}?page=${nextPage}`}
                className={
                  currentPage === totalPages ? "disabledBtn" : "arrowBtn"
                }
              >
                →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
