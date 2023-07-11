import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { memo, useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import tokenPageStyles from "../styles/Token.module.css";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import SaleInfo from "../components/SaleInfo/SaleInfo";
import { GetNFTs } from "../components/NFT/hook/getNFTs";
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Sell = () => {
  // Load all of the NFTs from the NFT Collection
  // const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  // const { data, isLoading } = useOwnedNFTs(contract, address);

  const { nftList: data, isLoadingNFTs: isLoading } = GetNFTs(address);
  console.log("data", data);

  const [selectedNft, setSelectedNft] = useState<NFTType>();

  return (
    <Container maxWidth="lg">
      <Breadcrumb className={tokenPageStyles.Breadcrumb}>
        <Breadcrumb.Item className={tokenPageStyles.BreadcrumbSellItem} href="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Sell</Breadcrumb.Item>
      </Breadcrumb>

      {!selectedNft ? (
        <>
          <NFTGrid
            data={data}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft) => {
              setSelectedNft(nft);
            }}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
          />
        </>
      ) : (
        <div className={tokenPageStyles.containerSell} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainerSell}>
            <div className={tokenPageStyles.imageContainerSell}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainerSell}>
            {/* <p>You&rsquo;re about to list the following item for sale.</p> */}
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default memo(Sell);
