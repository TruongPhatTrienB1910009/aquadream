import type { AppProps } from "next/app";
import { ThirdwebProvider, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Navbart } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import Container from "../components/Container/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useLocation } from "react-router-dom";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain={
          {
            "name": "Base Goerli Testnet",
            "chain": "ETH",
            "rpc": [
              "https://base-goerli.rpc.thirdweb.com",
              "https://goerli.base.org",
              "https://base-goerli.blockscout.com/"
            ],
            "faucets": [
              "https://www.coinbase.com/faucets/base-ethereum-goerli-faucet"
            ],
            "nativeCurrency": {
              "name": "Goerli Ether",
              "symbol": "ETH",
              "decimals": 18
            },
            "infoURL": "https://base.org",
            "shortName": "basegor",
            "chainId": 84531,
            "networkId": 84531,
            "icon": {
              "url": "ipfs://QmW5Vn15HeRkScMfPcW12ZdZcC2yUASpu6eCsECRdEmjjj/base-512.png",
              "height": 512,
              "width": 512,
              "format": "png"
            },
            "explorers": [
              {
                "name": "basescout",
                "url": "https://base-goerli.blockscout.com",
                "icon": {
                  "url": "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
                  "width": 551,
                  "height": 540,
                  "format": "png"
                },
                "standard": "EIP3091"
              },
              {
                "name": "basescan",
                "url": "https://goerli.basescan.org",
                "standard": "none"
              }
            ],
            "testnet": true,
            "slug": "base-goerli"
          }
        }
        supportedChains={[NETWORK]}
        clientId="f0b31bf9f18c5fe4f8e10b51fc47a1f03b6a4f9b459728ab9b035bf41ee9e369376b3ab0f9d01e401d14e1a919b97fd09cad5d8a40afa76ec9ac4e164b5fb3c4"
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
