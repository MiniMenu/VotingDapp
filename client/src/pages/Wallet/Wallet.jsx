import { useEffect } from 'react';
import {useWeb3Context} from  '../../context/useWeb3Context';
import { useNavigate } from 'react-router-dom';
import "./Wallet.css";

const Wallet = () => {
  const navigateTo = useNavigate();
  const {handleWallet, web3State} = useWeb3Context();
  const {selectedAccount} = web3State;

  useEffect(()=>{
    if (selectedAccount){
      navigateTo("/candidate-register"); 
    }
  },[selectedAccount, navigateTo])

  return (
    <div className='container'>
      <div className='child_div'>
        <button onClick={handleWallet}>
              ConnectWallet
       </button>
      </div>
    </div>
    
  )
}

export default Wallet