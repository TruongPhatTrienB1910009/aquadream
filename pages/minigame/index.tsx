/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './minigame.module.css';

import dynamic from 'next/dynamic';
const CountdownTimer = dynamic(
    () => import('../../components/MiniGame/Timer/CountdownTimer'),
    { ssr: false }
)
import { UseMintNFT } from './hook/useMintNFT';

const Index = () => {
    const { MintNFT, pendingMint } = UseMintNFT();

    const startDate = new Date('July 3, 2023 14:43:00');
    const dateTimeAfterThreeDays = startDate;

    return (
        <div className={styles.minigameContainer}>
            <div className={styles.leftSide}>
                <div className={styles.nftContainer}>
                    <img className={styles.nftImage} src="/images/logo.png" alt="" />
                    <p className={styles.nftTokenId}>tokenId: #1</p>
                    <p className={styles.nftName}>name nft</p>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.content}>
                    <h1>Total minted: </h1>
                    <p className={styles.heading}>Exploring the Deep Sea of BASE NFTs</p>
                    <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                    <button onClick={() => MintNFT()}>
                        {
                            pendingMint ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" /></svg>
                            ) : (`Mint NFT`)
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Index