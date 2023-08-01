/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ConnectWallet,
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useChainId,
  useContract,
  useNetwork,
  useValidDirectListings,
  useValidEnglishAuctions,
  Web3Button,
  useContractEvents
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  ETHERSCAN_URL,
  MARKETPLACE_ADDRESS,
  NETWORK,
} from "../../../const/contractAddresses";
import styles from "../../../styles/Token.module.css";
import Link from "next/link";
import randomColor from "../../../util/randomColor";
import Skeleton from "../../../components/Skeleton/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../../util/toastConfig";
import { useRouter } from "next/router";
import { getABI, getEventsApi } from "../../../components/NFT/hook/getNFTs";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = {
  nft: any;
};

const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default function TokenPage() {
  const [nft, setNFT] = useState<any>();
  const [usdPrice, setUsdPrice] = useState(0);
  const chainId = useChainId();
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  // loading
  const [loadingMint, setLoadingMint] = useState(false);
  //loading when change network
  const [loadingChange, setLoadingChange] = useState(false);
  const address = useAddress();
  const router = useRouter();
  
  const sdk = new ThirdwebSDK({
    ...NETWORK
  });

  // Connect to marketplace smart contract
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );


  async function getEthPrice() {
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      const data = await response.json();
      setUsdPrice(data.USD)
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      return null;
    }
  }

  // Connect to NFT Collection smart contract
  const [nftCollection, setNftCollection] = useState<any>(null);
  const [transferEvents, setTransferEvents] = useState<any>([]);

  const GetABIForNftCollection = async () => {
    const addressContract = router.query.contractAddress as string;
    await getEthPrice();
    if (addressContract) {
      const abi: any = await getABI(addressContract);
      if (abi) {
        const contract = await sdk.getContractFromAbi(
          router.query.contractAddress as string,
          abi
        );

        if (contract) {
          setNftCollection(contract);
          console.log("contract1", contract);
          try {
            const data = await contract.erc721.get(router.query.tokenId as string);
            console.log(router.query.contractAddress as string)
            if (data) {
              setNFT(data)
              // console.log(await contract.events.getAllEvents())
              const events = await getEventsApi(router.query.contractAddress as string, router.query.tokenId as string);

              // try {
              //   const eventsA = await contract.events.getEvents("Transfer", {
              //     filters: {
              //       tokenId: data.metadata.id,
              //     },
              //     order: "desc",
              //   });
  
              //   console.log(eventsA)
              // } catch (error) {
              //   console.log(error)
              // }

              if (events) {
                setTransferEvents(events);
              }
            }
          } catch (error) {
            console.log(error);
            const data = await contract.erc1155.get(router.query.tokenId as string);
            if (data) {
              setNFT(data)
              const events = await getEventsApi(router.query.contractAddress as string, router.query.tokenId as string);

              if (events) {
                setTransferEvents(events);
              }
            }
          }
        }
      }
    }
  };

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: router.query.contractAddress as string,
      tokenId: nft?.metadata.id,
    });


  async function buyListing() {
    let txResult;
    setLoadingMint(true);
    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        parseInt(directListing[0].id),
        1
      );
      setLoadingMint(false);
      console.log("txResult", txResult)
    } else {
      throw new Error("No valid listing found for this NFT");
    }
    return txResult;
  }


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

  var datetimeLocalString;
  if (directListing?.[0]) {
    var referenceDatetime = new Date();
    var targetDatetime = new Date(
      directListing[0].startTimeInSeconds * 1000 +
      (directListing[0].endTimeInSeconds -
        directListing[0].startTimeInSeconds) *
      1000
    );
    var year = targetDatetime.getFullYear();
    var month = (targetDatetime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    var day = targetDatetime.getDate().toString().padStart(2, "0");
    var hours = targetDatetime.getHours().toString().padStart(2, "0");
    var minutes = targetDatetime.getMinutes().toString().padStart(2, "0");

    // Create the datetime-local format string
    datetimeLocalString =
      year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
  }

  useEffect(() => {
    GetABIForNftCollection();
  }, [router.query.contractAddress, directListing?.[0]]);

  return (
    <>
      {
        (nft) ? (
          <>
            <Toaster position="bottom-center" reverseOrder={false} /><Container maxWidth="lg">
              <div className={styles.container}>
                <div className={styles.metadataContainer}>
                  {/* <ThirdwebNftMedia
                    metadata={nft?.metadata}
                    className={styles.imageBuy} /> */}
                  <img src={nft?.metadata.image} className={styles.imageBuy} alt="" />

                  <div className={styles.descriptionContainer}>
                    <h3 className={styles.descriptionTitle}>Description</h3>
                    <p className={styles.description}>{nft?.metadata.description}</p>

                    <h3 className={styles.descriptionTitle}>Traits</h3>

                    <div className={styles.traitsContainer}>
                      {Object.entries(nft?.metadata?.attributes || {}).map(
                        ([key, value]: any) => (
                          <div className={styles.traitContainer} key={key}>
                            {/* <p className={styles.traitName}>{key}</p> */}
                            <p className={styles.traitValue}>
                              {value.trait_type}
                            </p>
                            <p className={styles.traitValue}>
                              {value.value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.listingContainer}>
                  <div className={styles.infoMetadaContainer}>
                    <div className={styles.contractMetadataContainer}>
                      <MediaRenderer
                        src={nft?.metadata.image}
                        className={styles.collectionImage} />

                      <p className={styles.collectionName}>{nft?.metadata.name}</p>
                    </div>

                    <h1 className={styles.title}>{nft?.metadata.name}</h1>
                    <Link
                      href={`/profile/${nft?.owner}`}
                      className={styles.nftOwnerContainer}
                    >
                      {/* Random linear gradient circle shape */}
                      <div
                        className={styles.nftOwnerImage}
                        style={{
                          background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                        }} />
                      <div className={styles.nftOwnerInfo}>
                        <p className={styles.label}>Current Owner</p>
                        <p className={styles.nftOwnerAddress}>
                          {nft?.owner.slice(0, 8)}...{nft?.owner.slice(-4)} {
                            (nft?.owner === (address)) ? ("(you)") : ("")
                          }
                        </p>
                      </div>
                    </Link>

                    <div className={styles.pricingContainer}>
                      {/* Pricing information */}
                      <div className={styles.pricingInfo}>

                        <div className={styles.pricingValue}>
                          {loadingContract || loadingDirect ? (
                            <Skeleton width="120" height="24" />
                          ) : (
                            <>
                              {directListing && directListing[0] ? (
                                <>
                                  <div className={styles.currentprice}>
                                    <p className={styles.label}>Current price</p>
                                    {
                                      directListing[0]?.currencyValuePerToken
                                        .displayValue
                                    }
                                    {" " +
                                      directListing[0]?.currencyValuePerToken.symbol}
                                    {"  ($" +
                                      (Number(directListing[0]?.currencyValuePerToken.displayValue) * usdPrice).toFixed(2) + ")"
                                    }
                                  </div>

                                  <div className={styles.endTime}>
                                    <span>Sale ends</span>
                                    <input
                                      type="datetime-local"
                                      value={datetimeLocalString}
                                      disabled />
                                  </div>
                                </>
                              ) : (
                                "Not for sale"
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {loadingContract || loadingDirect ? (
                      <Skeleton width="100%" height="164" />
                    ) : (
                      <>
                        {chainId === 84531 ? (
                          (directListing?.[0]) && (
                            (directListing?.[0].creatorAddress === address) ? (
                              ""
                            )
                              : (
                                <Web3Button
                                  contractAddress={MARKETPLACE_ADDRESS}
                                  action={async () => await buyListing()}
                                  className={styles.btn}
                                  onSuccess={() => {
                                    toast(`Purchase success!`, {
                                      icon: "✅",
                                      style: toastStyle,
                                      position: "bottom-center",
                                    });
                                  }}
                                  onError={(e) => {
                                    console.log("(e as any).info.reason", (e as any).info.reason)
                                    // (e as any).info.reason !== "user rejected transaction"
                                    //   ? toast(
                                    //     "Please try again. Confirm the transaction and make sure you are paying enough gas!",
                                    //     {
                                    //       icon: "❌",
                                    //       style: toastStyle,
                                    //       position: "bottom-center",
                                    //     }
                                    //   )
                                    //   : "";
                                  }}
                                >
                                  Buy at asking price
                                </Web3Button>
                              )
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
                                style={{ color: "#d0d8e7", marginLeft: "10px" }} />
                            ) : (
                              ``
                            )}
                          </button>
                        ) : (
                          <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.containerHistory}>
                <h3 className={styles.descriptionTitle}>History</h3>

                <div className={styles.traitsContainerHistory}>
                  <Scrollbars style={{ height: 300 }}>
                    {transferEvents?.map((event: any, index: any) => (
                      <div
                        key={event.tx_hash}
                        className={styles.eventsContainer}
                      >
                        <div className={styles.eventContainer}>
                          <p className={styles.traitName}>Event</p>
                          <p className={styles.traitValue}>
                            {
                              // if last event in array, then it's a mint
                              index === transferEvents.length - 1
                                ? "Mint"
                                : "Transfer"}
                          </p>
                        </div>

                        <div className={styles.eventContainer}>
                          <p className={styles.traitName}>From</p>
                          <p className={styles.traitValue}>
                            {
                              (event.log_events[1]) ?
                              (
                                <>
                                  {event.log_events[1].decoded.params[0].value?.slice(0, 4)}...
                                  {event.log_events[1].decoded.params[0].value?.slice(-2)}
                                </>
                              ) : (
                                <>
                                  {event.log_events[0].decoded.params[0].value?.slice(0, 4)}...
                                  {event.log_events[0].decoded.params[0].value?.slice(-2)}
                                </>
                              )
                            }
                          </p>
                        </div>

                        <div className={styles.eventContainer}>
                          <p className={styles.traitName}>To</p>
                          <p className={styles.traitValue}>
                            {/* {event.log_events[0].decoded.params[1].value?.slice(0, 4)}...
                            {event.log_events[0].decoded.params[1].value?.slice(-2)} */}

                            {
                              (event.log_events[1]) ?
                              (
                                <>
                                  {event.log_events[1].decoded.params[1].value?.slice(0, 4)}...
                                  {event.log_events[1].decoded.params[1].value?.slice(-2)}
                                </>
                              ) : (
                                <>
                                  {event.log_events[0].decoded.params[1].value?.slice(0, 4)}...
                                  {event.log_events[0].decoded.params[1].value?.slice(-2)}
                                </>
                              )
                            }
                          </p>
                        </div>

                        <div className={styles.eventContainer}>
                          <Link
                            className={styles.txHashArrow}
                            href={`${ETHERSCAN_URL}/tx/${event.tx_hash}`}
                            target="_blank"
                          >
                            ↗
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Scrollbars>
                </div>
              </div>
            </Container></>
        ) : (
          ''
        )
      }
    </>
  );
}