/* eslint-disable react-hooks/exhaustive-deps */
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect, useState } from "react";
import { Network, Alchemy } from 'alchemy-sdk';
import { MARKETPLACE_ADDRESS, NETWORK } from "../../../const/contractAddresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";


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
                        nfts[index].rawMetadata.image = `https://alchemy.mypinata.cloud/${nfts[index].rawMetadata.image}`
                        nfts[index].rawMetadata.image = nfts[index].rawMetadata.image.replace("ipfs:/", "ipfs");
                        nfts[index].owner = `${account}`
                        nfts[index].rawMetadata.address = nfts[index].contract.address;
                        nfts[index].metadata = nfts[index].rawMetadata;
                        console.log("nfts[index]", nfts[index])
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


export const GetAllDataNFTsMarketplace = () => {
    const [listingNFTs, setListingNFTs] = useState<any>([]);
    const [isLoading, setIsloading] = useState(false);
    const sdk = new ThirdwebSDK(NETWORK);
    useEffect(() => {
        async function getData() {
            try {
                setIsloading(true);
                const contract = await sdk.getContract(MARKETPLACE_ADDRESS);
                const allListings = await contract.directListings.getAll();
                const arr: any = [...allListings];
                if (arr.length > 0) {
                    arr.forEach((NFT: any, index: string | number) => {
                        arr[index].asset.address = arr[index].assetContractAddress
                        arr[index].metadata = arr[index].asset
                    })
                    setListingNFTs(arr);
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsloading(false);
            }

        }
        getData();
    }, [])
    return { listingNFTs, isLoading }
}