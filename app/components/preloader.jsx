"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import "@/styles/preloader.css";
import { preLoaderAnim } from "./loader";
function Preloader() {
  const preloaderRef = useRef(null);

  useLayoutEffect(() => {
    // يمكن هنا ضبط الكود ضمن سياق العنصر المُحدد
    if (preloaderRef.current) {
      setTimeout(() => {
        preLoaderAnim();
      }, 100); // تأخير 100 ميلي ثانية
    }
  }, []);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="texts-container">
        <span>aura</span>
        <span>beauty</span>
        <span>store</span>
      </div>
    </div>
  );
}

export default Preloader;
