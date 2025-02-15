"use client";
import "@/styles/productsCard.css";
import React, { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addHeart, removeHeart } from "../store/wishlist/wishlistSlice";

const ProductsCard = memo((product) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || [],
    shallowEqual
  );

  const isProductInWishlist = wishlistItems.some(
    (item) => item.id === product.id
  );

  const [activeHeart, setActiveHeart] = useState(isProductInWishlist);

  const heartHandler = () => {
    isProductInWishlist == true
      ? dispatch(removeHeart(product.id))
      : dispatch(addHeart(product));

    setActiveHeart(!isProductInWishlist);
  };

  console.log(isProductInWishlist);

  return (
    <div className="productCard">
      <div className="imagCardBox">
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
            onClick={heartHandler}
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
        </button>
        <Link
          href={`/products/${product.category}/${product.id}`}
          className="cardImg"
        >
          <Image
            src={product.cover}
            alt={product.name}
            width={230}
            height={230}
          />
          <p className="view">view</p>
        </Link>
      </div>
      <div className="cardBody">
        <p>
          <Link href={`/products/${product.category}?page=${1}#1`}>
            {product.category}
          </Link>
        </p>
        <div className="productsCardInfo">
          <h3>
            <Link href={`/products/${product.category}/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <h5>${product.price}</h5>
        </div>
      </div>
    </div>
  );
});

export default ProductsCard;
