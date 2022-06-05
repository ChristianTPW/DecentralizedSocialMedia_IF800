import React from "react";

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
