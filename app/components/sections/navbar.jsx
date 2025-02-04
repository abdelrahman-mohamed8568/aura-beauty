"use client";
import { geistMono, montserratFont } from "@/lang/lang";
import "@/styles/navbar.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/app/favicon.ico";
// import { font2 } from "@fonts/font";
// import { useAppSelector } from "@/app/store/hook";
// import { getTotal } from "@/app/store/card/cardSlice";
// import { RootState } from "@/app/store/store";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  //   const cartItems = useAppSelector(getTotal);
  //   const wishlistItems = useAppSelector((state) => state.wishlistSlice.items);
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      scroll >= 60 ? setIsScrolled(true) : null;
      scroll <= 20 ? setIsScrolled(false) : null;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`${montserratFont.className} container`}>
      <div className={`user ${isScrolled ? "hide" : ""}`}>
        <span></span>
        <h4>{`Your new world for your clinic's needs...`}</h4>
        <div className="info">
          <span className="lang">Contact Us</span>
          <span>|</span>
          <span className="about">About Us</span>
        </div>
      </div>
      <ul>
        <li>
          <Link href="/" className={`navLogo `}>
            <Image src={icon} alt="icon" height={50} />
          </Link>
        </li>
        <li>
          <Link href="/" className="categoriesLink">
            <span className="span-mother">
              <span>H</span>
              <span>o</span>
              <span>m</span>
              <span>e</span>
            </span>
            <span className="span-mother2">
              <span>H</span>
              <span>o</span>
              <span>m</span>
              <span>e</span>
            </span>
          </Link>
          <Link href="/products" className="categoriesLink">
            <span className="span-mother">
              <span>P</span>
              <span>r</span>
              <span>o</span>
              <span>d</span>
              <span>u</span>
              <span>c</span>
              <span>t</span>
              <span>s</span>
            </span>
            <span className="span-mother2">
              <span>P</span>
              <span>r</span>
              <span>o</span>
              <span>d</span>
              <span>u</span>
              <span>c</span>
              <span>t</span>
              <span>s</span>
            </span>
          </Link>
          <Link href="/woman" className="categoriesLink">
            <span className="span-mother">
              <span>B</span>
              <span>l</span>
              <span>o</span>
              <span>g</span>
            </span>
            <span className="span-mother2">
              <span>B</span>
              <span>l</span>
              <span>o</span>
              <span>g</span>
            </span>
          </Link>
        </li>
        <li className="Settings">
          <Link href="/shopping-cart" className="navLink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </Link>
          <Link href="/wishlist" className="navLink">
            {/* {wishlistItems.length === 0 ? ( */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
            {/* ) : ( */}
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-heart-fill navHeart"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg> */}
            {/* )} */}
          </Link>
        </li>
      </ul>
      {/* <div id="menuToggle">
          <input
            id="checkbox"
            type="checkbox"
            checked={activeToggle}
            onChange={() => setActiveToggle(!activeToggle)}
          />
          <label className="toggle" htmlFor="checkbox">
            <div className="bar bar--top"></div>
            <div className="bar bar--middle"></div>
            <div className="bar bar--bottom"></div>
          </label>
        </div> */}
    </nav>
  );
}

export default Navbar;
