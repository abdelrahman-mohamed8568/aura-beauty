import "@/styles/categoriesSection.css";
import Image from "next/image";
import card1 from "@/public/images/homeCard1.jpeg";
import card2 from "@/public/images/homeCard2.jpg";
import card3 from "@/public/images/homeCard3.webp";
import cover from "@/public/images/categorieCover.jpg";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { fatfaceFont } from "@/lang/lang";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectCategories,
} from "@/app/store/products/productsSlice";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../animations";
import Link from "next/link";

function CategoriesSection() {
  const router = useTransitionRouter();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="categories">
          <h1 className="headerText">
            <span>choose</span>
            <span>your</span>
            <span>area</span>
          </h1>
          <div className="homeCards">
            <div className="homeCard">
              <Link
                href={"/professionals/all?page=1"}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/professionals/all?page=1", {
                    onTransitionReady: slideInOut,
                  });
                }}
              >
                <Image
                  className="categoriesImage"
                  src={card2}
                  alt="Professional Corner"
                  priority
                />
              </Link>
              <div className="cardInfo">
                <h1>Professional Corner</h1>
                <p>Upgrade your treatments with the latest tech</p>
                <div className="homeBtn">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/professionals/all?page=1", {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="mainBtn"
                  >
                    view
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/professionals/all?page=1", {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="hoverBtn"
                  >
                    view
                  </a>
                </div>
              </div>
            </div>
            <div className="homeCard">
              <div className="cardInfo">
                <h1>Beauty Business Boost</h1>
                <p>Take your beauty business to the next level</p>
                <div className="homeBtn">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/centers/all?page=1", {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="mainBtn"
                  >
                    view
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/centers/all?page=1", {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="hoverBtn"
                  >
                    view
                  </a>
                </div>
              </div>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/centers/all?page=1", {
                    onTransitionReady: slideInOut,
                  });
                }}
              >
                <Image
                  src={card3}
                  alt="Beauty Business Boost"
                  priority
                  className="categoriesImage rightImage"
                />
              </a>
            </div>
            <div className="homeCard">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/personal/all?page=1", {
                    onTransitionReady: slideInOut,
                  });
                }}
              >
                <Image
                  src={card1}
                  alt="Beauty Routine"
                  className="categoriesImage"
                  priority
                />
              </a>
              <div className="cardInfo">
                <h1>Your Beauty Routine</h1>
                <p>Achieve your beauty goals with ease</p>
                <div className="homeBtn">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/personal/all?page=1", {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="mainBtn"
                  >
                    view
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/personal/all?page=1", {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="hoverBtn"
                  >
                    view
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="categorieInfo">
          <h1 className="headerText">
            <span>who</span>
            <span>we are</span>
          </h1>
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
            <a
              className="contactBtn"
              onClick={(e) => {
                e.preventDefault();
                router.push("/products/all?page=1", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
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
            </a>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={40}
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
            className="homeSwiper"
          >
            {categories
              .filter((item) => item.toLowerCase() !== "all")
              .map((item) => (
                <SwiperSlide className="homeSwiperSlide" key={item}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/products/${item}?page=${1}`, {
                        onTransitionReady: slideInOut,
                      });
                    }}
                  >
                    <Image src={cover} alt="categories" priority />
                    <h2 className={fatfaceFont.className}>
                      {item.replace("-", " ")}
                    </h2>
                  </a>
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
                <h2>brand products</h2>
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
                <h2>governorate delivery</h2>
              </div>
            </div>
            <div className="right">
              <div className="top infoBox">
                <h1 className="numberBox">
                  <span className="span-mother">
                    <span>9</span>
                    <span className="spanPlus">+</span>
                  </span>
                  <span className="span-mother2">
                    <span>9</span>
                    <span className="spanPlus">+</span>
                  </span>
                </h1>
                <h2>years of experience</h2>
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
                <h2>cooperative client</h2>
              </div>
            </div>
          </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={6}
            loop={true}
            centeredSlides={true}
            easing="ease-in-out"
            speed={2000}
            autoplay={{
              delay: 10,
            }}
            modules={[Autoplay]}
            className="homeSlider"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default CategoriesSection;
