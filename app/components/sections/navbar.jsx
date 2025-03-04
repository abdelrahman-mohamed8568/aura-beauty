"use client";
import "@/styles/navbar.css";
import { useTransitionRouter } from "next-view-transitions";
import { montserratFont } from "@/lang/lang";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/app/favicon.ico";
import { getTotalItems } from "@/store/card/cardSlice";
import { shallowEqual, useSelector } from "react-redux";
import { slideInOut } from "../animations";
import { usePathname } from "next/navigation";
import Search from "../search";

function Navbar() {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector(getTotalItems);
  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || [],
    shallowEqual
  );
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
        <h4>{`Your new world for your clinic's needs...`}</h4>
      </div>
      <ul>
        <li>
          <a
            className={pathname === "/" ? "navLink disabledLink" : "navLink"}
            onClick={(e) => {
              e.preventDefault();
              router.push("/", {
                onTransitionReady: slideInOut,
              });
            }}
          >
            <Image src={icon} alt="icon" height={50} priority />
          </a>
        </li>
        <li>
          <a
            className={pathname === "/" ? "navLink disabledLink" : "navLink"}
            onClick={(e) => {
              e.preventDefault();
              router.push("/", {
                onTransitionReady: slideInOut,
              });
            }}
          >
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
          </a>
          <a
            className={
              pathname.startsWith("/products")
                ? "navLink disabledLink"
                : "navLink"
            }
            onClick={(e) => {
              e.preventDefault();
              router.push("/products/all?page=1", {
                onTransitionReady: slideInOut,
              });
            }}
          >
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
          </a>
          <a
            className={
              pathname === "/contact" ? "navLink disabledLink" : "navLink"
            }
            onClick={(e) => {
              e.preventDefault();
              router.push("/contact", {
                onTransitionReady: slideInOut,
              });
            }}
          >
            <span className="span-mother">
              <span>c</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
            </span>
            <span className="span-mother2">
              <span>c</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
            </span>
          </a>
          <a
            className={
              pathname === "/about" ? "navLink disabledLink" : "navLink"
            }
            onClick={(e) => {
              e.preventDefault();
              router.push("/about", {
                onTransitionReady: slideInOut,
              });
            }}
          >
            <span className="span-mother">
              <span>a</span>
              <span>b</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
            </span>
            <span className="span-mother2">
              <span>a</span>
              <span>b</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
            </span>
          </a>
        </li>
        <li className="settings">
          <a
            className={
              pathname === "/shopping-cart" ? "navLink disabledLink" : "navLink"
            }
            onClick={(e) => {
              e.preventDefault();
              router.push("/shopping-cart", {
                onTransitionReady: slideInOut,
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            </svg>
            {cartItems > 0 && <span id="Basket"> {cartItems}</span>}
          </a>
          <a
            className={
              pathname === "/wishlist" ? "navLink disabledLink" : "navLink"
            }
            onClick={(e) => {
              e.preventDefault();
              router.push("/wishlist", {
                onTransitionReady: slideInOut,
              });
            }}
          >
            {wishlistItems.length == 0 ? (
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
            ) : (
              <svg
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
              </svg>
            )}
          </a>
          <Search />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
