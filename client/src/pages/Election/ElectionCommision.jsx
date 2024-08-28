import DisplayWinner from './DisplayWinner';
import EmergencyDeclare from './EmergencyDeclare';
import AnnounceWinner from './AnnounceWinner';
import VotingForm from './VotingForm';
import VotingStatus from './VotingStatus';
import {useNavigate} from "react-router-dom";
import {  useEffect} from 'react';

const ElectionCommision = () => {

  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigateTo("/");
    }
  },[navigateTo, token])

  return ( 
    <div className='container'>
      <div className='child'>
        <VotingForm />
        <AnnounceWinner />
        <EmergencyDeclare />
        <DisplayWinner />
        <VotingStatus />
    </div></div>
  )
}

export default ElectionCommision