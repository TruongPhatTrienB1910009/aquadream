/* eslint-disable react-hooks/exhaustive-deps */
import {
  useContract,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
import NFTGrid from "../../components/NFT/NFTGrid";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";
import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";
import { useAddress } from "@thirdweb-dev/react";
import { GetNFTs, getABI } from "../../components/NFT/hook/getNFTs";
import { Tab, Tabs } from "react-bootstrap";

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

export default function ProfilePage() {
  const router = useRouter();
  const account = useAddress();
  const [abiList, setAbiList] = useState<any>([]);
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions">("nfts");

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { nftList: ownedNfts, isLoadingNFTs: loadingOwnedNfts } = GetNFTs(
    router.query.address
  );

  const { data: directListings, isLoading: loadingDirects } =
    useValidDirectListings(marketplace, {
      seller: router.query.address as string,
    });

  const getABIFromAddress = async () => {
    if (directListings) {
      let arr: any = [];
      directListings.map(async (NFT, index) => {
        arr[index] = await getABI(NFT.assetContractAddress);
        setAbiList((oldValue: any) => {
          return [...oldValue, arr[index]];
        });
      });
    }
  };

  useEffect(() => {
    if (account !== router.query.address) {
      router.push(`/profile/${account}`);
    }
    getABIFromAddress();
  }, [account, directListings?.length]);

  return (
    <>
      <div className={styles.profileHeader}>
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />
        <h1 className={styles.profileName}>
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>
      <div>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className="mb-3 mt-3"
        >
          <Tab eventKey="home" title="NFTs">
            <NFTGrid
              data={ownedNfts}
              isLoading={loadingOwnedNfts}
              emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
            />
          </Tab>
          <Tab
            eventKey="Listings"
            title="Listings"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1%",
              width: "100%",
              textDecoration: "none",
            }}
          >
            {/* <div className={styles.nftGridContainer}> */}
            {loadingDirects ? (
              <p>Loading...</p>
            ) : directListings && directListings.length === 0 ? (
              <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
            ) : (
              directListings?.map((listing, index) => (
                <ListingWrapper
                  listing={listing}
                  abi={abiList[index]}
                  key={listing.id}
                />
              ))
            )}
            {/* </div> */}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
