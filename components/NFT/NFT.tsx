/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React, { memo, useEffect, useState } from "react";
import { MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./NFT.module.css";
import Card from "react-bootstrap/Card";

type Props = {
  nft: NFT;
};

const NFTComponent = React.memo(
  ({ nft }: Props) => {
    const [usdPrice, setUsdPrice] = useState(0);
    async function getEthPrice() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
        );
        const data = await response.json();
        setUsdPrice(data.USD);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
        return null;
      }
    }
    let USDollar = new Intl.NumberFormat("en-DE");
    const { contract: marketplace, isLoading: loadingContract } = useContract(
      MARKETPLACE_ADDRESS,
      "marketplace-v3" // contract-type.
    );
    // 1. Load if the NFT is for direct listing
    const { data: directListing, isLoading: loadingDirect } =
      useValidDirectListings(marketplace, {
        tokenContract: `${nft.metadata.address}`,
        tokenId: nft.metadata.id,
      });

    // 2. Load if the NFT is for auction
    const { data: auctionListing, isLoading: loadingAuction } =
      useValidEnglishAuctions(marketplace, {
        tokenContract: `${nft.metadata.address}`,
        tokenId: nft.metadata.id,
      });

    useEffect(() => {
      getEthPrice();
    }, []);
    return (
      <>
        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
        {/* <img src={`${nft.metadata.image}`} className={styles.nftImage} alt="" /> */}
        {/* <img src="" alt="" /> */}

        {/* <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p> */}
        <p className={styles.nftName}>{nft.metadata.name}</p>

        <div className={styles.priceContainer}>
          {loadingContract || loadingDirect ? (
            <Skeleton width="100%" height="100%" />
          ) : directListing && directListing[0] ? (
            <div className={styles.nftPriceContainer}>
              <div>
                <p className={styles.nftPriceValue}>
                  {`${directListing[0]?.currencyValuePerToken.displayValue}
          ${directListing[0]?.currencyValuePerToken.symbol}`}
                  {"  ($" +
                    USDollar.format(
                      Number(
                        (
                          Number(
                            directListing[0].currencyValuePerToken.displayValue
                          ) * usdPrice
                        ).toFixed(2)
                      )
                    ) +
                    ")"}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.nftPriceContainer}>
              <div>
                <p className={styles.nftPriceValue}>Not for sale</p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps === nextProps) {
      return true;
    }
    return false;
  }
);

export default NFTComponent;
