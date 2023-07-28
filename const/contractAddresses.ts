/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { BaseGoerli } from "@thirdweb-dev/chains";
export const NETWORK = BaseGoerli;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x7aE5279829ad32Ca7DfF15668550De10Eee98B70";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0xBE65A02e408284e60f54882DB17E81Db204415c9";

export const MINI_GAME_ADDRESS = "0xBE65A02e408284e60f54882DB17E81Db204415c9";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://goerli.basescan.org/";
