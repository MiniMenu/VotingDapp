import { useRef } from "react"
import { ethers } from "ethers";
import toast from 'react-hot-toast';
const BuyToken = ({constractInstance}) => {

  const tokenAmountRef = useRef();

  const buyToken = async(e) =>{
    e.preventDefault();
    try {
      const numberOfTokens = tokenAmountRef.current.value;
      const numberOfTokens18Decimals = ethers.parseEther(numberOfTokens,18);
      const tokenPriceWei = await constractInstance.tokenPrice();
      const totalPriceOfToken = tokenPriceWei * BigInt(numberOfTokens);
      const tx = await constractInstance.buyGLDToken(numberOfTokens18Decimals, {value:totalPriceOfToken},{gasLimit:300000});
      const reciept = await tx.wait();
      toast.success("Purchase Tokens Successfully!")
    } catch(err){
      toast.success("Purchase Tokens Failed!")
      console.error("Purchase Tokens Failed!",err.message);
    } 

  }

  return (
    <form onSubmit={buyToken}>
      <label>Token Amount to buy(In Eth)</label>
      <input type="text" ref={tokenAmountRef} placeholder="Number of tokens to buy"></input>
      <button type="submit">Buy Token</button>
    </form>
  )
}

export default BuyToken