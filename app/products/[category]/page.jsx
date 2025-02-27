"use client";
import { useState, useEffect } from "react";
import "@/styles/products.css";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@chakra-ui/react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  fetchProducts,
  setPage,
  setCategory,
  selectPaginatedProducts,
  selectTotalPages,
  selectCategories,
} from "@/store/products/productsSlice";
import ProductsCard from "@/app/components/productsCard";
import { usePathname, useSearchParams } from "next/navigation";
import EmptySection from "@/app/components/emptySection";
import { ToastContainer } from "react-toastify";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/app/components/animations";

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
  const categories = useSelector(selectCategories);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pathSegments = pathname.split("/");
  const categoryFromPath = pathSegments[2] || "all";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const initialPage = pageFromURL ? parseInt(pageFromURL, 10) : 1;
    dispatch(setCategory(categoryFromPath));
    dispatch(setPage(initialPage));
    dispatch(fetchProducts());
    const handleScroll = () => {
      const scroll = window.scrollY;
      scroll >= 60 ? setIsScrolled(true) : null;
      scroll <= 20 ? setIsScrolled(false) : null;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageFromURL, categoryFromPath]);

  return (
    <div className="mainContainer">
      <div className="productsContainer">
        <div className="filter">
          <AccordionRoot multiple defaultValue={[""]} className="filterBox">
            <AccordionItem value="1">
              <AccordionItemTrigger>
                <h1>dgdgdfg</h1>
              </AccordionItemTrigger>
              <AccordionItemContent>
                <p>fgbfgbfgbgfbfgbfbfgb</p>
              </AccordionItemContent>
            </AccordionItem>

            <AccordionItem value="2">
              <AccordionItemTrigger>
                <h1>dgdgdfg</h1>
              </AccordionItemTrigger>
              <AccordionItemContent>
                <p>fgbfgbfgbgfbfgbfbfgb</p>
              </AccordionItemContent>
            </AccordionItem>

            <AccordionItem value="3">
              <AccordionItemTrigger>
                <h1>dgdgdfg</h1>
              </AccordionItemTrigger>
              <AccordionItemContent>
                <p>fgbfgbfgbgfbfgbfbfgb</p>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
        <div className="productsCards" id="1">
          <div className={`tabList ${isScrolled ? "hide" : ""}`}>
            {categories.map((item) => (
              <button
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${item}?page=${1}`, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className="tabText"
                disabled={currentCategory === item}
              >
                {item.replace("-", " ")}
              </button>
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${currentCategory}?page=${prevPage}`, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className="arrowBtn"
                disabled={currentPage === 1}
              >
                ←
              </button>
              <div className="pageNumbers">
                <span className="baseNumber">{currentPage}</span>
                <span className="separator">/</span>
                <span className="variableNumber">{totalPages}</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${currentCategory}?page=${nextPage}`, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className="arrowBtn"
                disabled={currentPage === totalPages}
              >
                →
              </button>
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
