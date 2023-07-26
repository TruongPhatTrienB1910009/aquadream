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
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setUsdPrice(data.ethereum.usd)
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        return null;
      }
    }

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
    }, [])
    return (
      <>
        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />

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
                    (Number(directListing[0]?.currencyValuePerToken.displayValue) * usdPrice).toFixed(2) + ")"
                  }
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
