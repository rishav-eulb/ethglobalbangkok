import { ethers } from "ethers";
import { chainsConfig } from "./chainConfig";
import { MultiChainBalanceFetcher, EthereumConnection } from "./ethereumConnector";
import { PythPriceService } from "./priceFeed";

export class TokenExtension {
  address?: string;

  constructor(address?: string) {
    this.address = address;
  }

  async fetchBalances() {
    if (!this.address) {
      throw new Error("Address is not defined.");
    }

    const balanceFetcher = new MultiChainBalanceFetcher();
    const pythService = new PythPriceService();

    // Fetch ETH and USDC prices
    const ethPrice = await pythService.getEmaPrice(); // ETH price from Pyth
    const usdcPrice = "1"; // USDC price is set to 1

    const chainsOutput: Record<string, Record<string, any>> = {};
    
    const totalUSDCBalance = await balanceFetcher.getUSDCBalance(this.address);
    

    const totalETHBalance = await balanceFetcher.getTotalETHBalance(this.address);
   

    // Iterate over each chain to fetch balances
    for (const [chainName, chainData] of Object.entries(chainsConfig)) {
      const connection = new EthereumConnection(chainData.rpc);
      const chainBalances: Record<string, any> = {};

      try {
        // Fetch ETH balance
        const ethBalance = await connection.getAddressBalance(this.address);
        chainBalances["ETH"] = {
          address: "0x",
          balance: ethBalance,
          price: ethPrice,
        };

      } catch (error) {
        console.error(`Failed to fetch ETH balance on ${chainName}:`, error);
      }

      try {
        // Fetch USDC balance
        const usdcAddress = chainData.assets["USDC"];
        const usdcBalance = await connection.getErc20Balance(this.address, usdcAddress);
        chainBalances["USDC"] = {
          address: usdcAddress,
          balance: usdcBalance,
          price: usdcPrice,
        };
        
      } catch (error) {
        console.error(`Failed to fetch USDC balance on ${chainName}:`, error);
      }

      chainsOutput[chainName] = chainBalances;
    }

    const totalBalances = {
      ETH: totalETHBalance,
      USDC: totalUSDCBalance
    };

    // Create the final JSON output
    const result = {
      chains: chainsOutput,
      total: totalBalances,
    };

    console.log(JSON.stringify(result, null, 2));
  }
}

// Example usage
const walletAddress = "0xBEfBf15cac02B1cB30dADb1AA4CfA181E26DBfA1";
const tokenExtension = new TokenExtension(walletAddress);

tokenExtension.fetchBalances().catch(console.error);
