"use client";
import Image from "next/image";
// import wave from "@/images/wave.svg";
import HeroSection from "@/appComponents/sections/heroSection";
import CategoriesSection from "@/appComponents/sections/categoriesSection";
export default function Home() {
  return (
    <>
      <div className="mainContainer">
        <HeroSection />
        <CategoriesSection />
        {/* <Image src={wave} alt="wave" className="wave" height={1000} /> */}
      </div>
    </>
  );
}
