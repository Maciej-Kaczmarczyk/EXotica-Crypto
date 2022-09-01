import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpienner from "../components/LoadingSpienner";

const Trending = () => {
  const [trending, setTrening] = useState([]);

  const url = "https://api.coingecko.com/api/v3/search/trending";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((response) => {
      setTrening(response.data.coins);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="pb-20">
        <div className="flex justify-center my-10">
          <h1 className="text-white text-4xl">Trending Cryptos</h1>
        </div>

        {isLoading ? <LoadingSpienner /> : null}

        <div className="flex flex-wrap justify-between gap-5 w-full">
          {trending.map((coin, index) => {
            return (
              <div
                key={index}
                className="flex flex-row xs:flex-row items-center justify-between p-3 bg-grey w-full rounded-[10px] xl:w-[49%] h-fit  sm:h-20 xs:gap-5 text-xs "
              >
                <Link to={`/coin/${coin.item?.id}`}>
                  <div className="flex items-center justify-between gap-2 w-fit">
                    <div className="flex flex-col items-center w-10 ">
                      <h6 className=" text-lightgrey">Rank</h6>
                      <p className="text-white">{coin.item.market_cap_rank}</p>
                    </div>

                    <img src={coin.item.large} alt="" className="w-8" />
                    <div>
                      <h3 className="text-white">{coin.item.name}</h3>
                      <p className="text-lightgrey">{coin.item.symbol}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col xs:flex-row ml-4 w-50">
                  <div className="flex flex-col items-start w-20 ">
                    <h6 className=" text-lightgrey">Price BTC</h6>
                    <p className="text-white">
                      {coin.item.price_btc.toFixed(7)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Trending;
