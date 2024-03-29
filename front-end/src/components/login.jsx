import React, { useState, useEffect } from "react";

const Login = () => {
  const [address, setAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setAddress(account);
      return true;
    } else {
      console.log("No authorized account found");
      return false;
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Wallet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletButton = () => {
    return <button onClick={connectWallet}>connectWallet</button>;
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  return <div>{!address && connectWalletButton()}</div>;
};

export default Login;
