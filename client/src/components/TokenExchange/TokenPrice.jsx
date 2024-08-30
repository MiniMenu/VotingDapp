import { ethers } from "ethers";
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
const TokenPrice = ({constractInstance}) => {

  const [tokenPrice, setTokenPrice] = useState(null);

  useEffect(()=>{
    const fetchTokenPrice = async() => {
       try {
          const tokenPrice = await constractInstance.tokenPrice();
          const tokenPriceInEth = ethers.formatEther(tokenPrice);
          const formatedEther = parseFloat(tokenPriceInEth).toFixed(3);
          setTokenPrice(formatedEther);
          toast.success("Reterived Token Price Sucessfully!")
      } catch(err){
          toast.success("Failed to fetch token price!")
          console.error("Failed to fetch token price!",err.message);
      } 
    }
    constractInstance && fetchTokenPrice
  },[constractInstance])
  return (
    <p>TokenPrice: {tokenPrice}</p>
  )
}

export default TokenPrice