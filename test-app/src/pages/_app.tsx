import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NhostClient, NhostProvider } from "@nhost/nextjs";
import type { AppProps } from "next/app";

const nhost = new NhostClient({ subdomain: "local" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </NhostProvider>
  );
}
