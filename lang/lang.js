import {
  Geist_Mono,
  Dancing_Script,
  Great_Vibes,
  Montserrat,
  Abril_Fatface,
} from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserratFont = Montserrat({
  variable: "--montserrat",
  subsets: ["latin"],
});
const fatfaceFont = Abril_Fatface({
  variable: "--Abril_Fatface",
  subsets: ["latin"],
  weight: "400",
});

export { geistMono, montserratFont, fatfaceFont };
