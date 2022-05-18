import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import contractABI from "../utils/contractABI.json";

import Login from "../components/login.jsx";
import Register from "../components/register.jsx";
import ShowNft from "../components/showNft.jsx";

const Home = () => {
  return (
    <div>
      <Login />
      <Register />
      <ShowNft />
    </div>
  );
};

export default Home;
