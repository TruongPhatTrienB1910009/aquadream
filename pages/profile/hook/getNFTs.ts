import { useEffect, useState } from "react";
import { Network, Alchemy } from 'alchemy-sdk';
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

export const GetNFTs = () => {
    const [nftList, setNftList] = useState<any[]>([]);

    useEffect(() => {
        const getNFTs = async () => {
            const walletAddress = "0x279E5F0e77A435FA38e894CF6D856DfF6bfB49FD";
            const nfts: any[] = (await alchemy.nft.getNftsForOwner(walletAddress)).ownedNfts;
            setNftList([...nfts])
        }
        getNFTs();
    }, [])

    return { nftList }
}