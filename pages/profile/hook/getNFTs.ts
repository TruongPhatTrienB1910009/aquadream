import { useEffect, useState } from "react";
import { Network, Alchemy } from 'alchemy-sdk';
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
                        nfts[index].metadata = nfts[index].rawMetadata
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