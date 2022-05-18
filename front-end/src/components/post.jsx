import { useState } from "react";

import contractABI from "../utils/contractABI.json";
import { ethers } from "ethers";

const Post = () => {
  const [content, setContent] = useState(null);

  const { REACT_APP_SOCIALMEDIA } = process.env;

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

        // Get all the domain names from our contract
        const post = await contract.userPost(content);

        console.log("User: ", signer, "Posted: ", post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postForm = () => {
    function getContent(val) {
      setContent(val.target.value);
    }
    return (
      <div>
        <input
          type="text"
          placeholder="What you want to post?"
          onChange={getContent}
        />

        <button onClick={post}>Post</button>
      </div>
    );
  };

  return <div>{postForm()};</div>;
};

export default Post;
