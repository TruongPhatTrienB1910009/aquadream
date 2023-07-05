import { useContract, useNFT } from "@thirdweb-dev/react";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import { NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import NFT from "../NFT/NFT";
import Skeleton from "../Skeleton/Skeleton";
import { getABI } from "../NFT/hook/getNFTs";

type Props = {
  listing: DirectListingV3 | EnglishAuction;
  abi: any;
};

/**
 * Accepts a listing and renders the associated NFT for it
 */
export default function ListingWrapper({ listing, abi }: Props) {

  const { contract: nftContract } = useContract(listing.assetContractAddress, abi);

  const { data: nft, isLoading } = useNFT(nftContract, listing.asset.id);

  if (nft) {
    nft.metadata.address = listing.assetContractAddress;
  }

  if (isLoading) {
    return (
      <div className={styles.nftContainer}>
        <Skeleton width={"100%"} height="312px" />
      </div>
    );
  }



  if (!nft) return null;

  return (
    <Link
      href={`/token/${listing.assetContractAddress}/${nft.metadata.id}`}
      key={nft.metadata.id}
      className={styles.nftContainer}
    >
      <NFT nft={nft} />
    </Link>
  );
}
