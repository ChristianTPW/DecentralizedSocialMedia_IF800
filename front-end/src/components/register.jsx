import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Textarea, Box, Button, Input, HStack } from "@chakra-ui/react";

import contractABI from "../utils/contractABI.json";
import ShowPost from "./showPost";

const Register = () => {
  const [registerStatus, setRegisterStatus] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

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
        await contract.register(username, description);

        isRegistered();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const post = async () => {
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

        await contract.userPost(content);

        <ShowPost actionName={this.fetchMints} />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerForm = () => {
    function getUsername(val) {
      setUsername(val.target.value);
    }

    return (
      <div>
        <HStack m="5">
          <Input
            type="text"
            placeholder="Username"
            onChange={getUsername}
            w="20%"
          />

          <Button onClick={register} colorScheme="twitter">
            Register
          </Button>
        </HStack>
      </div>
    );
  };

  const postForm = () => {
    function getContent(val) {
      setContent(val.target.value);
    }
    return (
      <Box p="5">
        <Textarea
          placeholder="What do you want to post?"
          onChange={getContent}
          p="2"
        ></Textarea>

        <Button onClick={post} p="5" mt="5" w="full" colorScheme="twitter">
          Post
        </Button>
      </Box>
    );
  };

  useEffect(() => {
    isRegistered();
  });

  return (
    <div>
      {!registerStatus && registerForm()}
      {registerStatus && postForm()}
    </div>
  );
};

export default Register;
