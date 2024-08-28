import {useWeb3Context} from '../../context/useWeb3Context'

const AnnounceWinner = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance} = web3State;

   const announceWinner = async(e) => {
      e.preventDefault();
      await contractInstance.emergency();   
    }
  return (
    <button className='announceBtn' onClick={announceWinner}>Announce Winner</button>
  )
}

export default AnnounceWinner