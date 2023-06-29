import React from "react";
import styles from "./minigame.module.css";
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(
  () => import("../../components/MiniGame/Timer/CountdownTimer"),
  { ssr: false }
);

export class AppComponent {
  title = "angular-ui";
  imagesrc = "../../const/images/cardSecret.jpg";
}

const Index = () => {
  const { contract } = useContract(
    "0xfa9b53553e528DBb97E9c27ebE87F938E4D0bB96"
  );
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  const startDate = new Date("July 3, 2023 14:43:00");
  const dateTimeAfterThreeDays = startDate;
  // hello
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
            <Image {src: "imagesrc"} height="26"/>

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
