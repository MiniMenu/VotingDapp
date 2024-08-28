import {useEffect, useState} from 'react'
import {useWeb3Context} from '../../context/useWeb3Context';
import {useNavigate} from "react-router-dom";

const VoterDisplay = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance} = web3State;
  const [voters, setVoters] = useState([]);

  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigateTo("/");
    }
  },[navigateTo, token])


  useEffect(()=>{
    const voterListInfo = async() =>{
      const voterList = await contractInstance.voterList();
      console.log(voterList);
      setVoters(voterList);
    }
    contractInstance && voterListInfo();

 },[contractInstance]);

  return (
    <div className="list-container">
      {
        voters && voters.map((voters) => {
          return (
            <ul className="list"key={voters.voterId}>
              <li>{String(voters.voterId)}</li>
              <li>{voters.name}</li>
              <li>{String(voters.age)}</li>
              <li>{String(voters.gender)}</li>
              <li>{voters.voterAddress}</li>
              <li>{voters.voterCandidateId}</li>
              <img src={`http://localhost:3000/images/VoterImage/${voters.voterAddress}.png`}></img>
            </ul>
          )
        })
      }
   </div>
  )
}

export default VoterDisplay