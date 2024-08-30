import BuyToken from "../../components/TokenExchange/BuyToken";
import SellToken from "../../components/TokenExchange/SellToken";
import TokenPrice from "../../components/TokenExchange/TokenPrice";
import TokenBalance from "../../components/TokenExchange/TokenBalance";
import tokenExchangeAbi from "../../constants/tokenExchangeAbi.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Context } from "../../context/useWeb3Context";
import erc20abi from "../../constants/erc20abi.json"

const TokenExchange = () => {

  const [tokenExchangeContractInstance, setTokenExchangeContractInstance] = useState(null);
  const [erc20ContractInstance, setErc20ContractInstance] = useState(null);

  const {web3State} = useWeb3Context();
  const {signer, provider} = web3State;
  
  useEffect(() => {
    const erc20TokenInit = () =>{
      const contractAddress = "0x6206e8cA51b5b948e64050720A102e06d2E465C2";
      const erc20ContractInstance =  new ethers.Contract(contractAddress , erc20abi, provider)
      setErc20ContractInstance(erc20ContractInstance);
    }
    provider && erc20TokenInit()
  },[provider])

  useEffect(()=>{
      const tokenExchangeInit =  ()=> {
        const tokenExchangeContractAddress = "0x45f1175108404a02f00fda658cB5AFda0EA4781c";
        const tokenExchangeContractInstance = new ethers.Contract(tokenExchangeContractAddress,tokenExchangeAbi, signer);
        setTokenExchangeContractInstance(tokenExchangeContractInstance);
      }

      signer && tokenExchangeInit()
  },[signer])
  return (
    <div className='container'>
      <div className='child'>
      <TokenBalance erc20ContractInstance={erc20ContractInstance}/>
      <TokenPrice constractInstance={tokenExchangeContractInstance}/>
      <BuyToken constractInstance={tokenExchangeContractInstance}/>
      <SellToken constractInstance={tokenExchangeContractInstance} erc20ContractInstance={erc20ContractInstance}/>
    </div>
    </div>
  )
}

export default TokenExchange