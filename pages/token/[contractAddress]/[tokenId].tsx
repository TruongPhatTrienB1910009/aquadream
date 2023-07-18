/* eslint-disable react-hooks/exhaustive-deps */
import {
  ConnectWallet,
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useChainId,
  useContract,
  useContractEvents,
  useNetwork,
  useValidDirectListings,
  useValidEnglishAuctions,
  Web3Button,
  useCancelDirectListing,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  ETHERSCAN_URL,
  MARKETPLACE_ADDRESS,
  MINI_GAME_ADDRESS,
  NETWORK,
  NFT_COLLECTION_ADDRESS,
} from "../../../const/contractAddresses";
import styles from "../../../styles/Token.module.css";
import Link from "next/link";
import randomColor from "../../../util/randomColor";
import Skeleton from "../../../components/Skeleton/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../../util/toastConfig";
import { useRouter } from "next/router";
import { getABI } from "../../../components/NFT/hook/getNFTs";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = {
  nft: any;
};

const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default function TokenPage() {
  const [nft, setNFT] = useState<any>();


  const chainId = useChainId();
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  // loading
  const [loadingMint, setLoadingMint] = useState(false);
  //loading when change network
  const [loadingChange, setLoadingChange] = useState(false);
  const address = useAddress();
  const router = useRouter();
  const sdk = new ThirdwebSDK(NETWORK);

  // Connect to marketplace smart contract
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // Connect to NFT Collection smart contract
  const [nftCollection, setNftCollection] = useState<any>(null);
  const [transferEvents, setTransferEvents] = useState<any>([]);


  const GetABIForNftCollection = async () => {
    const addressContract = router.query.contractAddress as string;

    if (addressContract) {
      const abi: any = await getABI(addressContract);
      if (abi) {
        const contract = await sdk.getContractFromAbi(
          router.query.contractAddress as string,
          abi
        );

        if (contract) {
          setNftCollection(contract);
          const data = await contract.erc721.get(router.query.tokenId as string);
          if (data) {
            setNFT(data)
            const events = await contract.events.getEvents("Transfer", {
              filters: {
                tokenId: data.metadata.id,
              },
              order: "desc",
            });

            if (events) {
              setTransferEvents(events);
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
        directListing[0].id,
        1
      );
      setLoadingMint(false);
    } else {
      throw new Error("No valid listing found for this NFT");
      setLoadingMint(false);
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

      const result = await switchNetwork(5);
      if (result.data) {
        console.log("Switched to Goerli testnet successfully");
      } else {
        console.log("Error switching to Goerli testnet", result.error);
      }
    } catch (e) {
      console.log("Error switching to Goerli testnet", e);
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

  if (directListing?.[0]) {
    console.log(directListing[0])
  }

  useEffect(() => {
    GetABIForNftCollection();
  }, [router.query.contractAddress]);

  return (
    <>
      {
        (nft) ? (
          <><Toaster position="bottom-center" reverseOrder={false} /><Container maxWidth="lg">
            <div className={styles.container}>
              <div className={styles.metadataContainer}>
                <ThirdwebNftMedia
                  metadata={nft?.metadata}
                  className={styles.imageBuy} />

                <div className={styles.descriptionContainer}>
                  <h3 className={styles.descriptionTitle}>Description</h3>
                  <p className={styles.description}>{nft?.metadata.description}</p>

                  <h3 className={styles.descriptionTitle}>Traits</h3>

                  <div className={styles.traitsContainer}>
                    {Object.entries(nft?.metadata?.attributes || {}).map(
                      ([key, value]) => (
                        <div className={styles.traitContainer} key={key}>
                          <p className={styles.traitName}>{key}</p>
                          <p className={styles.traitValue}>
                            {value?.toString() || ""}
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
                  <p className={styles.collectionName}>
                    Token ID #{nft?.metadata.id}
                  </p>

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
                        {nft?.owner.slice(0, 8)}...{nft?.owner.slice(-4)}
                      </p>
                    </div>
                  </Link>

                  <div className={styles.pricingContainer}>
                    {/* Pricing information */}
                    <div className={styles.pricingInfo}>
                      <p className={styles.label}>Price</p>
                      <div className={styles.pricingValue}>
                        {loadingContract || loadingDirect ? (
                          <Skeleton width="120" height="24" />
                        ) : (
                          <>
                            {directListing && directListing[0] ? (
                              <>
                                {directListing[0]?.currencyValuePerToken
                                  .displayValue}
                                {" " +
                                  directListing[0]?.currencyValuePerToken.symbol}
                                <div className={styles.endTime}>
                                  <span>End on</span>
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
                      {chainId === 5 ? (
                        (address === directListing?.[0].creatorAddress) ? (
                          <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={() => console.log("you")}
                            className={styles.btn}
                            onSuccess={() => {
                              toast(`Purchase success!`, {
                                icon: "✅",
                                style: toastStyle,
                                position: "bottom-center",
                              });
                            }}
                            onError={(e) => {
                              (e as any).info.reason !== "user rejected transaction"
                                ? toast(
                                  "Please try again. Confirm the transaction and make sure you are paying enough gas!",
                                  {
                                    icon: "❌",
                                    style: toastStyle,
                                    position: "bottom-center",
                                  }
                                )
                                : "";
                            }}
                            isDisabled
                          >
                            you
                          </Web3Button>
                        ) : (
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
                              (e as any).info.reason !== "user rejected transaction"
                                ? toast(
                                  "Please try again. Confirm the transaction and make sure you are paying enough gas!",
                                  {
                                    icon: "❌",
                                    style: toastStyle,
                                    position: "bottom-center",
                                  }
                                )
                                : "";
                            }}
                          >
                            Buy at asking price
                          </Web3Button>
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
                      key={event.transaction.transactionHash}
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
                          {event.data.from?.slice(0, 4)}...
                          {event.data.from?.slice(-2)}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>To</p>
                        <p className={styles.traitValue}>
                          {event.data.to?.slice(0, 4)}...
                          {event.data.to?.slice(-2)}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <Link
                          className={styles.txHashArrow}
                          href={`${ETHERSCAN_URL}/tx/${event.transaction.transactionHash}`}
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
