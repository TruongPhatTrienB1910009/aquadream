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

// import Moralis from "moralis";
// import { EvmChain } from "@moralisweb3/common-evm-utils";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

export const GetNFTs = (account: any) => {
  const [nftList, setNftList] = useState<any[]>([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);

  useEffect(() => {
    const getNFTs = async () => {
      try {
        setIsLoadingNFTs(true);
        const nfts: any[] = (await alchemy.nft.getNftsForOwner(account)).ownedNfts;
        if (nfts.length > 0) {
          nfts.forEach((nft, index) => {
            nfts[index].rawMetadata.id = nfts[index].tokenId
            const search = nfts[index].rawMetadata.image.search("ipfs:/");
            if (search != -1) {
              let x = `https://alchemy.mypinata.cloud/${nfts[index].rawMetadata.image}`
              nfts[index].rawMetadata.image = x.replace("ipfs:/", "ipfs");
            }
            nfts[index].owner = `${account}`
            nfts[index].rawMetadata.address = nfts[index].contract.address;
            nfts[index].metadata = nfts[index].rawMetadata;
          })
          setNftList([...nfts])
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingNFTs(false);
      }
    }
    getNFTs();
  }, [account])

  return { nftList, isLoadingNFTs }
}

// export const GetNFTs = (account: any) => {
//   const [nftList, setNftList] = useState<any[]>([]);
//   const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
//   useEffect(() => {
//     const getNFTs = async () => {
//       try {
//         const nfts_tmp = await Moralis.EvmApi.nft.getWalletNFTs({
//           chain: "0x13881",
//           format: "decimal",
//           mediaItems: false,
//           address: account,
//         });
//         const nfts: any[] = nfts_tmp.toJSON().result!;
//         console.log("buy1", nfts);
//         console.log("buy1", nfts.length);

//         setIsLoadingNFTs(true);
//         if (nfts.length > 0) {
//           nfts.forEach((nft, index) => {
//             nfts[index].metadata = JSON.parse(nfts[index].metadata);
//             console.log("Hello33", nfts[index].metadata);
//             if (nfts[index].metadata === null) {
//               nfts[index].tmpMetadata = nfts[index].metadata || {};
//               console.log("Hello");
//               nfts[index].tmpMetadata.name = nfts[index].name;
//               nfts[index].tmpMetadata.image = nfts[index].token_uri;
//               nfts[index].metadata = nfts[index].tmpMetadata;
//             }
//             nfts[index].owner = `${account}`;
//             nfts[index].metadata.id = nfts[index].token_id;
//             nfts[index].metadata.address = nfts[index].token_address;
//             console.log("nfts[index]", nfts[index].metadata.image);
//             setNftList([...nfts]);
//           });
//         } else {
//           setNftList([]);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoadingNFTs(false);
//       }
//     };
//     if (account) {
//       getNFTs();
//     } else {
//       setNftList([]);
//     }
//   }, [account]);
//   console.log("nftList", nftList);
//   return { nftList, isLoadingNFTs };
// };

export const GetAllDataNFTsMarketplace = () => {
  const [listingNFTs, setListingNFTs] = useState<any>([]);
  const [isLoading, setIsloading] = useState(false);
  const sdk = new ThirdwebSDK(NETWORK);
  useEffect(() => {
    async function getData() {
      try {
        setIsloading(true);
        const contract = await sdk.getContract(MARKETPLACE_ADDRESS);
        const allListings = await contract.directListings.getAllValid();
        const arr: any = [...allListings];
        if (arr.length > 0) {
          arr.forEach((NFT: any, index: string | number) => {
            arr[index].asset.address = arr[index].assetContractAddress
            arr[index].metadata = arr[index].asset
          })
          setListingNFTs(arr);
        } else {
          setListingNFTs([]);
        }
        getData();

      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false);
      }
    }
  });

  return { listingNFTs, isLoading }
}


export const getABI = async (contractAddress: string) => {
  try {
    const BASEURL = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    const response = await fetch(BASEURL);
    const result = await response.json();
    return JSON.stringify(result?.result).replaceAll("\\", "").substring(1, JSON.stringify(result?.result).replaceAll("\\", "").length - 1);
  } catch (error) {
    console.log(error)
  }
}
