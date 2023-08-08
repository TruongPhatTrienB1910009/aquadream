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
              "https://base-goerli.rpc.thirdweb.com/ZiUOshLFyP-H0HcyEHh1vHisfJz-1a_N1OMuhuJSAXNAifWKT7e7VJhGz7WRLuD5TbXE9GHoGcA4rFjbuYoNUA",
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
