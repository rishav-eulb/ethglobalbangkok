import {ethers} from "ethers";

export class EthereumConnection{
    provider: ethers.JsonRpcProvider

    constructor(url?: string) {
        this.provider = new ethers.JsonRpcProvider(url);
    } 

    getERC20Contract(address:string): ethers.Contract{
        const ERC20Abi = [
            // Some details about the token
            "function name() view returns (string)",
            "function symbol() view returns (string)",
          
            // Get the account balance
            "function balanceOf(address) view returns (uint)",
          
            // Send some of your tokens to someone else
            "function transfer(address to, uint amount)",
          
            // An event triggered whenever anyone transfers to someone else
            "event Transfer(address indexed from, address indexed to, uint amount)"
          ];
          
        return new ethers.Contract(address,ERC20Abi,this.provider);
    }

    getContract(address:string, abi:ethers.InterfaceAbi): ethers.Contract{
        return new ethers.Contract(address,abi,this.provider);
    }

    getAddressBalance(address:string){
        return this.provider.getBalance(address)
    }
}