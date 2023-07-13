/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react";
import styles from "./minigame.module.css";
import dynamic from "next/dynamic";

import Skeleton from "../../components/Skeleton/Skeleton";

import {
  useAddress,
  useContract,
  useChainId,
  useNetwork,
} from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
const CountdownTimer = dynamic(
  () => import("../../components/MiniGame/Timer/CountdownTimer"),
  { ssr: false }
);
import { ConnectWallet } from "@thirdweb-dev/react";
import { MINI_GAME_ADDRESS } from "../../const/contractAddresses";
import minigameABI from "../../const/abi/minigame.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import { ethers } from "ethers";
import { Breadcrumb } from "react-bootstrap";

const INITIAL_COUNT = 0;
const Index = () => {
  const { contract: miniGameContract } = useContract(
    MINI_GAME_ADDRESS,
    minigameABI
  );
  const address = useAddress();
  const startDate = new Date("July 15, 2023 14:43:00");
  const dateTimeAfterThreeDays = startDate;
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const chainId = useChainId();
  // read contract
  const [balanceOf, setBalanceOf] = useState(0);
  const [minted, setMinted] = useState(0);
  const [dataNft, setDataNft] = useState<any>([]);
  const [tokenOfOwnerByIndex, setTokenOfOwnerByIndex] = useState(-1);
  const [totalMinted, setTotalMinted] = useState(0);
  //get nftType claim
  const [claim, setClaim] = useState([]);
  // loading
  const [loadingMint, setLoadingMint] = useState(false);
  //loading when change network
  const [loadingChange, setLoadingChange] = useState(false);
  //loading when claim ETH
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prevCountRef = useRef<number>(INITIAL_COUNT);
  // handle status
  const [status, setStatus] = useState({
    statusMessage: "",
    message: "",
  });

  const [openToast, setOpenToast] = useState(false);
  const changeNetwork = async () => {
    try {
      setLoadingChange(true);
      if (!switchNetwork) {
        console.log("can not switch network");
        return;
      }

      const result = await switchNetwork(5);
      if (result.data) {
        console.log("Switched to Goerli testnet successfully");
      } else {
        console.log("Error switching to Mumbai testnet", result.error);
      }
    } catch (e) {
      console.log("Error switching to Mumbai testnet", e);
    } finally {
      setLoadingChange(false);
    }
  };
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
        tokenOfOwner();
        getDataNFT();
      }
    } catch (error) {
      const err = (error as any).info.reason;
      toast(err, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    } finally {
      setLoadingMint(false);
    }
  };
  const claimETH = async () => {
    try {
      setLoadingClaim(true);
      const data = await miniGameContract?.call("claimETH", [], {
        value: 0,
      });
      if (data) {
        toast.success("Claim NFT Successfully", {
          icon: "👍",
          style: toastStyle,
          position: "bottom-center",
        });
        GetClaim();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingClaim(false);
    }
  };
  const checkBalanceOf = async () => {
    if (address) {
      const data = await miniGameContract?.call("balanceOf", [address]);
      if (data) {
        const index = new BigNumber(data.toString()).toNumber();
        if (index === 1) {
          setBalanceOf(1);
        } else {
          setBalanceOf(0);
        }
      }
    }
  };
  const GetClaim = async () => {
    try {
      const data = await miniGameContract?.call("nfts", [tokenOfOwnerByIndex]);
      setClaim(data);
    } catch (error) {
      console.log(error);
    }
  };
  const GetTotalMinted = async () => {
    const data = await miniGameContract?.call("totalSupply", []);
    if (data) {
      const index = new BigNumber(data.toString()).toNumber();
      setTotalMinted(index);
    } else {
      setTotalMinted(0);
    }
  };
  const tokenOfOwner = async () => {
    setIsLoading(false);
    if (address) {
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
    } else {
      setTokenOfOwnerByIndex(-1);
    }
  };

  const getDataNFT = async () => {
    try {
      if (
        tokenOfOwnerByIndex !== -1 &&
        prevCountRef.current !== tokenOfOwnerByIndex
      ) {
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
    } catch (e) {
      console.log(error);
    }
  };

  const checkMinted = async () => {
    try {
      if (address) {
        const data = await miniGameContract?.call("walletMints", [address]);
        const index = new BigNumber(data.toString()).toNumber();
        if (index === 1) {
          setMinted(1);
          setIsLoading(true);
        } else {
          setMinted(0);
          setIsLoading(true);
        }
      } else {
        setMinted(0);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  GetTotalMinted();
  useEffect(() => {
    setDataNft(null);
    if (address !== null) {
      checkMinted();
      tokenOfOwner();
      getDataNFT();
      if (status.message !== "") {
        setOpenToast(true);
      }
      GetTotalMinted();
    }
    GetTotalMinted();
    prevCountRef.current = tokenOfOwnerByIndex;
    if (tokenOfOwnerByIndex !== -1) GetClaim();
  }, [address, minted, status.message, tokenOfOwnerByIndex, totalMinted]);
  // console.log("isLoading", dataNft.name, isLoading);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Breadcrumb className={styles.containerMini}>
        <Breadcrumb.Item className={styles.containerMiniItem} href="/">
          {" "}
          <FontAwesomeIcon icon={faHome} /> Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Mini Game</Breadcrumb.Item>
      </Breadcrumb>

      {minted === 1 && chainId === 5 ? (
        <div className={styles.minigameContainer}>
          <div className={styles.leftSide}>
            {!dataNft || !isLoading ? (
              [...Array(1)].map((_, index) => (
                <div key={index} className={styles.nftContainer}>
                  <Skeleton key={index} width={"100%"} height="512px" />
                </div>
              ))
            ) : (
              <div className={styles.nftContainer}>
                <img className={styles.nftImage} src={dataNft.image} alt="" />

                <p className={styles.nftName}>{dataNft.name}</p>
                {claim[0] > 0 && !claim[1] ? (
                  chainId === 5 ? (
                    <button
                      disabled={loadingClaim}
                      style={{ cursor: (loadingClaim && "not-allowed") || "" }}
                      onClick={() => claimETH()}
                    >
                      Claim{" "}
                      {loadingClaim ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          style={{ color: "#d0d8e7", marginLeft: "10px" }}
                        />
                      ) : (
                        ``
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => changeNetwork()}
                      disabled={loadingChange}
                      style={{ cursor: (loadingChange && "not-allowed") || "" }}
                    >
                      Switch Network{""}
                      {loadingClaim ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          style={{ color: "#d0d8e7", marginLeft: "10px" }}
                        />
                      ) : (
                        ``
                      )}
                    </button>
                  )
                ) : claim[0] === 0 ? (
                  ""
                ) : (
                  <div style={{ width: "200px" }}>
                    <button
                      disabled={true}
                      style={{
                        cursor: "not-allowed",
                        fontSize: "15px",
                      }}
                    >
                      You claimed reward!
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.rightSide}>
            <div className={styles.content}>
              <div id="social_icons">
                <img
                  src="/images/base-groerli.png"
                  alt=""
                  className={styles.icon}
                />
              </div>
              <h1>Total minted: {totalMinted}</h1>
              <p className={styles.heading}>
                Exploring the Deep Sea of BASE NFTs
              </p>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />

              <button
                disabled={true}
                style={{ cursor: "not-allowed", fontSize: "20px" }}
              >
                Minted
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.minigameContainer}>
          <div className={styles.leftSide}>
            {!isLoading && address ? (
              [...Array(1)].map((_, index) => (
                <div key={index} className={styles.nftContainer}>
                  <Skeleton key={index} width={"100%"} height="512px" />
                </div>
              ))
            ) : (
              <div className={styles.nftContainer}>
                <img
                  className={styles.nftImage}
                  src="/images/cardSecret.jpg"
                  alt=""
                />
              </div>
            )}
          </div>
          <div className={styles.rightSide}>
            <div className={styles.content}>
              <div id="social_icons">
                <img
                  src="/images/base-groerli.png"
                  alt=""
                  className={styles.icon}
                />
              </div>
              <h1>Total minted: {totalMinted}</h1>
              <p className={styles.heading}>
                Exploring the Deep Sea of BASE NFTs
              </p>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              <p className={styles.contenta}>Prepare 0.002 ETH to mint</p>
              {chainId === 5 ? (
                <button
                  onClick={() => useMintNFT()}
                  disabled={loadingMint}
                  style={{ cursor: (loadingMint && "not-allowed") || "" }}
                >
                  Mint NFT{" "}
                  {loadingMint ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{ color: "#d0d8e7", marginLeft: "10px" }}
                    />
                  ) : (
                    ``
                  )}
                </button>
              ) : address ? (
                <button
                  onClick={() => changeNetwork()}
                  disabled={loadingChange}
                  style={{ cursor: (loadingChange && "not-allowed") || "" }}
                >
                  Switch Network{""}
                  {loadingChange ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{ color: "#d0d8e7", marginLeft: "10px" }}
                    />
                  ) : (
                    ``
                  )}
                </button>
              ) : (
                <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
