import "@/styles/heroSection.css";
import cover from "@/public/images/home_cover.jpg";
import Image from "next/image";
import over from "@/public/images/cover_over.webp";
function HeroSection() {
  return (
    <div className="hero">
      <div className="heroImage">
        <Image src={cover} alt="home cover" className="homeCover" priority />
      </div>
      <div className="heroContent">
        <div className="heroText">
          <h1>
            We are thriving in the beauty industry, offering exclusive brands,
            cutting-edge devices, and the latest technological advancements in
            Egypt, delivering exceptional products and experiences.
          </h1>
        </div>
        <div className="heroEmpty"></div>
        <Image src={over} alt="cover over" className="coverOver" priority />
      </div>
    </div>
  );
}

export default HeroSection;
