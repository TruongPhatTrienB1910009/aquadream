import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import { GetNFTs, GetAllDataNFTsMarketplace } from "../components/NFT/hook/getNFTs"


export default function Buy() {

  const { listingNFTs: data, isLoading: isLoading } = GetAllDataNFTsMarketplace();

  console.log("data", data);

  return (
    <div>
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </div>
  );
}
