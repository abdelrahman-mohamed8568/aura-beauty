"use client";
import "@/styles/productDetails.css";
import { useEffect, useMemo, useCallback, useState } from "react";
import { fetchProducts } from "@/app/store/products/productsSlice";
import { addToCard, removeCard } from "@/store/card/cardSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import { Badge, Stack } from "@chakra-ui/react";
import { HiAtSymbol, HiStar } from "react-icons/hi";
import Subtitle from "@/app/components/subtitle";
import Link from "next/link";
import { addHeart, removeHeart } from "@/app/store/wishlist/wishlistSlice";

function ProductDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params?.productDetails;
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [total, setTotal] = useState(0);

  const products = useSelector(
    (state) => state.products.products || [],
    shallowEqual
  );
  const status = useSelector(
    (state) => state.products.status || [],
    shallowEqual
  );
  const cardItems = useSelector(
    (state) => state.card?.items || [],
    shallowEqual
  );
  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || [],
    shallowEqual
  );
  const itemsId = cardItems.map((item) => item.id).toString();
  const fetchProductsData = useCallback(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const selectedProduct = useMemo(() => {
    return (
      products.find((product) => product.id.toString() === productId) || null
    );
  }, [products, productId]);
  const [mainImage, setMainImage] = useState(selectedProduct?.cover || "");
  const handleImageClick = () => {
    document.body.style.position = "fixed";
    setIsZoomed(true);
  };

  const handleClose = () => {
    document.body.style.position = "";
    setIsZoomed(false);
  };

  useEffect(() => {
    fetchProductsData();
    itemsId.includes(productId) && setIsAdded(true);
    setActiveHeart(isProductInWishlist);
  }, [fetchProductsData, cardItems, wishlistItems, selectedProduct]);

  const isProductInWishlist = wishlistItems.some(
    (item) => item.id === selectedProduct?.id
  );

  const [activeHeart, setActiveHeart] = useState(false);

  const heartHandler = () => {
    if (activeHeart) {
      dispatch(removeHeart(selectedProduct.id));
    } else {
      dispatch(addHeart(selectedProduct));
    }
    setActiveHeart(!activeHeart);
  };

  const addToCardHandler = (selectedProduct) => {
    dispatch(addToCard(selectedProduct));
    setIsAdded(true);
  };

  return (
    <div className="mainContainer">
      <div className="productContainer">
        {selectedProduct && (
          <>
            <Subtitle
              category={selectedProduct.category}
              name={selectedProduct.name}
            />
            <div className="productBox">
              <div className="productCover">
                <div className="sideImages">
                  {[
                    selectedProduct.cover,
                    selectedProduct.img1,
                    selectedProduct.img2,
                  ].map(
                    (img, index) =>
                      img && (
                        <Image
                          key={index}
                          src={img}
                          alt={selectedProduct.name}
                          width={90}
                          height={90}
                          onClick={() => setMainImage(img)}
                          className={
                            mainImage == img ? "selectedImage" : "sideImage"
                          }
                          {...(index === 0 &&
                            !mainImage && { className: "selectedImage" })}
                        />
                      )
                  )}
                </div>
                <div className="mainImage">
                  <Image
                    src={mainImage || selectedProduct.cover}
                    alt={selectedProduct.name}
                    width={500}
                    height={500}
                    onClick={handleImageClick}
                    className="thumbnail"
                  />
                  {isZoomed && (
                    <div className="overlay" onClick={handleClose}>
                      <Image
                        src={mainImage || selectedProduct.cover}
                        alt={selectedProduct.name}
                        width={600}
                        height={600}
                        className="zoomed-image"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="productInfo">
                <h1>{selectedProduct.name}</h1>
                {selectedProduct.price && <h3>{selectedProduct.price} EGP</h3>}
                <Stack
                  align="flex-start"
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <Badge variant="solid" colorPalette="blue">
                    <HiStar />
                    New
                  </Badge>
                  <Badge variant="solid" colorPalette="green">
                    In Store
                    <HiAtSymbol />
                  </Badge>
                </Stack>
                <div className="brand">
                  <div>
                    <h6>
                      Category:
                      <Link
                        href={`/products/${selectedProduct.category}#1`}
                        className="brandLink"
                      >
                        {selectedProduct.category}
                      </Link>
                    </h6>
                    <h6>
                      Brand:
                      <Link
                        href={selectedProduct.category}
                        className="brandLink"
                      >
                        {selectedProduct.category}
                      </Link>
                    </h6>
                  </div>
                  <div className="wishlistBox" onClick={heartHandler}>
                    <button className="wishlistCard">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className=" bi bi-heart-fill "
                        id={activeHeart ? "activeHeart" : "heartHover"}
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        />
                      </svg>
                    </button>
                    <h2>add to wishlist</h2>
                  </div>
                </div>
                <div className="buyBox">
                  <button
                    className={`addCard ${isAdded ? "addedCard" : ""}`}
                    onClick={() => addToCardHandler(selectedProduct)}
                    disabled={isAdded}
                  >
                    {!isAdded && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-cart3"
                        id={isAdded ? "hidden" : ""}
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                      </svg>
                    )}

                    <p className="btnText">
                      {isAdded ? "ADDED TO BAG" : "ADD TO BAG"}
                    </p>
                  </button>
                </div>
                <div className="description">
                  <p>{selectedProduct.description}</p>
                </div>
              </div>
            </div>
            <p></p>
          </>
        )}
        <div className="productBox"></div>
      </div>
    </div>
  );
}

export default ProductDetails;
