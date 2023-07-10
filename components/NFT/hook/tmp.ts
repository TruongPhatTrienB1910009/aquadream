/* eslint-disable react-hooks/exhaustive-deps */
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import {
  MARKETPLACE_ADDRESS,
  NETWORK,
  MarketNETWORK,
} from "../../../const/contractAddresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(settings);

export const GetNFTs = (account: any) => {
  const [nftList, setNftList] = useState<any[]>([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  useEffect(() => {
    const getNFTs = async () => {
      try {
        const nfts: any[] = (await alchemy.nft.getNftsForOwner(account))
          .ownedNfts;
        setIsLoadingNFTs(true);
        if (nfts.length > 0) {
          nfts.forEach((nft, index) => {
            nfts[index].rawMetadata.id = nfts[index].tokenId;
            if (nfts[index].rawMetadata.image != undefined) {
              nfts[
                index
              ].rawMetadata.image = `${nfts[index].rawMetadata.image}`;
              nfts[index].rawMetadata.image = nfts[
                index
              ].rawMetadata.image.replace("ipfs:/", "ipfs");
            } else {
              nfts[index].rawMetadata.image = nfts[index].rawMetadata.uri;
            }
            nfts[index].owner = `${account}`;
            nfts[index].rawMetadata.address = nfts[index].contract.address;
            nfts[index].metadata = nfts[index].rawMetadata;
            console.log("nfts[index]", nfts[index].metadata.image);
          });
          setNftList([...nfts]);
        } else {
          setNftList([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingNFTs(false);
      }
    };
    if (account) {
      getNFTs();
    } else {
      setNftList([]);
    }
  }, [account]);
  console.log("nftList", nftList);
  return { nftList, isLoadingNFTs };
};

export const GetAllDataNFTsMarketplace = () => {
  const [listingNFTs, setListingNFTs] = useState<any>([]);
  const [isLoading, setIsloading] = useState(false);
  const sdk = new ThirdwebSDK(MarketNETWORK);
  useEffect(() => {
    async function getData() {
      try {
        setIsloading(true);
        const contract = await sdk.getContract(MARKETPLACE_ADDRESS);
        const allListings = await contract.directListings.getAllValid();
        console.log("allListings", allListings);
        const arr: any = [...allListings];
        console.log("arr", arr);
        // if (arr.length > 0) {
        //   arr.forEach((NFT: any, index: string | number) => {
        //     arr[index].asset.address = arr[index].assetContractAddress;
        //     arr[index].metadata = arr[index].asset;
        //   });
        //   setListingNFTs(arr);
        // } else {
        //   setListingNFTs([]);
        // }
        if (arr.length > 0) {
          arr.forEach((NFT: any, index: string | number) => {
            arr[index].asset.address = arr[index].assetContractAddress;
            arr[index].metadata = arr[index].asset;
            console.log("arr[index].asset.image", arr[index].asset.image);
            console.log("arr[index].metadata.image", arr[index].metadata.image);
            if (arr[index].asset.image === undefined) {
              arr[index].metadata.image = arr[index].metadata.uri;
            }
          });
          setListingNFTs(arr);
        } else {
          setListingNFTs([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getData();
  }, []);
  return { listingNFTs, isLoading };
};
