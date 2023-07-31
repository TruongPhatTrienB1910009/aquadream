/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { MARKETPLACE_ADDRESS, NETWORK } from "../../../const/contractAddresses";
import { useContract, useNFT, useNFTs } from "@thirdweb-dev/react";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY as string,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

export const GetNFTs = (account: any) => {
  const [nftList, setNftList] = useState<any[]>([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  // console.log("process.env.MYKEY", process.env.MY_KEY as string)
  let headers = new Headers();
  headers.set("Authorization", `Bearer cqt_rQ46yWprphHwWQX7YMXmpHYC7cDB`);

  useEffect(() => {
    const getNFTs = async () => {
      try {
        setIsLoadingNFTs(true);
        const res = await fetch(
          `https://api.covalenthq.com/v1/base-testnet/address/${account}/balances_nft/?no-spam=true&with-uncached=true`,
          { method: "GET", headers: headers }
        );
        const listNFTs = await res.json();

        const arr: any = [];
        if (listNFTs.data.items.length > 0) {
          listNFTs.data.items.forEach((item: any, i: number) => {
            // console.log("item", item)
            item.nft_data.forEach((nft: any, j: number) => {
              nft.tokenId = nft.token_id;
              nft.owner = nft.original_owner;
              nft.external_data.address = item.contract_address;
              nft.external_data.id = nft.token_id;
              nft.metadata = nft.external_data;
              nft.contract = nft.external_data;
              arr.push(nft);
            });

            setNftList(arr);
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
    getNFTs();
  }, [account]);

  return { nftList, isLoadingNFTs };
};

export const GetAllDataNFTsMarketplace = () => {
  const [listingNFTs, setListingNFTs] = useState<any>([]);
  const [isLoading, setIsloading] = useState(false);
  const sdk = new ThirdwebSDK(NETWORK);
  useEffect(() => {
    async function getData() {
      try {
        setIsloading(true);
        const contract = await sdk.getContract(MARKETPLACE_ADDRESS);
        const allListings: any = await contract.directListings.getAllValid();

        if (allListings.length > 0) {
          allListings.forEach((NFT: any, index: number) => {
            allListings[index].asset.address =
              allListings[index].assetContractAddress;
            allListings[index].metadata = allListings[index].asset;
            allListings[index].metadata.creatorAddress =
              allListings[index].creatorAddress;
          });
          setListingNFTs(allListings);
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

export const getABI = async (contractAddress: string) => {
  try {
    const BASEURL = `https://api-goerli.basescan.org/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
    const response = await fetch(BASEURL);
    const result = await response.json();
    return JSON.stringify(result?.result)
      .replaceAll("\\", "")
      .substring(
        1,
        JSON.stringify(result?.result).replaceAll("\\", "").length - 1
      );
  } catch (error) {
    console.log(error);
  }
};

export const getEventsApi = async (address: any, tokenId: any) => {

  let headers = new Headers();
    headers.set('Authorization', "Bearer cqt_rQ46yWprphHwWQX7YMXmpHYC7cDB")
   
  const res = await fetch(`https://api.covalenthq.com/v1/base-testnet/tokens/${address}/nft_transactions/${tokenId}/?no-spam=false`, {method: 'GET', headers: headers})
  const data = await res.json();
  console.log(data.data.items[0].nft_transactions);
  return data.data.items[0].nft_transactions;
}
