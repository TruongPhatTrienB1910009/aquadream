import { NFT as NFTType, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "../../styles/Sale.module.css";
import profileStyles from "../../styles/Profile.module.css";
import {
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  useValidDirectListings,
  Web3Button,
  useCancelDirectListing,
  useAddress,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NETWORK,
  NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import { getABI } from "../NFT/hook/getNFTs";
import { ethers } from "ethers";

type Props = {
  nft: any;
};

type AuctionFormData = {
  nftContractAddress: string;
  tokenId: string;
  startDate: Date;
  endDate: Date;
  floorPrice: string;
  buyoutPrice: string;
};

type DirectFormData = {
  nftContractAddress: string;
  tokenId: string;
  price: string;
  startDate: Date;
  endDate: Date;
};

export default function SaleInfo({ nft }: Props) {
  const router = useRouter();
  const [cancel, setCancel] = useState<any>(false);
  const [render, setRender] = useState(false);
  const [usdPrice, setUsdPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const sdk = new ThirdwebSDK(NETWORK);
  // Connect to marketplace contract
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  var today = new Date();

  // Increment the date by 1 to get tomorrow's date
  var tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Get the components of tomorrow's date and time
  var year = tomorrow.getFullYear();
  var month = (tomorrow.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  var day = tomorrow.getDate().toString().padStart(2, "0");
  var hours = tomorrow.getHours().toString().padStart(2, "0");
  var minutes = tomorrow.getMinutes().toString().padStart(2, "0");

  // Create the datetime-local format string
  var datetimeLocalString =
    year + "-" + month + "-" + day + "T" + hours + ":" + minutes;

  // today
  var today1 = new Date(today);
  today1.setDate(today.getDate());
  var year1 = today1.getFullYear();
  var month1 = (today1.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  var day1 = today1.getDate().toString().padStart(2, "0");
  var hours1 = today1.getHours().toString().padStart(2, "0");
  var minutes1 = today1.getMinutes().toString().padStart(2, "0");

  var datetimeLocalStringToday =
    year1 + "-" + month1 + "-" + day1 + "T" + hours1 + ":" + minutes1;

  // convert date
  const convertDate = (date: number) => {
    var datetimeLocalString;

    var referenceDatetime = new Date();
    var targetDatetime = new Date(date * 1000);
    var year = targetDatetime.getFullYear();
    var month = (targetDatetime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    var day = targetDatetime.getDate().toString().padStart(2, "0");
    var hours = targetDatetime.getHours().toString().padStart(2, "0");
    var minutes = targetDatetime.getMinutes().toString().padStart(2, "0");

    // Create the datetime-local format string
    datetimeLocalString =
      year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
    return datetimeLocalString;
  };

  // Hook provides an async function to create a new direct listing
  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  // Manage form submission state using tabs and conditional rendering
  const [tab, setTab] = useState<"direct" | "auction">("direct");

  //switch eth to usd
  async function getEthPrice() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setUsdPrice(Number(data.ethereum.usd))
      
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      return null;
    }
  }
  function handleChange(event: any) {
    let priceNft = Number(event.target.value);
    if (priceNft < 0)
      event.target.value = 0;
    else{
      setPrice(priceNft * usdPrice)
    }
  }
  useEffect(() => {
    getEthPrice();
  },[])
  // User requires to set marketplace approval before listing
  async function checkAndProvideApproval() {
    // Check if approval is required
    const abi: any = await getABI(nft.contract.address)
    if (abi) {
      const nftCollection = await sdk.getContractFromAbi(
        nft.contract.address,
        abi
      );

      const hasApproval = await nftCollection?.call("isApprovedForAll", [
        nft.owner,
        MARKETPLACE_ADDRESS,
      ]
      );
      // If it is, provide approval
      if (!hasApproval) {
        try {
          const txResult = await nftCollection?.call("setApprovalForAll",
            [
              MARKETPLACE_ADDRESS,
              true,
            ]
          );

          if (txResult) {
            toast.success("Marketplace approval granted", {
              icon: "👍",
              style: toastStyle,
              position: "bottom-center",
            });
          }
        } catch (error) {
          console.log("error", error)
        }
      }
      return true;
    }
  }

  // Manage form values using react-hook-form library: Direct form
  const { register: registerDirect, handleSubmit: handleSubmitDirect } =
    useForm<DirectFormData>({
      defaultValues: {
        nftContractAddress: nft.metadata.address as string,
        tokenId: nft.metadata.id,
        startDate: new Date(),
        endDate: new Date(),
      },
    });

  async function handleSubmissionDirect(data: DirectFormData) {
    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    });
    return txResult;
  }

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: nft.metadata.address as string,
      tokenId: nft.metadata.id,
    });

  const {
    mutateAsync: cancelDirectListing,
    isLoading,
    error,
  } = useCancelDirectListing(marketplace);

  useEffect(() => {
    if (cancel) {
      (document.getElementById("endTime") as HTMLInputElement).value = "";
      (document.getElementById("price") as HTMLInputElement).value = "0";
      setCancel(false);
    }

    if (!render) {
      setRender(true);
    }
  }, [cancel, render]);

  return (
    <>
      {directListing?.[0] ? (
        <>
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className={styles.saleInfoContainer} style={{ marginTop: -42 }}>
            {/* Direct listing fields */}
            <div
              className={`${tab === "direct"
                ? styles.activeTabContent
                : profileStyles.tabContent
                }`}
              style={{ flexDirection: "column" }}
            >
              <legend className={styles.legend}> Listing Starts on</legend>
              <input
                className={styles.input}
                type="datetime-local"
                {...registerDirect("startDate")}
                aria-label="Auction Start Date"
                value={convertDate(directListing[0].startTimeInSeconds)}
                disabled
              />

              <legend className={styles.legend}> Listing Ends on </legend>
              <input
                className={styles.input}
                type="datetime-local"
                {...registerDirect("endDate")}
                aria-label="Auction End Date"
                min={datetimeLocalString}
                value={convertDate(directListing[0].endTimeInSeconds)}
                disabled
              />
              <h4 className={styles.formSectionTitle}>Price </h4>

              <input
                id="price"
                className={styles.input}
                type="number"
                step={0.000001}
                value={directListing[0].currencyValuePerToken.displayValue}
                disabled
                {...registerDirect("price")}
              />
              
              <div className={styles.btnContainer}>
                <Web3Button
                  contractAddress={MARKETPLACE_ADDRESS}
                  action={async () => {
                    await cancelDirectListing(directListing[0].id);
                  }}
                  onError={(error: any) => {
                    toast((error as any).info.reason, {
                      icon: "❌",
                      style: toastStyle,
                      position: "bottom-center",
                    });
                  }}
                  onSuccess={(txResult: any) => {
                    toast("Canceled Successfully!", {
                      icon: "🥳",
                      style: toastStyle,
                      position: "bottom-center",
                    });
                    setCancel(true);
                  }}
                  className={styles.btn}
                >
                  Cancel Direct Listing
                </Web3Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className={styles.saleInfoContainer} style={{ marginTop: -42 }}>
            {/* Direct listing fields */}
            <div
              className={`${tab === "direct"
                ? styles.activeTabContent
                : profileStyles.tabContent
                }`}
              style={{ flexDirection: "column" }}
            >
              <legend className={styles.legend}> Listing Starts on</legend>
              <input
                className={styles.input}
                type="datetime-local"
                {...registerDirect("startDate")}
                aria-label="Auction Start Date"
                value={datetimeLocalStringToday}
                disabled
              />

              <legend className={styles.legend}> Listing Ends on </legend>
              <input
                id="endTime"
                className={styles.input}
                type="datetime-local"
                {...registerDirect("endDate")}
                aria-label="Auction End Date"
                min={datetimeLocalString}
              />
              <h4 className={styles.formSectionTitle}>Price </h4>
              <input
                id="price"
                className={styles.input}
                type="number"
                step={0.000001}
                min={0}
                {...registerDirect("price")}
                onChange={handleChange}
              />
              <span style={{marginLeft: '1%'}}>{"  (~$" +(price).toFixed(2) + ")"
                  }</span>
              <div className={styles.btnContainer}>
                <Web3Button
                  contractAddress={MARKETPLACE_ADDRESS}
                  action={async () => {
                    await handleSubmitDirect(handleSubmissionDirect)();
                  }}
                  onError={(error: any) => {
                    toast((error as any).info.reason, {
                      icon: "❌",
                      style: toastStyle,
                      position: "bottom-center",
                    });
                  }}
                  onSuccess={(txResult: any) => {
                    toast("Listed Successfully!", {
                      icon: "🥳",
                      style: toastStyle,
                      position: "bottom-center",
                    });
                    router.push(
                      `/token/${nft.metadata.address}/${nft.metadata.id}`
                    );
                  }}
                  className={styles.btn}
                >
                  Create Direct Listing
                </Web3Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
