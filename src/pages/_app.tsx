import { AuthProvider } from "../auth";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;
