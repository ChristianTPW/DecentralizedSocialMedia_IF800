import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ethers } from "ethers";

import contractABI from "./utils/contractABI.json";

import Home from "./pages/home.jsx";
import PrivatePage from "./pages/privatePage";
import { UserContext } from "./context/userContext";
import Navbar from "./components/navbar";

const App = () => {
  const [address, setAddress] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <UserContext.Provider value={{ address, setAddress }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/private" element={<PrivatePage />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
