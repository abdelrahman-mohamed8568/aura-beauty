import "@/styles/categoriesSection.css";
import Image from "next/image";
import card1 from "@/public/images/homeCard1.jpeg";
import card2 from "@/public/images/homeCard2.jpg";
import card3 from "@/public/images/homeCard3.webp";
import cover from "@/public/images/categorieCover.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { fatfaceFont } from "@/lang/lang";
import { useSelector } from "react-redux";
import { selectAllCategories } from "@/app/store/products/productsSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import { homeAnimations } from "@/appComponents/homeAnimations";
function CategoriesSection() {
  const categories = useSelector(selectAllCategories);
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
                description="Upgrade your treatments with the latest tech"
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
            </h2>
          </div>
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
            {categories
              .filter((item) => item.toLowerCase() !== "all")
              .map((item) => (
                <SwiperSlide className="homeSwiperSlide" key={item}>
                  <Link href={`/products/${item.replace(/ /g, "-")}?page=${1}`}>
                    <Image src={cover} alt="categories" priority />
                    <h2 className={fatfaceFont.className}>
                      {item.replace("-", " ")}
                    </h2>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
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
