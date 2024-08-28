import {useEffect, useState} from 'react'
import {useWeb3Context} from '../../context/useWeb3Context';
import {useNavigate} from "react-router-dom";

const CandidateDisplay = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance} = web3State;
   const [candidates, setCandidates] = useState([]);

   const navigateTo = useNavigate();
   const token = localStorage.getItem("token");
 
   useEffect(()=>{
     if(!token){
       navigateTo("/");
     }
   },[navigateTo, token])

   useEffect(()=>{
        const candidateList = async() => {
           const candidateList = await contractInstance.candidateList();
           setCandidates(candidateList);
        }
        contractInstance && candidateList();
     },[contractInstance]);

  return (
    <div className="list-container">    
        {
          candidates && candidates.map((candidate) => {
            return (
              <ul className="list" key={candidate.candidateId}>
                <li>{String(candidate.candidateId)}</li>
                <li>{candidate.name}</li>
                <li>{String(candidate.age)}</li>
                <li>{String(candidate.gender)}</li>
                <li>{candidate.party}</li>
                <li>{candidate.candidateAddress}</li>
                <li>{String(candidate.votes)}</li>
                <img src={`http://localhost:3000/images/CandidateImages/${candidate.candidateAddress}.png`}></img>
              </ul>
            )
          })
        }
     </div>
  )
}

export default CandidateDisplay