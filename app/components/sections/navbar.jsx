"use client";
import "@/styles/navbar.css";
import { montserratFont } from "@/lang/lang";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/app/favicon.ico";
import { getTotalItems } from "@/store/card/cardSlice";
import { shallowEqual, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Search from "../common/search";
import Link from "next/link";
import SocialIcons from "../common/socialIcons";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector(getTotalItems);
  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || [],
    shallowEqual
  );
  const [navToggle, setNavToggle] = useState(false);
  const openNavbar = () => {
    setNavToggle(!navToggle);
  };
  const lenis = useLenis();
  useEffect(() => {
    if (navToggle) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "auto";
    }
    const handleScroll = () => {
      const scroll = window.scrollY;
      scroll >= 60 ? setIsScrolled(true) : null;
      scroll <= 20 ? setIsScrolled(false) : null;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navToggle, lenis]);
  const itemVariants = {
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 2.5, ease: "easeInOut" },
    }),
    exit: (i) => ({
      opacity: 0,
      transition: { delay: i * 0.1, duration: 0.1, ease: "easeInOut" },
    }),
  };
  return (
    <nav
      className={`${montserratFont.className} container ${
        navToggle && "navOpen"
      }`}
    >
      <div className={`navScroll ${isScrolled ? "hide" : ""} `}>
        <h4>Everything Your Clinic Needs – All in One Place</h4>
        <div className="navContact">
          <Link
            className={
              pathname === "/contact-us" ? "navLink disabledLink" : "navLink"
            }
            href={"/contact-us"}
          >
            <span className="span-mother">
              <span>c</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
              <span>-</span>
              <span>u</span>
              <span>s</span>
            </span>
            <span className="span-mother2">
              <span>c</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
              <span>-</span>
              <span>u</span>
              <span>s</span>
            </span>
          </Link>
          <span> / </span>
          <Link
            className={
              pathname === "/about-us" ? "navLink disabledLink" : "navLink"
            }
            href={"/about-us"}
          >
            <span className="span-mother">
              <span>a</span>
              <span>b</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
              <span>-</span>
              <span>u</span>
              <span>s</span>
            </span>
            <span className="span-mother2">
              <span>a</span>
              <span>b</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
              <span>-</span>
              <span>u</span>
              <span>s</span>
            </span>
          </Link>
        </div>
      </div>
      <ul className={`navCategory ${navToggle && "navOpenOptionsAll"}`}>
        <li>
          <Link
            className={pathname === "/" ? "navLogo disabledLink" : "navLogo"}
            href={"/"}
          >
            <Image
              src={icon}
              alt="icon"
              className="navIcon"
              height={40}
              width={40}
              unoptimized
            />
          </Link>
        </li>
        <li className="navCategoryBox">
          {[
            { href: "/", text: "home", disabled: "" },
            {
              href: "/products/all?page=1",
              text: "products",
              disabled: "products",
            },
            {
              href: "/injection/all?page=1",
              text: "injection",
              disabled: "injection",
            },
            {
              href: "/laser/all?page=1",
              text: "laser",
              disabled: "laser",
            },
            {
              href: "/hydrafacial/all?page=1",
              text: "hydrafacial",
              disabled: "hydrafacial",
            },
            {
              href: "/consumables/all?page=1",
              text: "consumables",
              disabled: "consumables",
            },
            { href: "/contact-us", text: "contact-us", disabled: "contact-us" },
            { href: "/about-us", text: "about-us", disabled: "about-us" },
          ].map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={
                pathname.split("/")[1] === link.disabled ? "disabledLink" : ""
              }
              onClick={() => {
                setTimeout(() => {
                  setNavToggle(false);
                }, 500);
              }}
            >
              <motion.div
                className={`navLink
                 ${navToggle && "navOpenOptions"} 
                 ${
                   pathname.split("/")[1] === link.disabled
                     ? "disabledLink"
                     : ""
                 } ${
                  link.href === "/contact-us" || link.href === "/about-us"
                    ? "navContact"
                    : ""
                }`}
                custom={index}
                animate={navToggle ? "visible" : "exit"}
                variants={itemVariants}
              >
                <span className="span-mother">
                  {link.text.split("").map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </span>
                <span className="span-mother2">
                  {link.text.split("").map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </span>
              </motion.div>
            </Link>
          ))}
          <div className={`navHidden ${navToggle && "navOpenOptions"}`}>
            <SocialIcons />
            <h6>Copyright © 2025 aurabeautyeg.com</h6>
          </div>
        </li>
        <li className="settings">
          <Search />
          <Link
            className={
              pathname === "/wishlist" ? "navLink disabledLink" : "navLink"
            }
            href={"/wishlist"}
          >
            {wishlistItems.length === 0 ? (
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
          </Link>
          <Link
            className={
              pathname === "/shopping-cart" ? "navLink disabledLink" : "navLink"
            }
            href={"/shopping-cart"}
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
          </Link>
        </li>
        <div className="toggle" onClick={openNavbar}>
          <span className={`checkbox ${navToggle && "checked"}`} />
          <svg fill="none" viewBox="0 0 50 50" height="30" width="30">
            <path
              className="lineTop line"
              strokeLinecap="round"
              strokeWidth="4"
              stroke="black"
              d="M6 11L44 11"
            ></path>
            <path
              strokeLinecap="round"
              strokeWidth="4"
              stroke="black"
              d="M6 24H43"
              className="lineMid line"
            ></path>
            <path
              strokeLinecap="round"
              strokeWidth="4"
              stroke="black"
              d="M6 37H43"
              className="lineBottom line"
            ></path>
          </svg>
        </div>
        <div
          className={` ${navToggle && "navOverlay"}`}
          data-lenis-prevent
        ></div>
      </ul>
    </nav>
  );
}

export default Navbar;
