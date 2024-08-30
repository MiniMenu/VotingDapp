import { useRef } from "react"
import { ethers } from "ethers";
import toast from 'react-hot-toast';
const SellToken = ({constractInstance, erc20ContractInstance}) => {

  const sellTokenAmountRef = useRef();
  const approveTokenAmountRef = useRef();

  const sellToken = async(e) =>{
    e.preventDefault();
    const tokenValueEth = sellTokenAmountRef.current.value;
    const tokenValueWei = ethers.parseEther(tokenValueEth,18);
    try {
      const tx = await constractInstance.sellGLDToken(tokenValueWei);
      const reciept = tx.wait();
      toast.success("Sold Tokens Successfully!")
    } catch(err){
      toast.success("Failed!")
      console.error("Failed!",err.message);
    } 
  }

  const approveToken = async(e) =>{
    e.preventDefault();
    const tokenValueEth = sellTokenAmountRef.current.value;
    const tokenValueWei = ethers.parseEther(tokenValueEth,18);
    const tokenMarketPlace = "0x45f1175108404a02f00fda658cB5AFda0EA4781c"; // tokenMarketPlace.sol contract address
    const tx = await erc20ContractInstance.approve(tokenMarketPlace, tokenValueWei);
    const reciept = tx.wait();
    console.log("Transaction Successful");
  }

  return (
    <div class="float-parent-element">
      <div class="float-child-element">
      <div class="div1">
        <form onSubmit={sellToken}>
          <label>Token Amount to Sell(In Eth)</label>
          <input type="text" ref={sellTokenAmountRef} placeholder="Number of tokens to sell"></input>
          <button type="submit">Sell Token</button>
        </form>
      </div>
    </div>
     <div class="float-child-element">
      <div class="div2">
          <form onSubmit={approveToken}>
            <label>Token Amount to Approve(In Eth)</label>
            <input type="text" ref={approveTokenAmountRef} placeholder="Number of tokens to approve"></input>
            <button type="submit">Approve</button>
          </form>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <div id="div1">
        // <form onSubmit={sellToken}>
        //   <label>Token Amount to Sell(In Eth)</label>
        //   <input type="text" ref={sellTokenAmountRef}></input>
        //   <button type="submit">Sell Token</button>
        // </form>
    //   </div>
    //   <div id="div2">
      //   <form onSubmit={approveToken}>
      //   <label>Token Amount to Approve(In Eth)</label>
      //   <input type="text" ref={approveTokenAmountRef}></input>
      //   <button type="submit">Approve</button>
      // </form>
    //   </div>
    // </div>
  )
}

export default SellToken