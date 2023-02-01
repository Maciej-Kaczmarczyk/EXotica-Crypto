import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./routes/Account";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import CoinPage from "./routes/CoinPage";




function App() {
  return (
    <div className="px-4 md:px-20 xl:px-32">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
