import { ethers } from "ethers";
import {chainsConfig} from "./chainConfig";

export class EthereumConnection {
    provider: ethers.JsonRpcProvider;

    constructor(url?: string) {
        this.provider = new ethers.JsonRpcProvider(url);
    }

    getERC20Contract(address: string): ethers.Contract {
        const ERC20Abi = [
            "function balanceOf(address) view returns (uint)"
        ];
        return new ethers.Contract(address, ERC20Abi, this.provider);
    }

    async getAddressBalance(address: string): Promise<string> {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance);
    }

    async getErc20Balance(address: string, tokenAddress: string): Promise<string> {
        const erc20Contract = this.getERC20Contract(tokenAddress);
        const balance = await erc20Contract.balanceOf(address);
        return ethers.formatUnits(balance, 18);
    }
}

export class MultiChainBalanceFetcher {
    chains: Record<string, { rpc: string; assets: Record<string, string> }>;

    constructor() {
        this.chains = chainsConfig;
    }

    async getUSDCBalance(address: string): Promise<string> {
        let totalUSDCBalance = 0n; // Using BigInt for cumulative balance

        for (const [chainName, chainData] of Object.entries(this.chains)) {
            const connection = new EthereumConnection(chainData.rpc);
            const usdcAddress = chainData.assets["USDC"];

            try {
                const balance = await connection.getErc20Balance(address, usdcAddress);
                totalUSDCBalance += ethers.parseUnits(balance, 18); // Accumulate balance as BigInt
            } catch (error) {
                console.error('Failed to fetch USDC balance on ${chainName}:, error');
            }
        }

        return ethers.formatUnits(totalUSDCBalance, 18);
    }

    async getTotalETHBalance(address: string): Promise<string> {
        let totalETHBalance = 0n; // Using BigInt for cumulative balance

        for (const [chainName, chainData] of Object.entries(this.chains)) {
            const connection = new EthereumConnection(chainData.rpc);

            try {
                const balance = await connection.getAddressBalance(address);
                totalETHBalance += ethers.parseUnits(balance, 18); // Accumulate balance as BigInt
            } catch (error) {
                console.error('Failed to fetch ETH balance on ${chainName}:, error');
            }
        }

        return ethers.formatUnits(totalETHBalance, 18);
    }
}

// async function main() {
//     try {
//         const balanceFetcher = new MultiChainBalanceFetcher();
//         const address = "0xb8C5a3A9d8F38Bc5159b4Fab1faeF2308D689306";
        
//         // Fetch USDC Balance
//         const totalUSDCBalance = await balanceFetcher.getUSDCBalance(address);
//         console.log(`Total USDC Balance: ${totalUSDCBalance}`);

//         // Fetch ETH Balance
//         const totalETHBalance = await balanceFetcher.getTotalETHBalance(address);
//         console.log(`Total ETH Balance: ${totalETHBalance}`);
//     } catch (error) {
//         console.error("Error during balance fetching:", error);
//     }
// }

// main();
