import "@/styles/globals.css";
import "swiper/css";
import Preloader from "./components/animations/preloader";
import Navbar from "@/appComponents/sections/navbar";
import { Provider } from "@/components/ui/provider";
import Footer from "@/appComponents/sections/footer";
import { montserratFont } from "@/lang/lang";
import StoreProvider from "./StoreProvider";
import ReactLenis from "lenis/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata = {
  title: "Aura Beauty",
  description: "Beauty store advanced products and devices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className={montserratFont.className}>
        <StoreProvider>
          <Preloader />
          <Provider>
            <ReactLenis root />
            <Navbar />
            {children}
            <Footer />
            <SpeedInsights />
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
