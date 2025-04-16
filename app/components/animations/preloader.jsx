"use client";
import { useLayoutEffect, useRef } from "react";
import "@/styles/preloader.css";
import { preLoaderAnim } from "./loader";
function Preloader() {
  const preloaderRef = useRef(null);
  useLayoutEffect(() => {
    if (preloaderRef.current) {
      setTimeout(() => {
        preLoaderAnim();
      }, 10);
    }
  }, []);
  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="texts-container">
        <span>aura</span>
      </div>
      <div className="texts-container">
        <span>beauty</span>
      </div>
      <div className="texts-container">
        <span>store</span>
      </div>
    </div>
  );
}

export default Preloader;
