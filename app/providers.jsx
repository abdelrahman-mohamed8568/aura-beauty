// app/providers.js
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme/theme"; // تأكد من المسار الصحيح

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
