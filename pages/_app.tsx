import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import Container from "../components/Container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider activeChain={NETWORK} supportedChains={[NETWORK]}>
        {/* Progress bar when navigating between pages */}
        <NextNProgress
          color="var(--color-tertiary)"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />

        {/* Render the navigation menu above each component */}
        <Navbar />
        {/* Render the actual component (page) */}
        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
        <Footer />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
