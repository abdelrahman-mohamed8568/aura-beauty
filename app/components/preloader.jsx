"use client";
import { useEffect } from "react";
import "@/styles/preloader.css";
import { preLoaderAnim } from "./animations";
function Preloader() {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>aura</span>
        <span>beauty</span>
        <span>store</span>
      </div>
    </div>
  );
}

export default Preloader;
