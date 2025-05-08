"use client";
import { useLayoutEffect, useRef } from "react";
import "@/styles/preloader.css";
import { preLoaderIntroAnim } from "./loader";

function Preloader() {
  const preloaderRef = useRef(null);
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (preloaderRef.current) {
        preLoaderIntroAnim();
      }
    }, 10);
    return () => {
      clearTimeout(timer);
    };
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
