import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import contractABI from "../utils/contractABI.json";

const Register = () => {
  const [registerStatus, setRegisterStatus] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const { REACT_APP_SOCIALMEDIA } = process.env;

  const isRegistered = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          REACT_APP_SOCIALMEDIA,
          contractABI.abi,
          signer
        );

        // Get all the domain names from our contract
        const accountStatus = await contract.isRegistered();

        if (accountStatus) {
          setUsername(await contract.getUsername());
          setDescription(await contract.getDescription());
        }
        setRegisterStatus(accountStatus);

        console.log("Account is registered? ", registerStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          REACT_APP_SOCIALMEDIA,
          contractABI.abi,
          signer
        );

        // Get all the domain names from our contract
        const check = await contract.register(username, description);

        console.log(
          "User: ",
          username,
          "Desc: ",
          description,
          "status: ",
          check
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerForm = () => {
    function getUsername(val) {
      setUsername(val.target.value);
    }

    function getDescription(val) {
      setDescription(val.target.value);
    }

    return (
      <div>
        <input type="text" placeholder="Username" onChange={getUsername} />
        <input
          type="text"
          placeholder="Description"
          onChange={getDescription}
        />

        <button onClick={register}>Register</button>
      </div>
    );
  };

  const welcomePage = () => {
    return (
      <div>
        Welcome {username}
        <br></br>
        desc {description}
      </div>
    );
  };

  useEffect(() => {
    isRegistered();
  }, [username]);
  return (
    <div>
      {!registerStatus && registerForm()}
      <button onClick={isRegistered}>reg?</button>
      {registerStatus && welcomePage()}
    </div>
  );
};

export default Register;
