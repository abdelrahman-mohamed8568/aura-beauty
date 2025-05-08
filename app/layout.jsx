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
  description: "Beauty store advanced products and devices",
};

export default function RootLayout({ children }) {
  const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  return (
    <html lang="en" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
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
      </head>
      <body className={montserratFont.className}>
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
