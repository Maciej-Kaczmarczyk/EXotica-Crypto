import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CoinItemLg from "./CoinItem";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { MdClose } from "react-icons/md";

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user.email]);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (coins?.length !== 0 && coins !== undefined) setDataLoaded(true);
  }, [coins]);

  const coinPath = doc(db, "users", `${user?.email}`);
  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((item) => item.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {dataLoaded && coins.length !== 0 ? (
        coins.map((coin) => (
          <div key={coin.id} className="w-full">
            <div className=" bg-grey p-3 w-full rounded-[10px] hidden xl:block">
              <div className="flex items-center text-sm justify-between px-4">
                <div className="flex items-center gap-2 w-48 ">
                  <div className="flex items-center gap-5">
                    <MdClose
                      className="hover:cursor-pointer hover:text-lime z-50"
                      size={20}
                      onClick={() => deleteCoin(coin.id)}
                    />

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
                  <p className=" text-white">
                    ${coin.total_volume.toLocaleString()}
                  </p>
                </div>
                <div className="w-30">
                  <h6 className=" text-lightgrey">Mkt</h6>
                  <p className=" text-white">
                    ${coin.market_cap.toLocaleString()}
                  </p>
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
                    <p className=" text-white">
                      ${coin.market_cap.toLocaleString()}
                    </p>
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
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => deleteCoin(coin.id)}
                      className="btn flex items-center justify-center h-8 w-fit bg-orange border-orange text-darkgrey rounded-[10px]"
                    >
                      DELETE
                    </button>
                    <Link
                      to={`/coin/${coin.id}`}
                      className="btn flex items-center justify-center h-8 w-fit bg-lime border-lime text-darkgrey rounded-[10px]"
                    >
                      SEE MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">
          You don't have any coins saved. Please save a coin to add it to your
          watch list.{" "}
          <Link to="/">
            <span className="text-lime">Click here</span>
          </Link>{" "}
          to search coins
        </p>
      )}
    </div>
  );
};

export default SavedCoin;
