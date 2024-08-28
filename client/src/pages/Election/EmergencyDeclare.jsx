import {useWeb3Context} from '../../context/useWeb3Context'

const EmergencyDeclare = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance} = web3State;

  const emergencyStop = async(e) => {
    e.preventDefault();
    await contractInstance.emergency();   
  }
  return (
    <button className='emerBtn' onClick={emergencyStop}>Emergency</button>
  )
}

export default EmergencyDeclare