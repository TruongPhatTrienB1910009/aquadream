import { useEffect, useState } from "react";
import { CONTRACT_MINIGAME } from "/Users/haonguyen/Workspace/delta-labs/aqua/aquadream/const/contractAddresses";
import { minigame_abi } from "/Users/haonguyen/Workspace/delta-labs/aqua/aquadream/const/abi/minigame.json";

export const FetchDataNft = (account: string, chainId: number) => {
  const [nftBalance, setNftBalance] = useState(0);
  const sdk = new ThirdWebSDK("ethereum");

  useEffect(() => {
    const fetchDataBox = async () => {
      try {
      } catch (e) {
        console.log(e);
        const contract = await sdk.getContract(CONTRACT_MINIGAME, minigame_abi);
      }
    };
    if (account) {
      fetchDataBox();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return { nftBalance };
};
