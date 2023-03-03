import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"; // Import your contract address and ABI

function App() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenOwner, setTokenOwner] = useState(null);

  const handleConnectWallet = async () => {
    const web3Modal = new Web3Modal();
    const ethProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(ethProvider);
    setProvider(provider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);

    // Instantiate the contract object
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    console.log("contract ", contract);
    setContract(contract);
  };

  const getOwner = async () => {
    const tokenId = 1; // ID of the token you want to check

    const owner = await contract.ownerOf(tokenId);
    setTokenOwner(owner);
    console.log("Current owner:", owner);
  };

  // Call the smart contract function when the component is mounted
  return (
    <div>
      <h1>Wallet Connectivity with Ethers and Web3Modal</h1>
      {provider ? (
        <div>
          <p>Connected to Ethereum network!</p>
          <p>Your wallet address is {address}</p>
          <p>Token owner is {tokenOwner}</p>
          <button onClick={getOwner}>Get Owner</button>
        </div>
      ) : (
        <>
          <button onClick={handleConnectWallet}>Connect Wallet</button>
        </>
      )}
    </div>
  );
}

export default App;
