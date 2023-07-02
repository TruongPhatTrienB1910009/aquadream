/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styles from './minigame.module.css';
import dynamic from 'next/dynamic';
import { useAddress, useContract } from "@thirdweb-dev/react";
const CountdownTimer = dynamic(
    () => import('../../components/MiniGame/Timer/CountdownTimer'),
    { ssr: false }
)
import { MINI_GAME_ADDRESS } from '../../const/contractAddresses';
import minigameABI from "../../const/abi/minigame.json";
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";

const Index = () => {
    const { contract: miniGameContract } = useContract(MINI_GAME_ADDRESS, minigameABI);
    const address = useAddress();
    const startDate = new Date('July 3, 2023 14:43:00');
    const dateTimeAfterThreeDays = startDate;


    // read contract
    const [balanceOf, setBalanceOf] = useState(0);

    // loading
    const [loadingMint, setLoadingMint] = useState(false);

    // handle status
    const [status, setStatus] = useState({
        statusMessage: '',
        message: ''
    })

    const [openToast, setOpenToast] = useState(false);


    const useMintNFT = async () => {
        try {
            setLoadingMint(true);
            const data = await miniGameContract?.call("mintNFT", [], {
                gasLimit: 1000000,
                value: ethers.utils.parseEther("0.002")
            })
            if (data) {
                toast.success("Mint NFT Successfully", {
                    icon: "👍",
                    style: toastStyle,
                    position: "bottom-center",
                });
            }
        } catch (error) {
            const err = (error as Error).message;
            toast(`Mint NFT Failed!`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        } finally {
            setLoadingMint(false);
        }
    }

    const checkBalanceOf = async () => {
        const data = await miniGameContract?.call("balanceOf", [address]);
        if (data) {
            if (data.toNumber() > 0 && balanceOf == 0) {
                setBalanceOf(data.toNumber());
            }
        }
    }

    useEffect(() => {
        checkBalanceOf();
        if (status.message !== '') {
            setOpenToast(true);
        }
    }, [address, balanceOf, status.message])

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
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
                        {
                            (balanceOf) ? (
                                <button>
                                    Minted
                                </button>
                            ) : (
                                <button onClick={() => useMintNFT()}>
                                    {
                                        loadingMint ? (
                                            <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#d0d8e7" }} />
                                        ) : (`Mint NFT`)
                                    }
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index