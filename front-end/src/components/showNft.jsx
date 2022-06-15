import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { HStack, VStack, Button, Text } from "@chakra-ui/react";

import contractABI from "../utils/contractABI.json";

const ShowNft = () => {
  const [posts, setPosts] = useState([]);
  const [hiddenId, setHiddenId] = useState([]);

  const { REACT_APP_SOCIALMEDIA } = process.env;

  const likeMinted = async (id) => {
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
        await contract.likeMinted(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hidePost = async (_postId) => {
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
        await contract.hideMinted(_postId);
        //return contract.getUsername(address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHiddenList = async () => {
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

        return contract.getHiddenId();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsername = async (address) => {
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

        return contract.getUsername(address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMints = async () => {
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

        const posts = await contract.getAllMintedPost();

        return Promise.all(
          posts.map(async (p) => ({
            id: p[0].toString(),
            content: p[1],
            date: p[2],
            owner: await getUsername(p[3].toString()),
            like: p[4].toString(),
            dislike: p[5].toString(),
            isActive: p[6].toString(),
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMints().then((res) => setPosts(res));
    getHiddenList().then((r) => setHiddenId(r.map((i) => i.toString())));
  }, []);

  return (
    <div>
      {posts
        .sort((a, b) => parseInt(b.date) - parseInt(a.date))
        .filter((i) => !hiddenId.includes(i.id.toString()))
        .map((r) => (
          <VStack bg="Gray" borderRadius="10" p="5" m="5" key={r.id}>
            <HStack>
              <VStack>
                <Text>{r.content}</Text>

                <Text>posted by: {r.owner}</Text>
                <HStack>
                  <Text>Like: {r.like}</Text>
                  <Text>Dislike: {r.dislike}</Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack>
              <Button onClick={() => likeMinted(r.id)}>Like</Button>
              <Button onClick={() => hidePost(r.id)}>Hide</Button>
            </HStack>
          </VStack>
        ))}
    </div>
  );
};

export default ShowNft;
