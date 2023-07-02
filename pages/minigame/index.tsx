import React from "react";
import styles from "./minigame.module.css";
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(
  () => import("../../components/MiniGame/Timer/CountdownTimer"),
  { ssr: false }
);

import { CONTRACT_MINIGAME } from "../../const/contractAddresses";

const Index = () => {
  const { contract } = useContract(
    "0xf58e3a5A014Db7D8275a872e76D4B63d755b4984"
  );
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  const startDate = new Date("July 3, 2023 14:43:00");
  const dateTimeAfterThreeDays = startDate;
  // hello
  console.log("CONTRACT", contract);
  return (
    <div className={styles.minigameContainer}>
      <div className={styles.leftSide}>
        <div className={styles.nftContainer}>
          {nft !== undefined ? (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.nftImage}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img height={500} src="/images/cardSecret.jpg" alt="" />
          )}
          <p className={styles.nftTokenId}>tokenId: #1</p>
          <p className={styles.nftName}>name nft</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.content}>
          <h1>Total minted: </h1>
          <p className={styles.heading}>Exploring the Deep Sea of BASE NFTs</p>
          <CountdownTimer targetDate={dateTimeAfterThreeDays} />
          <button>Mint NFT</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
