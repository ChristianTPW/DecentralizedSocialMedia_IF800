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

const Navbar = () => {
  const [address, setAddress] = useState("");
  const { toggleColorMode } = useColorMode();

  const { REACT_APP_SOCIALMEDIA } = process.env;

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

      // Get all the domain names from our contract
      const username = await contract.getUsername();

      setAddress(username);
    } catch (error) {
      console.log(error);
    }
  }, [REACT_APP_SOCIALMEDIA]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

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
        <Text fontWeight="bold">Hi, {address}</Text>
      ) : (
        <Button size="sm" colorScheme="teal" onClick={connectWallet}>
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
