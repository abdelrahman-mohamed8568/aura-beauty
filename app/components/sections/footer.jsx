import "@/styles/footer.css";
import logo from "@/public/images/footer_logo.png";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "../socialIcons";
function Footer() {
  return (
    <>
      <div className="hoverFooter"></div>
      <div className="footerMain">
        <div className="footerBox">
          <div className="footerInfo">
            <Image
              alt="logo"
              src={logo}
              width={150}
              className="footerLogo"
              priority
            />
            <h6>Copyright © 2025 Aura-Beauty.com</h6>
            <h6>
              Created by
              <Link
                href={"https://abdelrahmanmohamed.netlify.app/"}
                target="_blank"
              >
                <strong> abdelrahman</strong>
              </Link>
              .
            </h6>
            <div className="footerPrivacy">
              <p>
                <Link className="hoverText" href={"/"}>
                  privacy policy
                </Link>
              </p>
              <span>/</span>
              <p>
                <Link className="hoverText" href={"/"}>
                  terms and conditions
                </Link>
              </p>
            </div>
          </div>
          <div className="Sitemap">
            <div className="sitemapLinks">
              <h3>Quick Links</h3>
              <p>
                <Link className="hoverText" href={"/"}>
                  home
                </Link>
              </p>
              <p>
                <Link className="hoverText" href={"/products/all?page=1"}>
                  products
                </Link>
              </p>
              <p>
                <Link className="hoverText" href={"/professionals/all?page=1"}>
                  professionals
                </Link>
              </p>
              <p>
                <Link className="hoverText" href={"/centers/all?page=1"}>
                  centers
                </Link>
              </p>
              <p>
                <Link className="hoverText" href={"/personal/all?page=1"}>
                  personal
                </Link>
              </p>
              <p>
                <Link className="hoverText" href={"/"}>
                  contact us
                </Link>
              </p>
              <p>
                <Link className="hoverText" href={"/"}>
                  about us
                </Link>
              </p>
            </div>
            <div className="socialBox">
              <h3>socials</h3>
              <SocialIcons />
            </div>
          </div>
        </div>
        <p className="footerText">
          Can't find what you're looking for? Our customer support team is here
          to assist you in finding the right product or answering any questions
          you may have. You can contact us by phone at
          <Link href={"tel:+201100313877"}>
            <strong> +201100313877 </strong>
          </Link>
          or
          <Link href={"tel:+201050151808"}>
            <strong> +201050151808 </strong>
          </Link>
          .
        </p>
      </div>
    </>
  );
}

export default Footer;
