import { useEffect, useState } from "react";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";

import contractABI from "../utils/contractABI.json";
import tokenABI from "../utils/tokenABI.json";
import { ethers } from "ethers";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);

  const { REACT_APP_SOCIALMEDIA, REACT_APP_TOKEN } = process.env;

  const checkAllowance = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          REACT_APP_TOKEN,
          tokenABI.abi,
          signer
        );

        const allowance = await contract.allowance(
          signer.getAddress(),
          REACT_APP_SOCIALMEDIA
        );
        console.log("Allowance: ", allowance.toString());

        const totalSupply = await contract.totalSupply();

        const balance = await contract.balanceOf(signer.getAddress());
        console.log("Balance: ", balance.toString());

        if (allowance <= totalSupply) {
          const totalSupply = await contract.totalSupply();
          await contract.approve(REACT_APP_SOCIALMEDIA, totalSupply.toString());
        } else {
          console.log("Enough");
        }
      }
    } catch (error) {
      console.log(error);
      //console.log("TOKEN ADDRESS:", signer);
    }
  };

  const likePost = async (id) => {
    console.log("button clicked?");
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

        checkAllowance();

        await contract.like(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async (id) => {
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

        await contract.dislike(id);
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
        const posts = await contract.getAllPost();

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
  });

  return (
    <div>
      {posts
        .filter((data) => data.isActive === "true")
        .map((r) => (
          <VStack bg="Gray" borderRadius="10" p="5" m="5" key={r.id}>
            <HStack>
              <Text>{r.content}</Text>
            </HStack>
            <HStack>
              <Button onClick={() => likePost(r.id)}>Like</Button>
              <Button onClick={() => dislikePost(r.id)}>Dislike</Button>
            </HStack>
          </VStack>
        ))}
    </div>
  );
};

export default ShowPost;
