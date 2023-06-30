/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { MINI_GAME_ADDRESS, NETWORK } from "../../../const/contractAddresses";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import minigameABI from "../../../const/abi/minigame.json"
import { useContractWrite, useContract } from "@thirdweb-dev/react";


export const UseMintNFT = () => {
    const [pendingMint, setPendingMint] = useState(false);
    const [message, setMessage] = useState("");
    const { contract } = useContract(MINI_GAME_ADDRESS, minigameABI);
    const { mutateAsync, isLoading, error } = useContractWrite(
        contract,
        "mintNFT",
    );
    const MintNFT = useCallback(async () => {
        setPendingMint(true);
        try {
            mutateAsync([

            ])
        } catch (error) {
            console.log(error)
        } finally {
            setPendingMint(false);
        }
    }, [])

    return { MintNFT, pendingMint, message }
}
