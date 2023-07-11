import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import {
  GetNFTs,
  GetAllDataNFTsMarketplace,
} from "../components/NFT/hook/getNFTs";
import { Breadcrumb } from "react-bootstrap";
import tokenPageStyles from "../styles/Token.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Buy = () => {
  const { listingNFTs: data, isLoading: isLoading } =
    GetAllDataNFTsMarketplace();
  return (
    <>
      <Breadcrumb className={tokenPageStyles.Breadcrumb}>
        <Breadcrumb.Item className={tokenPageStyles.BreadcrumbSellItem} href="/">
          {" "}
          <FontAwesomeIcon icon={faHome} /> Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Buy</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <NFTGrid
          data={data}
          isLoading={isLoading}
          emptyText={
            "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
          }
        />
      </div>
    </>
  );
};

export default Buy;
