import { useWeb3Context } from '../../context/useWeb3Context';
import { useRef } from 'react';

const VotingForm = () => {
    const {web3State} = useWeb3Context();
    const {contractInstance} = web3State;
    const startRef =  useRef();
    const endRef =  useRef();
  
    const timeInSeconds = (time)=> {
      const date =  new Date(time);
      return Math.floor(date.getTime());

    }
    const startVoting = async(e) =>{
      e.preventDefault();
      const startTime = startRef.current.value;
      const endTime = endRef.current.value;
      const startTimeInSeconds = timeInSeconds(startTime);
      const endTimeInSeconds = timeInSeconds(endTime);
      await contractInstance.voteTime(startTimeInSeconds, endTimeInSeconds);
    }

   
  return (

        <form className='form' onSubmit={startVoting}>
          <div>
            <label className="labe12" htmlFor="start">Start Time:</label>
            <input className='innerBoxVote' type="datetime-local" id="start" ref={startRef}/>
          </div>
          <div>
            <label className="labe12" htmlFor="end">End Time:</label>
            <input className='innerBoxVote' type="datetime-local" id="end" ref={endRef}/>
          </div>
          <button className='regBtn' type='submit'>Start Voting</button>
        </form>
  )
}

export default VotingForm