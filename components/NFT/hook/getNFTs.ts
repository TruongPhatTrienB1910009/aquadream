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

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.NEXT_PUBLIC_API_KEY_MORALIS,
  });
}

export const GetNFTs = (account: any) => {
  const [nftList, setNftList] = useState<any[]>([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  useEffect(() => {
    const getNFTs = async () => {
      try {
        const nfts_tmp = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: "0x13881",
          format: "decimal",
          mediaItems: false,
          address: account,
        });
        const nfts: any[] = nfts_tmp.toJSON().result!;
        console.log("buy1", nfts);
        console.log("buy1", nfts.length);

        setIsLoadingNFTs(true);
        if (nfts.length > 0) {
          nfts.forEach((nft, index) => {
            nfts[index].metadata = JSON.parse(nfts[index].metadata);
            console.log("Hello33", nfts[index].metadata);
            if (nfts[index].metadata === null) {
              nfts[index].tmpMetadata = nfts[index].metadata || {};
              console.log("Hello");
              nfts[index].tmpMetadata.name = nfts[index].name;
              nfts[index].tmpMetadata.image = nfts[index].token_uri;
              nfts[index].metadata = nfts[index].tmpMetadata;
            }
            nfts[index].owner = `${account}`;
            nfts[index].metadata.id = nfts[index].token_id;
            nfts[index].metadata.address = nfts[index].token_address;
            console.log("nfts[index]", nfts[index].metadata.image);
            setNftList([...nfts]);
          });
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
        const allListings = await contract.directListings.getAll();
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
              arr[index].asset.image = arr[index].metadata.uri;
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
