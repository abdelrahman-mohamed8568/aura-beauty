"use client";
import HeroSection from "@/app/components/sections/home/heroSection";
import CategoriesSection from "@/app/components/sections/home/categoriesSection";
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
