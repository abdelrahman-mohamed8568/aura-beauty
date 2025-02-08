"use client";
import React, { useState } from "react";
import Image from "next/image";
import cardImg from "@/images/product_demo.jpg";
import Link from "next/link";
function ProductsCard({ name, category, price }) {
  const [activeHeart, setActiveHeart] = useState(false);
  const heartHandler = () => {
    activeHeart == false ? setActiveHeart(true) : setActiveHeart(false);
  };
  //   const itemsId = items.map((item) => item.id).toString();
  //   useEffect(() => {
  //     itemsId.includes(id) && setActiveHeart(true);
  //   }, [dispatch]);
  //   const wishlistData = {
  //     id: id,
  //     cardImg: cardImg,
  //     title: title,
  //     price: price,
  //     offer: offer,
  //     cardLink: cardLink,
  //     categories: categories,
  //   };

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
        <Image
          loading="lazy"
          src={cardImg}
          alt="Green double couch with wooden legs"
          className="cardImg"
        />
        <Link href={"/"} className="learn-more">
          <span className="circle" aria-hidden="true">
            <span className="fancy arrow"></span>
          </span>
          <span className="button-text">details</span>
        </Link>
      </div>
      <div className="cardBody">
        <p>
          <Link href={"/products/filler"} scroll={false}>
            {category}
          </Link>
        </p>
        <div className="productsCardInfo">
          <h3>
            <Link href={"/"}>{name}</Link>
          </h3>
          <h5>${price}</h5>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductsCard);
