import React, { useState, useEffect } from "react";
import CoinItem from "./CoinItem";
import axios from "axios";
import SearchBar from "./SearchBar";
import LoadingSpienner from "./LoadingSpienner";

const CoinSearch = () => {
  let [coins, setCoins] = useState([]);

  let itemsAmount = 20;
  let [page, setPage] = useState(1);
  const prevPage = () => setPage(page > 0 && page !== 1 ? page - 1 : 1);
  const nextPage = () => setPage(page + 1);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=" +
    itemsAmount +
    "&page=" +
    page +
    "&sparkline=true";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [url]);

  return (
    <>
      <div className="flex justify-center my-10">
        <h1 className="text-white text-4xl">Crypto Search</h1>
      </div>

      <SearchBar />

      <div className="flex-col flex gap-5 mt-5">
        {isLoading ? <LoadingSpienner /> : null}

        {coins.map((coin) => {
          return <CoinItem key={coin.id} coin={coin} />;
        })}

        <div className="btn-group flex justify-center">
          <button
            onClick={prevPage}
            className="btn bg-lime text-darkgrey border-0 hover:bg-darkgrey hover:text-lime"
          >
            «
          </button>
          <button className="items-center btn bg-lime text-darkgrey hover:bg-lime hover:text-darkgrey hover:cursor-default border-0">
            {page}
          </button>
          <button
            onClick={nextPage}
            className="btn bg-lime text-darkgrey border-0 hover:bg-darkgrey hover:text-lime"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default CoinSearch;
