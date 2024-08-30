import {useWeb3Context} from '../../context/useWeb3Context'
import toast from 'react-hot-toast';

const AnnounceWinner = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance} = web3State;

   const announceWinner = async(e) => {
      e.preventDefault();
      try {
        const tx = await contractInstance.emergency();
        const res = tx.wait();  
        if (res.status == 1){
          toast.success("Winner Announced Sucessfully!");
        } 
      } catch(err){
        toast.error("Error during announcing winner!");
        console.error(err.message);
      }
    }
  return (
    <button className='announceBtn' onClick={announceWinner}>Announce Winner</button>
  )
}

export default AnnounceWinner