import React, { useState } from "react";
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
} from "@chakra-ui/react";

const Navbar = () => {
  const [address, setAddress] = useState("");

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

  return (
    <Flex as="nav" p="4" w="full">
      <HStack>
        <Heading size="md">Blockchain</Heading>

        <Divider orientation="vertical" />

        <ButtonGroup gap="1">
          <Link as={ReactRouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Button size="sm" colorScheme="orange">
              Home
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
