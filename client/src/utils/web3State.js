import { ethers } from "ethers";
import abi from "../constants/ABI.json";
import axios from "axios";
import toast from "react-hot-toast";

export const getWeb3State = async () => {
  let [contractInstance, selectedAccount, chainId, electionCommisionStatus] = [
    null,
    null,
    null,
    null,
    false,
  ];

  try {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });

    chainId = parseInt(chainIdHex, 16);
    selectedAccount = accounts[0];
    // read operation
    const provider = new ethers.BrowserProvider(window.ethereum);
    // write operation
    const signer = await provider.getSigner();
    const message = "You accept the terms and conditions for voting dapp";
    const signature = await signer.signMessage(message);
    const dataSignature = {
      signature,
    };
    const res = await axios.post(
      `http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,
      dataSignature
    );
    electionCommisionStatus = res.data.electionCommisionStatus;
    localStorage.setItem("token", res.data.token);
    const contractAddress = "0x30266466Ddb581E19CC8f59F377fE3e67Fe57DeB";
    contractInstance = new ethers.Contract(
      contractAddress,
      abi,
      signer,
      provider
    );
    toast.success("Signed In Successfully!");
    return {
      contractInstance,
      chainId,
      selectedAccount,
      electionCommisionStatus,
      provider,
      signer,
    };
  } catch (error) {
    console.error("Not able to get the web3 state", error.message);
    throw error;
  }
};
