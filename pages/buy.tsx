import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { GetNFTs, GetAllDataNFTsMarketplace } from "../components/NFT/hook/getNFTs"


const Buy = () => {
  const { listingNFTs: data, isLoading: isLoading } = GetAllDataNFTsMarketplace();

  return (
    <div>
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


export default Buy;