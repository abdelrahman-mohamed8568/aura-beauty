import "@/styles/footer.css";
import logo from "@/public/images/footer_logo.webp";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "../common/socialIcons";

function Footer() {
  const links = [
    { text: "home", href: "/" },
    { text: "products", href: "/products/all?page=1" },
    { text: "injection", href: "/injection/all?page=1" },
    { text: "laser", href: "/laser/all?page=1" },
    { text: "hydrafacial", href: "/hydrafacial/all?page=1" },
    { text: "consumables", href: "/consumables/all?page=1" },
    { text: "contact us", href: "/contact-us" },
    { text: "about us", href: "/about-us" },
  ];
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
              height={150}
              className="footerLogo"
              priority
            />
            <p>Copyright © 2025 aurabeautyeg.com</p>
            <p>
              Created by
              <strong> abdelrahman</strong>.
            </p>
            <p>
              <Link href="/privacy-policy">privacy policy</Link>
            </p>
          </div>
          <div className="Sitemap">
            <div className="sitemapLinks">
              <h3>Quick Links</h3>
              <div>
                {links.map((link, index) => (
                  <p key={index}>
                    <Link className="hoverText" href={link.href}>
                      {link.text}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div className="socialBox">
              <h3>socials</h3>
              <SocialIcons />
            </div>
          </div>
          <Image
            alt="logo"
            src={logo}
            width={130}
            height={130}
            className="footerLogoMob"
            priority
          />
        </div>
        <p className="footerText">
          Can't find what you're looking for? Our customer support team is here
          to assist you. Contact us at
          <Link href="tel:+201100313877">
            <strong> +201100313877 </strong>
          </Link>
          or
          <Link href="tel:+201050151808">
            <strong> +201050151808 </strong>
          </Link>
          .
        </p>
      </div>
    </>
  );
}

export default Footer;
