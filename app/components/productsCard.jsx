"use client";
import "@/styles/productsCard.css";
import React, { useState, memo } from "react";
import Image from "next/image";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addHeart, removeHeart } from "../store/wishlist/wishlistSlice";
import { Tooltip } from "@/components/ui/tooltip";
import { toast } from "react-toastify";
import { Badge } from "@chakra-ui/react";
import { HiAtSymbol } from "react-icons/hi";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "./animations";
import { usePathname } from "next/navigation";

const ProductsCard = memo((product) => {
  const router = useTransitionRouter();
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
      ? (dispatch(removeHeart(product.id)),
        toast.error("This product has been removed from the wishlist !"))
      : (dispatch(addHeart({ ...product, fromPath: FromPath })),
        toast.success("This product has been added to your wishlist."));

    setActiveHeart(!isProductInWishlist);
  };
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const FromPath = pathSegments[1];
  const categorys = product.category[0].toString();

  return (
    <div className="productCard">
      <div className="imagCardBox">
        <Tooltip positioning={{ placement: "top" }} content="wishlist">
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
        </Tooltip>
        <a
          onClick={(e) => {
            e.preventDefault();
            router.push(
              `/${FromPath}/${categorys.replace(" ", "-")}/${product.id}`,
              {
                // onTransitionReady: slideInOut,
              }
            );
          }}
          className="cardImg"
        >
          <Image
            src={product.cover}
            alt={product.name}
            width={230}
            height={230}
          />
          <div className="view">
            <div className="homeBtn">
              <p className="mainBtn">view</p>
              <p className="hoverBtn">view</p>
            </div>
          </div>
        </a>
      </div>
      <div className="cardBody">
        <div className="cardCategory">
          <div>
            {product.category.map((item, index) => {
              const category = item.toString();
              return (
                <p className="hoverText" key={index}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        `/${FromPath}/${category.replace(" ", "-")}?page=${1}`,
                        {
                          // onTransitionReady: slideInOut,
                        }
                      );
                    }}
                  >
                    {category}
                  </a>
                </p>
              );
            })}
          </div>
          {product.store ? (
            <Badge variant="solid" colorPalette="green" size="xs" height={4}>
              In Stock
              <HiAtSymbol />
            </Badge>
          ) : (
            <Badge variant="solid" colorPalette="red" size="xs" height={4}>
              Out Of Stock
              <HiAtSymbol />
            </Badge>
          )}
        </div>
        <div className="productsCardInfo">
          <h3 className="hoverText">
            <a
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/${FromPath}/${categorys.replace(" ", "-")}/${product.id}`,
                  {
                    // onTransitionReady: slideInOut,
                  }
                );
              }}
            >
              {product.name}
            </a>
          </h3>
          {product.price ? <h5>EGP {product.price}</h5> : <p>indefinite</p>}
        </div>
      </div>
    </div>
  );
});

export default ProductsCard;
