"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import "@/styles/products.css";
import {
  Box,
  Flex,
  Tabs,
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
} from "@/store/products/productsSlice";
import ProductsCard from "@/app/components/productsCard";
import { usePathname, useRouter } from "next/navigation";
import EmptySection from "@/app/components/emptySection";

function Products() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const currentCategory = pathname.split("/")[2] || "all";

  const { products, totalPages, currentPage } = useSelector(
    (state) => ({
      products: selectPaginatedProducts(state),
      totalPages: selectTotalPages(state),
      currentPage: state.products.currentPage,
    }),
    shallowEqual
  );
  const tabsItems = useMemo(
    () => [
      { title: "all product", category: "all" },
      { title: "botox", category: "botox" },
      { title: "filler", category: "filler" },
      { title: "facial machines", category: "facial-machines" },
      { title: "laser machines", category: "laser-machines" },
    ],
    []
  );
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const handleTabChange = (category) => {
    router.replace(`/products/${category}?page=${1}#1`);
    currentCategory == category && dispatch(setPage(1));
  };
  const handlePrevPage = useCallback(() => {
    router.replace(`/products/${currentCategory}?page=${prevPage}#1`);
    setTimeout(() => {
      dispatch(setPage(prevPage));
    }, 1500);
  });
  const handleNextPage = useCallback(() => {
    router.replace(`/products/${currentCategory}?page=${nextPage}#1`);
    setTimeout(() => {
      dispatch(setPage(nextPage));
    }, 1500);
  });

  const pathSegments = pathname.split("/");
  const categoryFromPath = pathSegments[2] || "all";

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    // تحليل الـ URL وضبط الحالة
    const searchParams = new URLSearchParams(window.location.search);
    const pageFromURL = searchParams.get("page");
    const initialPage = pageFromURL ? parseInt(pageFromURL, 10) : 1;

    // تحديث الفئة إذا تغيرت
    dispatch(setCategory(categoryFromPath));
    dispatch(setPage(initialPage));

    // جلب المنتجات ثم إنهاء التحميل
    dispatch(fetchProducts()).then(() => {
      setIsLoading(false);
    });
  }, [pathname, categoryFromPath]);

  return (
    <div className="mainContainer">
      <div className="productsHeader">
        <div className="productsHeaderText">
          <h1>our products</h1> <h1>our products</h1>
          <h1>our products</h1>
        </div>
        <h3>simplicity of beauty at your fingertips</h3>
      </div>
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
          <Flex minH="dvh">
            <Tabs.Root value={currentCategory} className="productsCardsBox">
              <Tabs.List className="tabList" borderBottomColor={"#707070"}>
                {tabsItems.map((item) => (
                  <Tabs.Trigger
                    key={item.category}
                    onClick={() => handleTabChange(item.category)}
                    value={item.category}
                    className="tabText"
                    _selected={{
                      color: "#707070",
                      fontWeight: "bold",
                    }}
                    transition="all .3s ease"
                  >
                    {item.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Box className="productsGrid">
                <Tabs.Content
                  value={categoryFromPath}
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "1000ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out, ",
                    animationDuration: "1000ms",
                  }}
                  className="productsBox"
                >
                  {isLoading ? (
                    <div className="emptyMessage">Loading...</div>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <ProductsCard key={product.id} {...product} />
                    ))
                  ) : (
                    <EmptySection />
                  )}
                </Tabs.Content>
              </Box>
              {products.length > 0 ? (
                <div className="paginationContainer">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="arrowBtn"
                  >
                    ←
                  </button>
                  <div className="pageNumbers">
                    <span className="baseNumber">{currentPage}</span>
                    <span className="separator">/</span>
                    <span className="variableNumber">{totalPages}</span>
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="arrowBtn"
                  >
                    →
                  </button>
                </div>
              ) : (
                <></>
              )}
            </Tabs.Root>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default Products;
