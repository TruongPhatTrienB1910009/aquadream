import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbart } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import Container from "../components/Container/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain={{
          ...NETWORK,
          rpc: ["https://base-goerli.public.blastapi.io"]
        }}
        supportedChains={[NETWORK]}
      >

        <NextNProgress
          color="var(--color-tertiary)"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />


        <Navbart />

        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
        <Footer />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
