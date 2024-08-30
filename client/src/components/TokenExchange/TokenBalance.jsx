import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {useWeb3Context} from '../../context/useWeb3Context';
import toast from 'react-hot-toast';
const TokenBalance = ({erc20ContractInstance}) => {

  const {web3State} = useWeb3Context();
  const {selectedAccount} = web3State;
  const [userTokenBalance, setUserTokenBalance] = useState("0")

  useEffect(() => {
    const fetchTokenBalance = async() => {
      try {
        const tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount);
        const tokenBalanceEth = ethers.formatEther(tokenBalanceWei);
        const formatedEther = parseFloat(tokenBalanceEth).toFixed(3);
        setUserTokenBalance(formatedEther);
        toast.success("Reterived Token Balance Sucessfully!")
      } catch(err){
        toast.success("Failed to fetch token balance!")
        console.error("Failed to fetch token balance!",err.message);
      } 
    }
    erc20ContractInstance && fetchTokenBalance()
  },[erc20ContractInstance, selectedAccount])

  return (
    <p>TokenBalance: {userTokenBalance}</p>
  )
}

export default TokenBalance