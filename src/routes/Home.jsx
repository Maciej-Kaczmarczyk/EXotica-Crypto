import React from "react";
import CoinSearch from "../components/CoinSearch";
import Trending from "../components/Trending";
import Footer from "../components/Footer";

const Home = ({ coins }) => {
  return (
    <>
      <CoinSearch coins={coins} />
      <Trending />
      <Footer />
    </>
  );
};

export default Home;
