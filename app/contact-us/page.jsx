import { fatfaceFont } from "@/lang/lang";
import "@/styles/contact.css";
import ContactForm from "../components/common/contactForm";
import { ToastContainer, toast } from "react-toastify";
import SocialIcons from "../components/common/socialIcons";

function ContactUs() {
  return (
    <div className="mainContainer">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
        theme="dark"
      />
      <div className="contactBox">
        <h1 className={fatfaceFont.className}>Contact Us</h1>
        <div className="contactContainer">
          <ContactForm />
          <div>
            <h3>Follow us and contact with us on platforms.</h3>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
