import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Breadcrumb } from 'react-bootstrap';
import NFTGrid from '../../components/NFT/NFTGrid';
import style from "./nftcollections.module.css";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useContract, useNFTs } from '@thirdweb-dev/react';
const NftcollectionPage = () => {
    const router = useRouter();
    const { contract: nftContract } = useContract(router.query.contractAddressCollections as string);
    const { data, isLoading } = useNFTs(nftContract);
    console.log("dataCollections", data?.length)
    if (data) {
        data.forEach((nft, index) => {
            data[index].metadata.address = router.query.contractAddressCollections as string;
            data[index].metadata.creatorAddress = data[index].owner;
        })
    }
    return (
        <>
            <Breadcrumb className={style.Breadcrumb}>
                <Breadcrumb.Item
                    className={style.BreadcrumbSellItem}
                    href="/"
                >
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
}

export default NftcollectionPage