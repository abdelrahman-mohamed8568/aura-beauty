import "@/styles/products.css";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import EmptySection from "@/app/components/emptySection";
import { ToastContainer } from "react-toastify";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import { CloseButton } from "@/components/ui/close-button";

const ProductsCard = dynamic(() => import("@/app/components/productsCard"), {
  ssr: false,
});
const MemoProductsCard = React.memo(ProductsCard);

const ProductsList = ({
  products,
  currentPage,
  totalPages,
  currentCategory,
  router,
  slideInOut,
  categories,
  FromPath,
}) => {
  const allProducts = useMemo(
    () =>
      products.map((product) => (
        <MemoProductsCard key={product.id} {...product} />
      )),
    [products]
  );

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="productsCards" id="1">
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
      <div className="tabListContainer">
        <DialogRoot>
          <DialogTrigger asChild>
            <button className="menuButton">Category</button>
          </DialogTrigger>
          <DialogContent className="categoriesDialog" data-lenis-prevent>
            <DialogActionTrigger asChild>
              <CloseButton className="closeButton" />
            </DialogActionTrigger>
            <ul className="categoriesList">
              {categories.map((item) => (
                <li key={item} className="categoryItem">
                  <DialogActionTrigger asChild>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/${FromPath}/${item}?page=1`);
                      }}
                      className={
                        currentCategory === item
                          ? "tabText disabledTab"
                          : "tabText"
                      }
                    >
                      {item.replace("-", " ")}
                    </a>
                  </DialogActionTrigger>
                </li>
              ))}
            </ul>
          </DialogContent>
        </DialogRoot>
        <div className="tabList">
          {categories.map((item) => (
            <a
              key={item}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/${FromPath}/${item}?page=1`);
              }}
              className={
                currentCategory === item ? "tabText disabledTab" : "tabText"
              }
            >
              {item.replace("-", " ")}
            </a>
          ))}
        </div>
      </div>
      <div className="productsBox">
        {products.length > 0 ? allProducts : <EmptySection />}
      </div>
      {products.length > 0 && (
        <div className="paginationContainer">
          <a
            onClick={(e) => {
              e.preventDefault();
              router.push(`/${FromPath}/${currentCategory}?page=${prevPage}`);
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
              router.push(`/${FromPath}/${currentCategory}?page=${nextPage}`);
            }}
            className={currentPage === totalPages ? "disabledBtn" : "arrowBtn"}
          >
            →
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
