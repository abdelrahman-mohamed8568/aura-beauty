"use client";
import { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setPage,
  setCategory,
  selectPaginatedProducts,
  selectTotalPages,
} from "@/store/products/productsSlice";
import ProductsCard from "@/app/components/productsCard";
import { useRouter, usePathname } from "next/navigation";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectPaginatedProducts);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector((state) => state.products.currentPage);
  const currentCategory = useSelector(
    (state) => state.products.currentCategory
  );

  // الفئات المتاحة
  const tabsItems = [
    { title: "all product", category: "all" },
    { title: "botox", category: "botox" },
    { title: "filler", category: "filler" },
    { title: "facial machines", category: "facial-machines" },
    { title: "laser machines", category: "laser-machines" },
  ];
  // استخراج `category` من `URL` عند تحميل الصفحة

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  const handleTabChange = (category) => {
    dispatch(setCategory(category));
    dispatch(setPage(1));
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

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

        <div className="productsCards">
          <Flex minH="dvh">
            <Tabs.Root value={currentCategory} className="productsCardsBox">
              <Tabs.List className="tabList" borderBottomColor={"#707070"}>
                {tabsItems.map((item) => (
                  <Tabs.Trigger
                    key={item.category}
                    value={item.category}
                    onClick={() => handleTabChange(item.category)}
                    fontWeight="400"
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
                  value={currentCategory}
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
                  {products.map((product) => (
                    <ProductsCard
                      key={product.id}
                      category={product.category}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </Tabs.Content>
              </Box>

              <div className="paginationContainer">
                <button
                  onClick={handlePrev}
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
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="arrowBtn"
                >
                  →
                </button>
              </div>
            </Tabs.Root>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default Products;
