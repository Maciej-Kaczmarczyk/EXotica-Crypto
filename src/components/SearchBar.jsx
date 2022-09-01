import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = () => {
  let [coins, setCoins] = useState([]);
  let [searchedText, setsearchedText] = useState("");

  const url = "https://api.coingecko.com/api/v3/search?query=" + searchedText;

  useEffect(() => {
    if (searchedText !== "")
      axios
        .get(url)
        .then((res) => {
          setCoins(res.data?.coins.slice(0, 6));
        })
        .catch(console.error);
  }, [url, searchedText]);

  return (
    <>
      <input
        type="text"
        placeholder="Search…"
        onChange={(e) => setsearchedText(e.target.value)}
        className="input focus:outline-0 outline-none bg-grey h-10 w-full"
      />

      <div className={searchedText !== "" ? "flex flex-wrap gap-3" : "hidden"}>
        {searchedText !== ""
          ? coins.map((coin) => {
              console.log(coin);
              return (
                <Link key={coin.id} to={`/coin/${coin.id}`}>
                  <div className="flex items-center w-fit gap-3 bg-grey rounded-[10px] p-2 mt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <img src={coin.large} alt="" className="w-8" />
                      <div className="flex flex-col justify-center w-fit">
                        <h6 className=" text-lightgrey">Rank</h6>
                        <p className=" text-white">{coin?.market_cap_rank}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-white">{coin.name}</h3>
                      <p className="text-lightgrey">
                        {coin?.symbol?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </>
  );
};

export default SearchBar;
