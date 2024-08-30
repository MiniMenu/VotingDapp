// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Voting{

    address electionCommissioner;
    address public winner;

    enum Gender {Male, Female, Others}
   
    struct Voter{
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voterCandidateId;
        address voterAddress;
    }

    struct Candidate{
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress;
        uint votes;
    }

    enum VotingStatus {NotStarted, InProgress, Ended}
    uint nextVoterID = 1;
    uint nextCandiateID = 1;
    uint startTime;
    uint endTime;
    bool stopVoting;

    mapping (uint => Voter) voterDetails;
    mapping (uint => Candidate) candidateDetails;
    // map voter address to the voter
    mapping (address => uint) voterId;

    IERC20 public gldToken;

    event NewCandidateRegistered(string name, string party, uint age, Gender gender, uint candidateId);
    event NewVoterRegistered(string name, uint age, Gender gender, uint voterId);
    event VoteCasted(uint voterId, uint candidateId);
    event VotedPeriodSet(uint startTime, uint endTime);
    event VotingStatusUpdated(VotingStatus status);
    event ElectionResultAnnounced(address winner);

     constructor(address _gldToken){
       gldToken = IERC20(_gldToken);
       electionCommissioner = msg.sender;
    }

    modifier isVotingOver(){
        require(block.timestamp > endTime|| stopVoting == false, "Voting is over");
        _;
    }

    modifier onlyCommissioner(){
        require(electionCommissioner == msg.sender, "Not from election commisoner");
        _;
    }

    function candidateRegister(string calldata _name, string calldata _party, uint _age, Gender _gender) external {
       require(_age >= 18, "You are not eligible");
       require(msg.sender != electionCommissioner, "You are from the election commission");
       require(candidateVerification(msg.sender) == true, "Candidate already registered.");
       require(nextCandiateID < 3, "Candidate registration full");
       candidateDetails[nextCandiateID] = Candidate(_name,_party, _age, _gender, nextCandiateID, msg.sender, 0);
       nextCandiateID++;
    }

    function candidateVerification(address _candidate) internal view returns(bool){
         for(uint i = 1; i < nextCandiateID; i++){
            if (candidateDetails[i].candidateAddress == _candidate) {
                return false;
            }
         }
        return true;
    }

    function candidateList() public view returns(Candidate[] memory){
         Candidate[] memory candidateArr = new Candidate[](nextCandiateID - 1);
         for(uint i = 1; i < nextCandiateID; i++){
            candidateArr[i-1] = (candidateDetails[i]);
         }
         return candidateArr;
    }

    function voterRegister(string calldata _name, uint _age, Gender _gender) external  {
       require(_age >= 18, "You are not eligible");
       require(msg.sender != electionCommissioner, "You are from the election commission");
       require(voterVerification(msg.sender) == true, "Voter already registered.");
       voterDetails[nextVoterID] = Voter(_name, _age, nextVoterID, _gender, 0, msg.sender);
       emit NewVoterRegistered(_name, _age, _gender, nextVoterID);
       voterId[msg.sender]= nextVoterID; // mapping of voter id with address
       nextVoterID++;
    }

    function getVoterId() external view returns (uint){
        return voterId[msg.sender];
    }

    function voterVerification(address _voter) internal view returns(bool)   {
        for(uint i = 1; i < nextVoterID; i++){
            if (voterDetails[i].voterAddress == _voter) {
                return false;
            }
         }
       return true;
    }

    function getVoterProfile(uint _voterId) view public returns(Voter memory) {
        require(voterDetails[_voterId].voterAddress == msg.sender);
        return voterDetails[_voterId];
    }

    function voterList() public view onlyCommissioner returns(Voter[] memory) {
      Voter[] memory voterArr = new Voter[](nextVoterID -1 );
        for(uint i = 1; i < nextVoterID; i++){
            voterArr[i-1] = (voterDetails[i]);
         }
         return voterArr;
    }

    function vote(uint _voterId, uint _id) external  isVotingOver{
        require(gldToken.balanceOf(msg.sender) > 0 , "Not enough tokens");
        require(voterDetails[_voterId].voterCandidateId == 0, "Already Voted");
        require(voterDetails[_voterId].voterAddress == msg.sender, "You are not a voter");
         
        require(startTime != 0, "Voting not started");
        require(nextCandiateID == 3, "Candidate Registration not done yet");
        require(_id >= 1 && _id < 3, "Invalid Candidate Id");

         voterDetails[_voterId].voterCandidateId = _id;
         candidateDetails[_id].votes++;
         emit VoteCasted(_voterId, _id);
    }



    function voteTime(uint _startTime, uint _endTime) external onlyCommissioner returns(uint, uint){
        startTime = block.timestamp + _startTime;
        endTime = startTime + _endTime;
        stopVoting = false;
        return (startTime, endTime);
    }

    function voteStatus() public view returns(VotingStatus){
      if(startTime == 0){
         return VotingStatus.NotStarted;
      } else if((startTime!=0 && endTime>block.timestamp) && stopVoting==false){
        return VotingStatus.InProgress;
      } else {
        return VotingStatus.Ended;
      }
    }

    function result() external  onlyCommissioner  isVotingOver returns(address){
        require(nextCandiateID > 1, "No candidate registered");
        address winnerAddress;
        uint winnerVoter = 0;
        for (uint i = 1; i < nextCandiateID; i++){
            if (candidateDetails[i].votes > winnerVoter){
                winnerVoter = candidateDetails[i].votes;
                winnerAddress = candidateDetails[i].candidateAddress;
            }
        }

        winner = winnerAddress;
        emit ElectionResultAnnounced(winner);
        return winner;
    }

    function emergency() public onlyCommissioner{
          stopVoting = true;
    }
}