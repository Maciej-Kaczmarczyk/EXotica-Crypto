import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const CoinItemLg = ({ coin }) => {
  /* A hook that is used to chek if the coin is already saved. */
  const [savedCoin, setSavedCoin] = useState(false);

  /* Destructuring the user object from the UserAuth() function. */
  const { user } = UserAuth();

  /* Creating a path to the user's document in the database. */
  const coinPath = doc(db, "users", `${user?.email}`);

  /**
   * If the user is signed in, set the savedCoin state to true and update the document with the coin's
   * information.
   */
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          market_cap_rank: coin.market_cap_rank,
          symbol: coin.symbol,
          current_price: coin.current_price,
          market_cap_change_percentage_24h:
            coin.market_cap_change_percentage_24h,
          total_volume: coin.total_volume,
          market_cap: coin.market_cap,
          sparkline_in_7d: { price: coin.sparkline_in_7d.price },
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  return (
    <div className="w-full">
      <div className=" collapse-title bg-grey p-3 w-full rounded-[10px] hidden xl:block">
        <div className="flex items-center text-sm justify-between px-4">
          <div className="flex items-center gap-2 w-48 ">
            <div className="flex items-center gap-5">
              <div className="rating" onClick={saveCoin}>
                {savedCoin ? (
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-lime w-4"
                  />
                ) : (
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 w-4"
                  />
                )}
              </div>

              <div className="w-10">
                <h6 className=" text-lightgrey">Rank</h6>
                <p className=" text-white">{coin.market_cap_rank}</p>
              </div>
            </div>

            <Link to={`/coin/${coin.id}`}>
              <div className="flex items-center gap-2 hover:cursor-pointer">
                <img src={coin.image} alt="" className="w-8" />
                <h3 className="text-white hover:underline hover:text-lime">
                  {coin.name}
                </h3>
                <p className="text-lightgrey">{coin.symbol}</p>
              </div>
            </Link>
          </div>

          <div className="w-20">
            <h6 className=" text-lightgrey">24H</h6>
            <p
              className={
                coin.market_cap_change_percentage_24h > 0
                  ? "text-lime"
                  : "text-orange"
              }
            >
              {coin.market_cap_change_percentage_24h}%
            </p>
          </div>

          <div className="w-20">
            <h6 className=" text-lightgrey">Price</h6>
            <p className=" text-white">${coin.current_price}</p>
          </div>

          <div className="w-20">
            <h6 className=" text-lightgrey">24h Volume</h6>
            <p className=" text-white">${coin.total_volume.toLocaleString()}</p>
          </div>

          <div className="w-30">
            <h6 className=" text-lightgrey">Mkt</h6>
            <p className=" text-white">${coin.market_cap.toLocaleString()}</p>
          </div>

          <div className="w-32">
            <h6 className=" text-lightgrey">Last 7 Days</h6>
            <div className="w-36">
              <Sparklines data={coin.sparkline_in_7d.price}>
                <SparklinesLine
                  color={
                    coin.sparkline_in_7d.price[0] <
                    coin.sparkline_in_7d.price[
                      coin.sparkline_in_7d.price.length - 1
                    ]
                      ? "lime"
                      : "red"
                  }
                />
              </Sparklines>
            </div>
          </div>
        </div>
      </div>

      <div className="block xl:hidden">
        <div className="collapse rounded-[10px]">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-sm bg-grey text-white p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center w-fit gap-1">
                <div className="rating mr-1" onClick={saveCoin}>
                  {savedCoin ? (
                    <input
                      type="radio"
                      name="rating-4"
                      className="mask mask-star-2 bg-lime w-3"
                    />
                  ) : (
                    <input
                      type="radio"
                      name="rating-4"
                      className="mask mask-star-2 w-3"
                    />
                  )}
                </div>

                <div className="flex flex-col text-xs sm:text-sm items-center justify-center w-8 mr-2">
                  <h6 className=" text-lightgrey">Rank</h6>
                  <p className=" text-white">{coin.market_cap_rank}</p>
                </div>

                <img src={coin.image} alt="" className="w-6 sm:w-8" />
                <h3 className="w-fit">{coin.name}</h3>
                <p className="text-lightgrey">{coin.symbol}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-3 text-xs xs:text-sm">
                  <p
                    className={
                      coin.market_cap_change_percentage_24h > 0
                        ? "text-lime"
                        : "text-orange"
                    }
                  >
                    {coin.market_cap_change_percentage_24h}%
                  </p>
                </div>
                <p>+</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center collapse-content bg-grey pl-10">
            <div>
              <h6 className="text-sm text-lightgrey">Price</h6>
              <p className=" text-white">${coin.current_price}</p>
            </div>

            <div>
              <h6 className="text-sm text-lightgrey">24h Volume</h6>
              <p className=" text-white">
                ${coin.total_volume.toLocaleString()}
              </p>
            </div>

            <div>
              <h6 className="text-sm text-lightgrey">Mkt</h6>
              <p className=" text-white">${coin.market_cap.toLocaleString()}</p>
            </div>

            <div>
              <h6 className="text-sm text-lightgrey">Last 7 Days</h6>
              <div className="w-36">
                <Sparklines data={coin.sparkline_in_7d.price}>
                  <SparklinesLine
                    color={
                      coin.sparkline_in_7d.price[0] <
                      coin.sparkline_in_7d.price[
                        coin.sparkline_in_7d.price.length - 1
                      ]
                        ? "lime"
                        : "red"
                    }
                  />
                </Sparklines>
              </div>
            </div>

            <Link
              to={`/coin/${coin.id}`}
              className="btn flex items-center justify-center h-8  bg-lime border-lime text-darkgrey rounded-[10px]"
            >
              SEE MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinItemLg;
