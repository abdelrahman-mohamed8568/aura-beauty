import "@/styles/categoriesSection.css";
import Link from "next/link";
import Image from "next/image";
import card1 from "@/public/images/homeCard1.jpeg";
import card2 from "@/public/images/homeCard2.jpg";
import card3 from "@/public/images/homeCard3.webp";
function CategoriesSection() {
  return (
    <>
      <div className="categoriesContainer">
        <div className="categories">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="top topWave"
          >
            <path
              fill="#faf9f7"
              fillOpacity="1"
              d="M0,160L40,160C80,160,160,160,240,149.3C320,139,400,117,480,122.7C560,128,640,160,720,176C800,192,880,192,960,160C1040,128,1120,64,1200,69.3C1280,75,1360,149,1400,186.7L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            ></path>
          </svg>
          <h1 className="headerText">
            <span>choose</span>
            <span>your</span>
            <span>area</span>
          </h1>
          <div className="homeCards">
            <div className="homeCard">
              <Image
                src={card2}
                alt="cover over"
                className="categoriesImage"
                width={700}
              />
              <div className="cardInfo">
                <h1>Professional Corner</h1>
                <p>Upgrade your treatments with the latest tech</p>
                <Link href={"/"} className="cardLink">
                  view
                </Link>
              </div>
            </div>
            <div className="homeCard">
              <div className="cardInfo">
                <h1>Beauty Business Boost</h1>
                <p>Take your beauty business to the next level</p>
                <Link href={"/products/all?page=1#0"} className="cardLink">
                  view
                </Link>
              </div>
              <Image
                src={card3}
                alt="cover over"
                className="categoriesImage right"
                width={700}
              />
            </div>
            <div className="homeCard">
              <Image
                src={card1}
                alt="cover over"
                className="categoriesImage"
                width={700}
              />
              <div className="cardInfo">
                <h1>Your Beauty Routine</h1>
                <p>Achieve your beauty goals with ease</p>
                <Link href={"/"} className="cardLink">
                  view
                </Link>
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
            <Link href={"/"} className="cardLink">
              {" Let's talk!"}
            </Link>
          </div>
          <div className="homeSlider">
            <div className="logos">
              <h1>sssssss</h1>
              <h1>Embark</h1>
              <h1>Embark</h1>
              <h1>Embark</h1>
              <h1>Embark</h1>
              <h1>fitness</h1>
              <h1>fitness</h1>
              <h1>fitness</h1>
              <h1>fitness</h1>
              <h1>sssssss</h1>
              <h1>Embark</h1>
              <h1>Embark</h1>
              <h1>Embark</h1>
              <h1>Embark</h1>
              <h1>fitness</h1>
              <h1>fitness</h1>
              <h1>fitness</h1>
              <h1>fitness</h1>
            </div>
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
        </div>
      </div>
    </>
  );
}

export default CategoriesSection;
