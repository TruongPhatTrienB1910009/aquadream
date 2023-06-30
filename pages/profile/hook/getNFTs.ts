/* eslint-disable react-hooks/exhaustive-deps */
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useCallback, useEffect, useState } from "react";
import { Network, Alchemy } from 'alchemy-sdk';
import { MARKETPLACE_ADDRESS, NETWORK } from "../../../const/contractAddresses";


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
                const dataNFTs: any[] = [...nfts];
                if (dataNFTs.length > 0) {
                    const List = dataNFTs.map((nft, index) => {
                        const x: any = { ...nft }
                        x.rawMetadata.id = x.tokenId
                        x.rawMetadata.image = `https://alchemy.mypinata.cloud/${x.rawMetadata.image}`
                        x.rawMetadata.image = x.rawMetadata.image.replace("ipfs:/", "ipfs");
                        x.owner = `${account}`
                        x.rawMetadata.address = x.contract.address;
                        x.metadata = x.rawMetadata;
                        return x;
                    })
                    setNftList([...List]);
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
                const allListings = await contract.directListings.getAllValid();
                const arr: any = [...allListings];
                if (arr.length > 0) {
                    const List = arr.map((NFT: any, index: string | number) => {
                        const x: any = { ...NFT };
                        x.asset.address = x.assetContractAddress
                        x.metadata = x.asset
                        return x;
                    })
                    setListingNFTs([...List]);
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