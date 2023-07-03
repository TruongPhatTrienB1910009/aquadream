/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./minigame.module.css";
import dynamic from "next/dynamic";
import { useAddress, useContract } from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
const CountdownTimer = dynamic(
  () => import("../../components/MiniGame/Timer/CountdownTimer"),
  { ssr: false }
);
import { MINI_GAME_ADDRESS } from "../../const/contractAddresses";
import minigameABI from "../../const/abi/minigame.json";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";

const Index = () => {
  const { contract: miniGameContract } = useContract(
    MINI_GAME_ADDRESS,
    minigameABI
  );
  const address = useAddress();
  const startDate = new Date("July 30, 2023 14:43:00");
  const dateTimeAfterThreeDays = startDate;

  // read contract
  const [balanceOf, setBalanceOf] = useState(0);
  const [minted, setMinted] = useState(0);
  const [dataNft, setDataNft] = useState<any>([]);
  const [tokenOfOwnerByIndex, setTokenOfOwnerByIndex] = useState(-1);
  const [totalMinted, setTotalMinted] = useState(-1);

  // loading
  const [loadingMint, setLoadingMint] = useState(false);

  // handle status
  const [status, setStatus] = useState({
    statusMessage: "",
    message: "",
  });

  const [openToast, setOpenToast] = useState(false);

  const useMintNFT = async () => {
    try {
      setLoadingMint(true);
      const data = await miniGameContract?.call("mintNFT", [], {
        gasLimit: 1000000,
        value: ethers.utils.parseEther("0.002"),
      });
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
  };

  const checkBalanceOf = async () => {
    const data = await miniGameContract?.call("balanceOf", [address]);
    if (data) {
      const index = new BigNumber(data.toString()).toNumber();
      if (index === 1) {
        setBalanceOf(1);
      } else {
        setBalanceOf(0);
      }
    }
  };

  const GetTotalMinted = async () => {
    const data = await miniGameContract?.call("totalSupply", []);
    if (data) {
      const index = new BigNumber(data.toString()).toNumber();
      setTotalMinted(index);
    } else {
      setTotalMinted(-1);
    }
  };

  const tokenOfOwner = async () => {
    try {
      const data = await miniGameContract?.call("tokenOfOwnerByIndex", [
        address,
        0,
      ]);
      const index = new BigNumber(data.toString()).toNumber();
      if (index !== -1) {
        setTokenOfOwnerByIndex(index);
      }
    } catch (e) {
      console.log(e);
      setTokenOfOwnerByIndex(-1);
    }
  };

  const getDataNFT = async () => {
    console.log("hi", tokenOfOwnerByIndex);
    if (tokenOfOwnerByIndex !== -1) {
      const data = await miniGameContract?.call("tokenURI", [
        tokenOfOwnerByIndex,
      ]);
      if (data !== undefined) {
        fetch(data)
          .then((res) => res.json())
          .then((data) => {
            setDataNft(data);
          });
      }
    }
  };

  const checkMinted = async () => {
    try {
      if (address) {
        const data = await miniGameContract?.call("walletMints", [address]);
        const index = new BigNumber(data.toString()).toNumber();
        if (index === 1) {
          setMinted(1);
        } else {
          setMinted(0);
        }
      } else {
        setMinted(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkBalanceOf();
    checkMinted();
    tokenOfOwner();
    getDataNFT();
    GetTotalMinted();
    console.log("minted", minted);
    if (status.message !== "") {
      setOpenToast(true);
    }
  }, [address, balanceOf, minted, status.message, tokenOfOwnerByIndex]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {minted === 1 ? (
        <div className={styles.minigameContainer}>
          <div className={styles.leftSide}>
            <div className={styles.nftContainer}>
              <img className={styles.nftImage} src={dataNft.image} alt="" />
              <p className={styles.nftName}>{dataNft.name}</p>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.content}>
              <h1>Total minted: {totalMinted}</h1>
              <p className={styles.heading}>
                Exploring the Deep Sea of BASE NFTs
              </p>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              <button>Minted</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.minigameContainer}>
          <div className={styles.leftSide}>
            <div className={styles.nftContainer}>
              <img
                className={styles.nftImage}
                src="/images/cardSecret.jpg"
                alt=""
              />
              <p className={styles.nftName}>SecretCard</p>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.content}>
              <h1>Total minted: {totalMinted}</h1>
              <p className={styles.heading}>
                Exploring the Deep Sea of BASE NFTs
              </p>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              <button onClick={() => useMintNFT()}>
                {loadingMint ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    style={{ color: "#d0d8e7" }}
                  />
                ) : (
                  `Mint NFT`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
