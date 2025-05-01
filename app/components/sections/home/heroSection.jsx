import "@/styles/heroSection.css";
import cover from "@/public/images/home_cover.webp";
import Image from "next/image";
import over from "@/public/images/cover_over.webp";
function HeroSection() {
  return (
    <div className="hero">
      <div className="heroImage">
        <Image
          src={cover}
          alt="home cover"
          className="homeCover"
          width={4500}
          height={3123}
          priority
        />
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
        <Image
          src={over}
          alt="cover over"
          className="coverOver"
          width={786}
          height={1024}
          priority
        />
      </div>
    </div>
  );
}

export default HeroSection;
