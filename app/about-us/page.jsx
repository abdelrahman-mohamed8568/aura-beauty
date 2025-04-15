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
            Aura Beauty is a company specialized in supplying professional
            dermatology and beauty clinics with trusted aesthetic devices,
            skincare tools, and injectable products.
          </p>
          <p>
            Our mission is to simplify clinic management by offering everything
            in one place—from laser machines and facial devices to original
            Botox, fillers, and mesotherapy injections.
          </p>
          <p>💡 Our Product Range Includes:</p>
          <p>• Laser hair removal devices</p>
          <p>• HydraFacial and skin care machines</p>
          <p>• Injectable solutions: Botox, filler, & mesotherapy</p>
          <p>• Dermatology beds, chairs & clinic furniture</p>
          <p>• Full training & technical support</p>
          <p>
            We believe that a successful doctor starts with quality tools.
            That’s why we go the extra mile to ensure every clinic is equipped
            with reliable, effective, and certified technology.
          </p>
          <p>📍 Serving all governorates across Egypt</p>
          <p>📞 Our support team is always ready to assist you</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
