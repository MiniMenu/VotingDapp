import { useParams } from "react-router-dom"
import {useWeb3Context} from '../../context/useWeb3Context';
import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';

const VoterProfile = () => {
    const [voterProfile, setVoterProfile] = useState([]);
    const [voterProfileId, setVoterProfileId] = useState("Not Registered");
    const voterIdRef = useRef();
    const castVoterIdRef = useRef();
    const candidateIdRef = useRef();
    const {accountAddress}= useParams();
    console.log(accountAddress);
    const {web3State} = useWeb3Context();
    const {contractInstance} = web3State;

    useEffect(() =>{
        const fetchVoterProfile = async(e) => {
          e.preventDefault();
          try {
            const voterProfileId = await contractInstance.getVoterId();
            if (String(voterProfileId) !== "1") {
              setVoterProfileId(voterProfileId);
              const voterProfile = await contractInstance.getVoterProfile(voterProfileId);
              setVoterProfile(voterProfile);
            }
            
          } catch(e){
            toast.error("Error while fetching the voter profile Id!")
            console.error("Error fetching the voter profile Id", e.message)
          }    
      }
      contractInstance && fetchVoterProfile
    },[contractInstance])

    // const fetchVoterProfile = async(e) => {
    //     e.preventDefault();
    //     try {
    //       const voterId = voterIdRef.current.value;
    //       const voterProfile = await contractInstance.getVoterProfile(voterId);
    //       setVoterProfile(voterProfile);
    //     } catch(e){
    //       toast.error("Error while fetching the voter profile!")
    //       console.error("Error fetching the voter profile", e.message)
    //     }    
    // }

    const castVote =  async() => {
        try{
          const voterId = castVoterIdRef.current.value;
          const candidateId = candidateIdRef.current.value;
          const tx  = await contractInstance.vote(voterId, candidateId);
          const res = await tx.wait();
          toast.success("Vote Sucessfull!")
        } catch(e){
          if (e.message.include("Not enough tokens")) {
            toast.error("You need to have token balance!")
          } else {
            toast.error("Error while casting the vote!")
          }
          
          console.error("Error while casting the vote", e.message)
        }
    }
    
  return (
    <div className='container'>
      <div className='child'>
         <p>Voter Profile Id : {voterProfileId}</p>
        {/* <form onSubmit={fetchVoterProfile}>
          <label>Voter ID:</label>
          <input type="text" placeholder="Voter Id" ref={voterIdRef}></input>
          <button type="submit">Get Profile</button>
        </form> */}
        {
          voterProfile.length !== 0 ?
          (
            voterProfile.map(voter=> {
                
                <div className="list-container">
                  <ul className="list"key={voter.voterId}>
                    <li>{String(voter.voterId)}</li>
                    <li>{voter.name}</li>
                    <li>{String(voter.age)}</li>
                    <li>{String(voter.gender) === "0" ? 
                            "Male" : 
                            String(voter.gender) === "1"? 
                              "Female":
                              "Others" 
                          }</li>
                    <li>{voter.voterAddress}</li>
                    <li>{voter.voterCandidateId}</li>
                    <img src={`http://localhost:3000/images/VoterImage/${voter.voterAddress}.png`}></img>
                  </ul>
              </div>    
               
            })) 
          : (<p></p>)
        }
         <form onSubmit={castVote}>
          <label>Voter ID:</label>
          <input type="text" placeholder="Voter Id" ref={castVoterIdRef}></input>
          <label>Candidate ID:</label>
          <input type="text" placeholder="Candidate Id" ref={candidateIdRef}></input>
          <button type="submit">Vote</button>
        </form>
      </div>
    </div>
  )
}

export default VoterProfile