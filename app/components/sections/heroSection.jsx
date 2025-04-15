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
            Welcome to Aura Beauty, your trusted source for premium medical and
            aesthetic supplies. We provide clinics, dermatologists, and beauty
            centers with high-quality certified devices and injectables from
            leading global brands.
          </h1>
        </div>
        <div className="heroEmpty"></div>
        <Image src={over} alt="cover over" className="coverOver" priority />
      </div>
    </div>
  );
}

export default HeroSection;
