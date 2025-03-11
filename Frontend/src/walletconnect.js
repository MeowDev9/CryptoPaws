import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [userSigner, setUserSigner] = useState(null);

  // Check if MetaMask is installed and handle wallet connection
  const checkMetaMaskAvailability = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        setUserSigner(signer);
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  // Handle wallet connection button click
  const connectWallet = async () => {
    if (provider) {
      // If wallet is already connected, just fetch the address again
      const address = await userSigner.getAddress();
      setWalletAddress(address);
    } else {
      await checkMetaMaskAvailability();
    }
  };

  // Listen for account change or network change
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Welcome to CryptoPaws</h1>

      {walletAddress ? (
        <div>
          <p>Connected Wallet Address: {walletAddress}</p>
          <button onClick={() => alert("Proceeding with wallet!")}>Proceed</button>
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default App;
