/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Mumbai, BinanceTestnet, Goerli } from "@thirdweb-dev/chains";
export const NETWORK = Mumbai;
export const MarketNETWORK = Mumbai;
// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0xb144b5dbC5383782b77A9cA5332d417534a128eC";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0x4435f1F236b572D4cB66CEa3a35665FfAFF0e83d";

// export const MINI_GAME_ADDRESS = "0x6Cab4A1c5ec3C8ab63ff8C4e5cb802207745471e";
export const MINI_GAME_ADDRESS = "0xf58e3a5A014Db7D8275a872e76D4B63d755b4984";
// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://mumbai.polygonscan.com/";
