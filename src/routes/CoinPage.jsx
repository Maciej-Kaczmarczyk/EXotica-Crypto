import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link, useParams } from "react-router-dom";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillHome,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { BiLeftArrowAlt } from "react-icons/bi";
import SmallConverter from "../components/SmallConverter";
import LoadingSpienner from "../components/LoadingSpienner";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const CoinPage = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((response) => {
      setCoin(response.data);
      setIsLoading(false);
    });
  }, [url]);

  let description = coin.description?.en;
  let description_short = coin.description?.en.substring(0, 800);

  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();

  const coinPath = doc(db, "users", `${user?.email}`);
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

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <Link to="/">
        <div className="flex items-center hover:text-lime">
          <BiLeftArrowAlt size={40} />
          <p>Home</p>
        </div>
      </Link>

      {isLoading ? <LoadingSpienner /> : null}

      {isLoading ? null : (
        <div className="relative flex flex-col items-center justify-center lg:mt-16">
          <div className=" h-fit w-full lg:w-3/4 xl:w-2/3 bg-grey rounded-[10px] p-4 m-4">
            <div className=" bg-grey">
              <div className="flex flex-wrap items-center text-sm justify-start border-lightgrey border-b-2 pb-3 mb-3 gap-y-2 gap-x-10">
                <div className="flex items-center gap-2 w-fit">
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
                      <p className=" text-white">{coin?.market_cap_rank}</p>
                    </div>
                  </div>

                  <img src={coin.image?.large} alt="" className="w-8" />
                  <h3 className="text-white">{coin.name}</h3>
                  <p className="text-lightgrey">
                    {coin?.symbol?.toUpperCase()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-5 text-xs sm:text-sm">
                  <div className="w-fit">
                    <h6 className=" text-lightgrey">Price</h6>
                    <p className=" text-white">
                      ${coin.market_data?.current_price.usd}
                    </p>
                  </div>

                  <div className="w-30">
                    <h6 className=" text-lightgrey">24h Volume</h6>
                    <p className=" text-white">
                      ${coin.market_data?.total_volume.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="w-30">
                    <h6 className=" text-lightgrey">Mkt</h6>
                    <p className=" text-white">
                      ${coin.market_data?.market_cap.usd.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-30">
                    <h6 className=" text-lightgrey">Hashing Algorithm</h6>
                    <p className=" text-white">
                      {coin.hashing_algorithm
                        ? coin.hashing_algorithm
                        : "No Data"}
                    </p>
                  </div>

                  <div className="w-30">
                    <h6 className=" text-lightgrey">Trust Score</h6>
                    <p
                      className={
                        coin.liquidity_score > 50 ? "text-lime" : "text-orange"
                      }
                    >
                      {coin.liquidity_score}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 h-full text-xs lg:text-sm">
                <div className="w-full xl:w-1/2">
                  <div className="flex flex-col">
                    <div className="w-full">
                      <h6 className=" text-lightgrey">Last 7 Days</h6>
                      <div className="w-full">
                        <Sparklines data={coin.market_data?.sparkline_7d.price}>
                          <SparklinesLine
                            color={
                              coin.market_data?.sparkline_7d.price[0] <
                              coin.market_data?.sparkline_7d.price[
                                coin.market_data?.sparkline_7d.price.length - 1
                              ]
                                ? "lime"
                                : "red"
                            }
                          />
                        </Sparklines>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">24 High</h6>
                          <p className="text-white">
                            ${coin.market_data?.high_24h.usd}
                          </p>
                        </div>
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">24 Low</h6>
                          <p className="text-white">
                            ${coin.market_data?.low_24h.usd}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">Price Change 24h</h6>
                          <p
                            className={
                              coin.market_data?.price_change_percentage_24h > 0
                                ? "text-lime"
                                : "text-orange"
                            }
                          >
                            {coin.market_data?.price_change_percentage_24h}%
                          </p>
                        </div>
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">Price Change 7d</h6>
                          <p
                            className={
                              coin.market_data?.price_change_percentage_7d > 0
                                ? "text-lime"
                                : "text-orange"
                            }
                          >
                            {coin.market_data?.price_change_percentage_7d}%
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">Price Change 14d</h6>
                          <p
                            className={
                              coin.market_data?.price_change_percentage_14d > 0
                                ? "text-lime"
                                : "text-orange"
                            }
                          >
                            {coin.market_data?.price_change_percentage_14d}%
                          </p>
                        </div>
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">Price Change 30d</h6>
                          <p
                            className={
                              coin.market_data?.price_change_percentage_30d > 0
                                ? "text-lime"
                                : "text-orange"
                            }
                          >
                            {coin.market_data?.price_change_percentage_30d}%
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">Price Change 60d</h6>
                          <p
                            className={
                              coin.market_data?.price_change_percentage_60d > 0
                                ? "text-lime"
                                : "text-orange"
                            }
                          >
                            {coin.market_data?.price_change_percentage_60d}%
                          </p>
                        </div>
                        <div className="w-fit">
                          <h6 className=" text-lightgrey">Price Change 1y</h6>
                          <p
                            className={
                              coin.market_data?.price_change_percentage_1y > 0
                                ? "text-lime"
                                : "text-orange"
                            }
                          >
                            {coin.market_data?.price_change_percentage_1y}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full xl:w-1/2">
                  <div className="h-fit text-xs lg:text-sm">
                    <h6 className=" text-lightgrey">Description</h6>
                    <div className=" break-normal text-[#ffffff90]">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: isReadMore ? description_short : description,
                        }}
                      ></p>

                      <p
                        onClick={toggleReadMore}
                        className={
                          coin.description?.en.length > 800
                            ? "text-white w-fit hover:cursor-pointer"
                            : "hidden"
                        }
                      >
                        {isReadMore ? "...read more" : " show less"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-center gap-5 pt-5">
                <div className="w-full md:w-1/2 flex flex-wrap-reverse justify-center md:justify-between items-center gap-y-8 md:gap-y-4">
                  <div className="flex gap-2">
                    {coin.links?.homepage[0] ? (
                      <a className="hover:text-lime" href={coin.links?.homepage[0]}>
                        <AiFillHome size={20} />
                      </a>
                    ) : null}
                    {coin.links?.facebook_username ? (
                      <a className="hover:text-lime"
                        href={
                          "https://www.facebook.com/" +
                          coin.links?.facebook_username
                        }
                      >
                        <AiFillFacebook size={20} />
                      </a>
                    ) : null}
                    {coin.links?.twitter_screen_name ? (
                      <a className="hover:text-lime"
                        href={
                          "https://twitter.com/" +
                          coin.links?.twitter_screen_name
                        }
                      >
                        <AiFillTwitterCircle size={20} />
                      </a>
                    ) : null}
                    {coin.links?.homepage[0] ? (
                      <a className="hover:text-lime" href={coin.links?.repos_url.github[0]}>
                        <AiFillGithub size={20} />
                      </a>
                    ) : null}
                    {coin.links?.chat_url[0] ? (
                      <a className="hover:text-lime" href={coin.links?.chat_url[0]}>
                        <BsDiscord size={20} />
                      </a>
                    ) : null}
                  </div>

                  <div className="flex flex-col md:flex-row w-full items-center gap-2">
                    <p>Tags:</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {coin.categories?.map((category, index) => {
                        return (
                          <div key={index} className="badge badge-outline ">
                            {category}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start w-full h-fit xs:w-2/3 md:w-1/2">
                  <SmallConverter coin={coin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinPage;
