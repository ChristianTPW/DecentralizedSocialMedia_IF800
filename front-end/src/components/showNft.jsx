import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import contractABI from "../utils/contractABI.json";

const ShowNft = () => {
  const [posts, setPosts] = useState([]);

  const { REACT_APP_SOCIALMEDIA } = process.env;

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
      posted:
      {posts.map((r) => (
        <div key={r.id}>
          <p>ID: {r.id}</p>
          <p>{r.content}</p>
          <p>Posted by: {r.owner}</p>
          <p>Like: {r.like}</p>
          <p>Dislike: {r.dislike}</p>
          <p>Status: {r.isActive}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowNft;
