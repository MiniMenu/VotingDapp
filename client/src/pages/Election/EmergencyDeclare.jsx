import {useWeb3Context} from '../../context/useWeb3Context'
import toast from 'react-hot-toast';
const EmergencyDeclare = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance} = web3State;

  const emergencyStop = async(e) => {
    e.preventDefault();
    try{
      const tx = await contractInstance.emergency();   
      const res =  await tx.wait();
      toast.success("Emergency stop declared!");
      
    } catch(err){
      toast.error("Error during declaring emergency stop!");
      console.error(err.message);
    }
  }
  return (
    <button className='emerBtn' onClick={emergencyStop}>Emergency</button>
  )
}

export default EmergencyDeclare