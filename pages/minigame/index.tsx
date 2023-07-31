/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react";
import styles from "./minigame.module.css";
import dynamic from "next/dynamic";
import { MediaRenderer, useOwnedNFTs } from "@thirdweb-dev/react";

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
import Link from "next/link";

const INITIAL_COUNT = 0;
const Index = () => {
  const { contract: miniGameContract } = useContract(
    MINI_GAME_ADDRESS,
    minigameABI
  );
  const address = useAddress();
  const startDate = new Date("July 30, 2023 14:43:00");

  const dateTimeAfterThreeDays = startDate;
  const [time, setTime] = useState(0);
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

  const { data: NFTs } = useOwnedNFTs(miniGameContract, address);

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

      const result = await switchNetwork(84531);
      if (result.data) {
        console.log("Switched to Base Goerli testnet successfully");
      } else {
        console.log("Error switching to Base Goerli testnet", result.error);
      }
    } catch (e) {
      console.log("Error switching to Base Goerli testnet", e);
    } finally {
      setLoadingChange(false);
    }
  };

  const checkDate = async () => {
    if (dateTimeAfterThreeDays) {
      if (Date.now().valueOf() - dateTimeAfterThreeDays.valueOf() >= 0) {
        setTime(1);
      } else {
        setTime(0);
      }
    } else {
      setTime(0);
    }
  };
  const useMintNFT = async () => {
    try {
      setLoadingMint(true);
      const data = await miniGameContract?.call("mintNFT", [], {
        gasLimit: 223900,
        value: ethers.utils.parseEther("0.00065"),
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
        setBalanceOf(index);
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
  getDataNFT();
  checkBalanceOf();
  useEffect(() => {
    setDataNft(null);
    checkDate();
    if (address !== null) {
      checkMinted();
      tokenOfOwner();
      checkBalanceOf();
      if (status.message !== "") {
        setOpenToast(true);
      }
      GetTotalMinted();
    }
    GetTotalMinted();
    prevCountRef.current = tokenOfOwnerByIndex;
    if (tokenOfOwnerByIndex !== -1) GetClaim();
  }, [
    address,
    minted,
    status.message,
    tokenOfOwnerByIndex,
    totalMinted,
    balanceOf,
    time,
  ]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Breadcrumb className={styles.containerMini}>
        <Breadcrumb.Item active className={styles.containerMiniItem}>
          <Link href="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Mini Game</Breadcrumb.Item>
      </Breadcrumb>

      {balanceOf > 0 && minted === 1 && chainId === 84531 ? (
        <div className={styles.minigameContainer}>
          <div className={styles.leftSide}>
            {!dataNft || !isLoading ? (
              [...Array(1)].map((_, index) => (
                <div key={index} className={styles.nftContainer}>
                  <Skeleton key={index} width={"100%"} height="412px" />
                </div>
              ))
            ) : (
              <div className={styles.nftContainer}>
                <MediaRenderer
                  style={{
                    width: "360px",
                    height: "360px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.04)",
                    objectFit: "cover",
                  }}
                  src={dataNft.image}
                  alt=""
                />
                <p className={styles.nftName}>{dataNft.name}</p>
                {claim[0] > 0 && !claim[1] ? (
                  chainId === 84531 ? (
                    <button
                      disabled={loadingClaim}
                      style={{
                        cursor: (loadingClaim && "not-allowed") || "",
                        width: "120px",
                      }}
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
                        backgroundColor: "#e6e8ec",
                        borderColor: "#e6e8ec",
                        boxShadow: "none",
                        color: "#777e91",
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
              {/* <div id="social_icons">
                <img
                  src="/images/base-groerli.png"
                  alt=""
                  className={styles.icon}
                />
              </div> */}
              <h1>Lucky octopus</h1>
              <div
                style={{
                  marginTop: "20px",
                  display: "inline",
                  float: "right",
                  marginBottom: "20px",
                  fontSize: "18px",
                }}
              >
                When you mint an NFT, you will receive a Silver NFT or a Gold
                NFT. If you get a silver NFT you will be able to win 0.004 ETH,
                if you mint NFT you will be able to win 0.005 ETH and you can
                claim immediately to your wallet.
              </div>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              <div
                style={{
                  fontSize: "22px",
                  margin: "0px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Total minted: {totalMinted}
              </div>
              <button
                disabled={true}
                style={{
                  cursor: "not-allowed",
                  fontSize: "20px",
                  backgroundColor: "#e6e8ec",
                  borderColor: "#e6e8ec",
                  boxShadow: "none",
                  color: "#777e91",
                }}
              >
                Minted
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.minigameContainer}>
          <div className={styles.leftSide}>
            {!isLoading && address && tokenOfOwnerByIndex !== -1 ? (
              [...Array(1)].map((_, index) => (
                <div key={index} className={styles.nftContainer}>
                  <Skeleton key={index} width={"100%"} height="522px" />
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
              <h1>Lucky octopus</h1>
              <div
                className={styles.contenta}
                style={{
                  marginBottom: "20px",
                  display: "inline",
                  float: "right",
                  marginTop: "20px",
                  fontSize: "18px",
                }}
              >
                When you mint an NFT, you will receive a Silver NFT or a Gold
                NFT. If you get a silver NFT you will be able to win 0.004 ETH,
                if you mint NFT you will be able to win 0.005 ETH and you can
                claim immediately to your wallet.
              </div>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />

              <p
                style={{
                  fontSize: "22px",
                  margin: "0px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Total minted: {totalMinted}
              </p>
              <p
                className={styles.contenta}
                style={{ fontSize: "18px", marginTop: "10px" }}
              >
                Prepare 0.00065 ETH to mint
              </p>
              {chainId === 84531 ? (
                minted === 0 ? (
                  time === 0 ? (
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
                  ) : (
                    ""
                  )
                ) : (
                  <button
                    disabled={true}
                    style={{
                      cursor: "not-allowed",
                      fontSize: "20px",
                      backgroundColor: "#e6e8ec",
                      borderColor: "#e6e8ec",
                      boxShadow: "none",
                      color: "#777e91",
                    }}
                  >
                    Minted
                  </button>
                )
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
