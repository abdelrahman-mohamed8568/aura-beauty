import "@/styles/globals.css";
import "swiper/css";
import Preloader from "./components/animations/preloader";
import Navbar from "@/appComponents/sections/navbar";
import { Provider } from "@/components/ui/provider";
import Footer from "@/appComponents/sections/footer";
import { montserratFont } from "@/lang/lang";
import StoreProvider from "./StoreProvider";
import ReactLenis from "lenis/react";
import Script from "next/script";
export const metadata = {
  title: "Aura Beauty",
  description: "Everything Your Clinic Needs – All in One Place.",
  alternates: {
    canonical: "https://aurabeautyeg.com/",
  },
  openGraph: {
    title: "Aura Beauty",
    description: "Everything Your Clinic Needs – All in One Place.",
    url: "https://aurabeautyeg.com/",
    siteName: "Aura Beauty",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://aurabeautyeg.com/favicon.ico",
        width: 128,
        height: 128,
        alt: "Aura Beauty website preview image",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  geo: {
    country: "EG",
  },
  script: [
    {
      type: "application/ld+json",
      json: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Aura Beauty",
        image: "https://aurabeautyeg.com/favicon.ico",
        url: "https://aurabeautyeg.com/",
        telephone: "+20-1050151808",
        sameAs: [
          "https://www.facebook.com/share/1XfZ3n5TkE/?mibextid=wwXIfr",
          "https://www.instagram.com/aurabeautyeg",
          "https://wa.me/+201050151808",
          "https://www.tiktok.com/@aurabeautyeg",
        ],
      },
    },
    {
      type: "application/ld+json",
      json: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://aurabeautyeg.com/",
        name: "Aura Beauty - Home",
        description: "Everything Your Clinic Needs – All in One Place.",
        isPartOf: {
          "@type": "WebSite",
          url: "https://aurabeautyeg.com/",
          name: "Aura Beauty",
        },
      },
    },
  ],
};

export default function RootLayout({ children }) {
  const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  return (
    <html lang="en" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className={montserratFont.className}>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
            alt="fb-pixel"
          />
        </noscript>
        <StoreProvider>
          <Preloader />
          <Provider>
            <ReactLenis root />
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
