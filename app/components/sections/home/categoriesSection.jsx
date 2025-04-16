import "@/styles/categoriesSection.css";
import Image from "next/image";
import card1 from "@/public/images/homeCard1.png";
import card2 from "@/public/images/homeCard2.png";
import card3 from "@/public/images/homeCard3.png";
import devices from "@/images/categories/devices.png";
import hydraFacial from "@/images/categories/hydraFacial.png";
import mesotherapy from "@/images/categories/mesotherapy.png";
import co2 from "@/images/categories/co2.png";
import hifu from "@/images/categories/hifu.png";
import cryo from "@/images/categories/cryo.png";
import fat from "@/images/categories/fat.png";
import hair from "@/images/categories/hair.png";
import tattoo from "@/images/categories/tattoo.png";
import botox from "@/images/categories/botox.png";
import skin from "@/images/categories/skin.png";
import exosomes from "@/images/categories/exosomes.png";
import bio from "@/images/categories/bio.png";
import filler from "@/images/categories/filler.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";
import { homeAnimations } from "@/app/components/animations/homeAnimations";
function CategoriesSection() {
  const CardInfo = ({ titleParts, description, link, Class }) => (
    <div className={Class}>
      {titleParts.map((word, index) => (
        <span key={index}>
          <motion.h1 {...homeAnimations.text}>{word}</motion.h1>
        </span>
      ))}
      <div className="cardDescription">
        <p>{description}</p>
        <div className="homeBtn">
          <AnimatedLink href={link} className="mainBtn" />
          <AnimatedLink href={link} className="hoverBtn" />
        </div>
      </div>
    </div>
  );
  const AnimatedLink = ({ href, className }) => (
    <Link href={href} className={className}>
      view
    </Link>
  );
  const categories = [
    { name: "bio-stimulators", img: bio },
    { name: "exosomes", img: exosomes },
    { name: "fillers", img: filler },
    { name: "botox", img: botox },
    { name: "skin-boosters", img: skin },
    { name: "mesotherapy", img: mesotherapy },
    { name: "hair-removal-lasers", img: hair },
    { name: "tattoo-removal-lasers", img: tattoo },
    { name: "co2-fractional-lasers", img: co2 },
    { name: "cryolipolysis", img: cryo },
    { name: "hifu", img: hifu },
    { name: "cavitation-fat-reduction", img: fat },
    { name: "hydrafacial", img: hydraFacial },
    { name: "devices", img: devices },
  ];
  return (
    <>
      <div className="mainContainer">
        <div className="categories">
          <motion.h1 className="headerText">
            {["choose", "your", "area"].map((word, index) => (
              <span key={index}>
                <motion.div {...homeAnimations.text}>{word}</motion.div>
              </span>
            ))}
          </motion.h1>
          <div className="homeCards">
            <div className="homeCard">
              <Link href="/professionals/all?page=1">
                <motion.div {...homeAnimations.image("left")}>
                  <Image
                    src={card2}
                    alt="Image description"
                    className="categoriesImage"
                    priority
                  />
                </motion.div>
              </Link>
              <CardInfo
                titleParts={["Professional", "Corner"]}
                description="Update your clinic with the latest technology."
                link="/professionals/all?page=1"
                Class="cardInfo"
              />
            </div>
            <div className="homeCard reverse">
              <CardInfo
                titleParts={["Beauty", "Business"]}
                description="Take your beauty business to the next level"
                link="/centers/all?page=1"
                Class="cardInfo leftCard"
              />
              <Link href="/centers/all?page=1">
                <motion.div {...homeAnimations.image("right")}>
                  <Image
                    src={card3}
                    alt="Beauty Business Boost"
                    className="categoriesImage"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
            <div className="homeCard">
              <Link href="/personal/all?page=1">
                <motion.div {...homeAnimations.image("left")}>
                  <Image
                    src={card1}
                    alt="Beauty Routine"
                    className="categoriesImage"
                    priority
                  />
                </motion.div>
              </Link>
              <CardInfo
                titleParts={["Beauty", "Routine"]}
                description="Achieve your beauty goals with ease"
                link="/personal/all?page=1"
                Class="cardInfo"
              />
            </div>
          </div>
        </div>
        <div className="categorieInfo">
          <div className="categorieText">
            <h1>
              our <span>categories</span>
            </h1>
            <Link href={"/products/all?page=1"} className="contactBtn">
              <span className="buttonIcon">
                <svg
                  width="10"
                  className="buttonSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 15"
                >
                  <path
                    fill="currentColor"
                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  ></path>
                </svg>
                <svg
                  className="buttonSvg svgCopy"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  fill="none"
                  viewBox="0 0 14 15"
                >
                  <path
                    fill="currentColor"
                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  ></path>
                </svg>
              </span>
              view all
            </Link>
          </div>
          <Swiper
            loop={true}
            easing="ease-in-out"
            speed={2000}
            navigation={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="homeSwiper"
          >
            {categories.map((item, index) => (
              <SwiperSlide className="homeSwiperSlide" key={index}>
                <Link href={`/products/${item.name}?page=${1}`}>
                  <Image src={item.img} alt="categories" priority />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <motion.h1 className="headerText">
            {["who we", "are"].map((word, index) => (
              <span key={index}>
                <motion.div {...homeAnimations.text}>{word}</motion.div>
              </span>
            ))}
          </motion.h1>
          <div className="categorieInfoBox">
            <h2>
              We work creatively, staying up to date with the latest
              technologies to make our brand a formidable force and deliver
              exceptional products in the Egyptian market.
              <br />
              <br />
              ✔️ Original, MOH-approved products <br />
              ✔️ Fast nationwide delivery across Egypt
              <br />
              ✔️ On-site training with every device <br />
              ✔️ Expert support team for your clinic’s success
              <br />
              <br />
              Whether you're a dermatologist or the owner of a beauty center,
              Aura Beauty empowers your business with the tools to offer
              professional, results-driven treatments.
              <br />
              <br />
              📞 Contact us today for current offers or free consultation!
            </h2>
          </div>
          <div className="categorieInfoCards">
            <div className="left">
              <div className="top infoBox">
                <h1 className="numberBox">
                  <span className="span-mother">
                    <span>5</span>
                    <span>0</span>
                    <span>0</span>
                    <span className="spanPlus">+</span>
                  </span>
                  <span className="span-mother2">
                    <span>5</span>
                    <span>0</span>
                    <span>0</span>
                    <span className="spanPlus">+</span>
                  </span>
                </h1>
                <h2>
                  brand <br /> products
                </h2>
              </div>
              <div className="bottom infoBox">
                <h1 className="numberBox">
                  <span className="span-mother">
                    <span>2</span>
                    <span>7</span>
                    <span className="spanPlus">+</span>
                  </span>
                  <span className="span-mother2">
                    <span>2</span>
                    <span>7</span>
                    <span className="spanPlus">+</span>
                  </span>
                </h1>
                <h2>
                  governorate
                  <br /> delivery
                </h2>
              </div>
            </div>
            <div className="right">
              <div className="top infoBox">
                <h1 className="numberBox">
                  <span className="span-mother">
                    <span>7</span>
                    <span className="spanPlus">+</span>
                  </span>
                  <span className="span-mother2">
                    <span>7</span>
                    <span className="spanPlus">+</span>
                  </span>
                </h1>
                <h2>
                  years of <br /> experience
                </h2>
              </div>
              <div className="bottom infoBox">
                <h1 className="numberBox">
                  <span className="span-mother">
                    <span>1</span>
                    <span>2</span>
                    <span>0</span>
                    <span>0</span>
                    <span className="spanPlus">+</span>
                  </span>
                  <span className="span-mother2">
                    <span>1</span>
                    <span>2</span>
                    <span>0</span>
                    <span>0</span>
                    <span className="spanPlus">+</span>
                  </span>
                </h1>
                <h2>
                  cooperative
                  <br /> client
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesSection;
