import { useEffect, useState } from 'react';
import { useWeb3Context } from '../../context/useWeb3Context';
import toast from 'react-hot-toast';
const VotingStatus = () => {
 const {web3State} = useWeb3Context();
 const {contractInstance} = web3State;
 const [status, setStatus] = useState("Not Started");

 useEffect(()=>{
    const getStatus = async()=>{
        try {
          const selectedStatus = await contractInstance.voteStatus();
          const statusInString = String(selectedStatus);
            if (statusInString === "0"){
            setStatus("Not Started");
            } else if (statusInString === "1"){
            setStatus("Started");
            } else {
            setStatus("Ended");
            }
        } catch(err){
          toast.error("Error fetching the voting status");
          console.error(err.message);
        }
      
    }
    contractInstance && getStatus();
 },[contractInstance])

  return (
    <>{<p>Voting Status: {status}</p>}</>
  )
}

export default VotingStatus