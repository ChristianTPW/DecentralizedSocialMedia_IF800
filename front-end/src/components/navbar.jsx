import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import contractABI from "../utils/contractABI.json";
import tokenABI from "../utils/tokenABI.json";

const Navbar = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const { toggleColorMode } = useColorMode();

  const { REACT_APP_SOCIALMEDIA, REACT_APP_TOKEN } = process.env;

  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Wallet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddress(accounts[0]);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        REACT_APP_SOCIALMEDIA,
        contractABI.abi,
        signer
      );

      // Get all the usernames from our contract
      const username = await contract.getUsername(signer.getAddress());

      getBalance();

      if (username != "") {
        setAddress(username);
      }
    } catch (error) {
      console.log(error);
    }
  }, [REACT_APP_SOCIALMEDIA]);

  const getBalance = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        REACT_APP_TOKEN,
        tokenABI.abi,
        signer
      );

      const token = (await contract.balanceOf(signer.getAddress())) / 10 ** 18;

      setBalance(token.toString());
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    connectWallet();
    getBalance();
  }, [connectWallet]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <Flex as="nav" p="4" w="full">
      <HStack>
        <Heading size="md">Blockchain</Heading>

        <Divider orientation="vertical" />

        <ButtonGroup gap="1">
          <Link as={ReactRouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Button size="sm" colorScheme="orange">
              Public
            </Button>
          </Link>

          <Link
            as={ReactRouterLink}
            to="/private"
            _hover={{ textDecoration: "none" }}
          >
            <Button size="sm" colorScheme="facebook">
              Private
            </Button>
          </Link>

          <Button colorScheme="red" size="sm" onClick={toggleColorMode}>
            Color Mode
          </Button>
        </ButtonGroup>
      </HStack>

      <Spacer />

      {address ? (
        <HStack>
          <Text fontWeight="bold">Token: {balance}</Text>
          <Text fontWeight="bold">Hi, {address}</Text>
        </HStack>
      ) : (
        <Button size="sm" colorScheme="teal" onClick={connectWallet}>
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
