/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { BaseGoerli } from "@thirdweb-dev/chains";
export const NETWORK = BaseGoerli;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x805D1391C065fBA9EC5893a965524b3102fFA998";


export const MINI_GAME_ADDRESS = "0x10848DD46B3a28b7BAe153f2DbdE8c06b67D20B7";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://goerli.basescan.org/";
