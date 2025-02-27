"use client";
import Image from "next/image";
import HeroSection from "@/appComponents/sections/heroSection";
import CategoriesSection from "@/appComponents/sections/categoriesSection";
export default function Home() {
  return (
    <>
      <div className="mainContainer">
        <HeroSection />
        <CategoriesSection />
      </div>
    </>
  );
}
