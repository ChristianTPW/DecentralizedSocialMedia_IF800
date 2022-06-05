import React, { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import { HStack, VStack, Button, Text } from "@chakra-ui/react";

import contractABI from "../utils/contractABI.json";

const ShowNft = () => {
  const [posts, setPosts] = useState([]);

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

        console.log(posts);

        return posts.map((p) => ({
          id: p[0].toString(),
          content: p[1],
          date: p[2],
          owner: p[3].toString(),
          like: p[4].toString(),
          dislike: p[5].toString(),
          isActive: p[6].toString(),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMints().then((res) => setPosts(res));
  }, []);

  return (
    <div>
      {posts
        .sort((a, b) => parseInt(b.date) - parseInt(a.date))
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
              {/* <Button onClick={() => likePost(r.id)}>Like ({r.id})</Button> */}
              <Button onClick={() => likeMinted(r.id)}>Like</Button>
            </HStack>
          </VStack>
        ))}
    </div>
  );
};

export default ShowNft;
