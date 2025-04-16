import "@/styles/globals.css";
import "swiper/css";
import { montserratFont } from "@/lang/lang";
import Footer from "@/appComponents/sections/footer";
import Navbar from "@/appComponents/sections/navbar";
import { Provider } from "@/components/ui/provider";
import StoreProvider from "./StoreProvider";
import ReactLenis from "lenis/react";
import Preloader from "./components/animations/preloader";
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
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
