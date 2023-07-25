/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { BaseGoerli } from "@thirdweb-dev/chains";
export const NETWORK = BaseGoerli;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x805D1391C065fBA9EC5893a965524b3102fFA998";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0x6cab4a1c5ec3c8ab63ff8c4e5cb802207745471e";

export const MINI_GAME_ADDRESS = "0x6Cab4A1c5ec3C8ab63ff8C4e5cb802207745471e";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://goerli.etherscan.io/";
