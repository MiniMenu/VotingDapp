import {  useEffect, useRef, useState} from 'react';
import { useWeb3Context } from '../../context/useWeb3Context';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const CandidateRegistration = () => {
    const {web3State} = useWeb3Context();
    const {contractInstance} = web3State;
    const [file, setFile] = useState("");
    const nameRef = useRef();
    const genderRef = useRef();
    const ageRef = useRef();
    const partyRef = useRef();
    const token = localStorage.getItem("token");
    const navigateTo = useNavigate();


    useEffect(()=>{
      if(!token){
        navigateTo("/");
      }
    },[navigateTo, token])

  const handleCandidateRegistration = async(e) =>{
    e.preventDefault();
    try{
    
      const token = localStorage.getItem("token");
      const config = {
        headers:{
          'x-access-token':token
        }
      }
      const formData =  new FormData();
      formData.append("file",file);

      const name = nameRef.current.value;
      const gender = genderRef.current.value;
      const age = ageRef.current.value;
      const party = partyRef.current.value;


      if (name !== "" && gender!== "" && age !== "" && party !== ""){
        console.log(name, gender, age, party);
         await contractInstance.candidateRegister(name, party, age, gender);
         await axios.post(`http://localhost:3000/api/postCandidateImage`, formData, config);
      } else {
        console.log("Empty fields detected");
      }

      nameRef.current.value = "";
      genderRef.current.value = "";
      ageRef.current.value = "";
      partyRef.current.value = "";
      
    } catch(error){
      //TODO: Handle errors
      console.error(error.message);
    }
  }
  return (
    <div className='container'>
      <div className='child'>
      <form onSubmit={handleCandidateRegistration}>
       <div>
         <label htmlFor="name">Name:</label>
         <input type="text" id="name" name="name" ref={nameRef}/>
       </div>
       <div>
         <label htmlFor="party">Party:</label>
         <input type="text" id="party" name="party" ref={partyRef} />
       </div>
       <div>
         <label htmlFor="age">Age:</label>
         <input type="text" id="age" name="age" ref={ageRef} />
       </div>
       {/* <div>
         <label htmlFor="gender">Gender:</label>
         <input type="text" id="gender" name="gender" ref={genderRef} />
       </div> */}
       <div>
           <label htmlFor="gender">Gender:</label>
           <select name="gender" id="gender" ref={genderRef}>
              <option value="0" selected>Male</option>
              <option value="1">Female</option>
              <option value="2">Others</option>
           </select>
       </div>
       <div>
       <input type='file' onChange={(e)=>setFile(e.target.files[0])}></input>
       </div>
       <div>
         <button type='submit'>Register</button>
       </div>
    </form>
    </div>
 </div>
  )
}

export default CandidateRegistration