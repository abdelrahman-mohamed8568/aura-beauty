import { fatfaceFont } from "@/lang/lang";
import "@/styles/about.css";
function AboutUs() {
  return (
    <div className="mainContainer">
      <div className="aboutBox">
        <h1 className={fatfaceFont.className}>Aura Beauty</h1>
        <div className="aboutText">
          <h3>About Us</h3>
          <p>
            We are a team of distinguished Egyptians who embarked on our journey
            nine years ago, driven by a passion and enthusiasm for the world of
            beauty. Our vision was simple to provide high quality, distinctive
            beauty products to the Egyptian market at competitive prices.
          </p>
          <h3>Our Story</h3>
          <p>
            We started as a small team, but our aspirations were far greater
            than our size. Over the years, we've worked diligently to grow our
            business and earn the trust of our customers. We've learned a lot
            along the way, overcome numerous challenges, but our belief in our
            goals has never wavered.
          </p>
          <h3>Our Vision</h3>
          <p>
            We believe that beauty is every woman's right, and we strive to
            offer the latest and best cosmetic devices that help them achieve
            their natural beauty. Our vision is to become the premier
            destination for cosmetic devices in Egypt and to expand our reach
            throughout the Arab world.
          </p>
          <h3>Our Values</h3>
          <p>
            Quality: We are committed to providing high-quality products from
            the best international brands.
            <br />
            Integrity: We uphold transparency and honesty in all our dealings
            with customers. <br /> Innovation: We constantly seek to offer the
            latest products and technologies in the beauty industry.
            <br /> Customer Service: We prioritize our customers and aim to
            provide the best possible service.
          </p>
          <h3>What Sets Us Apart</h3>
          <p>
            Wide Range of Products: We offer a diverse selection of cosmetic
            devices to meet all our customers' needs. <br />
            Competitive Prices: We strive to offer the best prices in the
            Egyptian market. <br />
            Fast Delivery Service: We provide fast and reliable delivery service
            throughout Egypt. <br />
            Dedicated Technical Support Team: We have a dedicated technical
            support team ready to answer all your inquiries.
          </p>
          <h3>Our Future Goals</h3>
          <p>
            Our ambition extends beyond Egypt; we aim to expand our operations
            throughout the Arab world. We believe we have the potential to
            achieve this goal, thanks to our exceptional team, high-quality
            products, and the trust of our customers.
          </p>
          <h3>A Final Word</h3>
          <p>
            We thank you for your trust in us, and we look forward to serving
            you to the best of our ability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
