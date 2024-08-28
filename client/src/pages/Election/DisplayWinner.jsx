
import { useEffect, useState } from 'react';
import { useWeb3Context } from '../../context/useWeb3Context';

const DisplayWinner = () => {
 const {web3State} = useWeb3Context();
 const {contractInstance} = web3State;
 const [winner, setWinner] = useState("Not Declared Yet");

 useEffect(()=>{
    const displayWinner = async() => {
       const electedWinner = await contractInstance.winner();
       if (electedWinner !== '0x0000000000000000000000000000000000000000') {
        setWinner(electedWinner);
       }
      
     }
     contractInstance && displayWinner();
 },[contractInstance])

  return (
    <>{winner && <p>Winners Address: {winner}</p>}</>
  )
}

export default DisplayWinner