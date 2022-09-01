import React, { useState, useEffect } from "react";

const SmallConverter = ({ coin }) => {
  let [cryptoValue, setCryptoValue] = useState(0);
  let [currencyValue, setCurrencyValue] = useState(0);
  let [selectedCurrency, setSelectedCurrency] = useState(0);

  useEffect(() => {
    setSelectedCurrency(coin.market_data?.current_price.usd);
    setCurrencyValue(0);
    setCryptoValue(0);
  }, [coin]);

  return (
    <div className="flex flex-col 3xl:flex-row 3xl:p-2 3xl:justify-evenly items-center justify-start w-fit h-18 rounded-[10px] bg-darkgrey p-3 gap-3">
      <div className="flex flex-col xs:flex-row items-center justify-center gap-2 w-full">
        <div className="flex items-center relative">
          <p className="absolute left-0 pl-3 text-white text-sm uppercase">
            {coin.symbol}
          </p>
          <input
            type="number"
            min={0}
            placeholder="0"
            onChange={(e) => {
              setCurrencyValue(e.target.value * selectedCurrency);
              setCryptoValue(e.target.value);
            }}
            value={cryptoValue}
            className=" bg-grey rounded-[10px] text-lightgrey text-sm placeholder:text-sm placeholder:text-lightgrey h-8 w-full pl-20 focus:outline-0 px-2"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 w-full">
        <div className="relative">
          <input
            type="number"
            placeholder="0"
            onChange={(e) => {
              setCryptoValue(e.target.value / selectedCurrency);
              setCurrencyValue(e.target.value);
            }}
            value={currencyValue}
            min={0}
            className="bg-grey rounded-[10px] text-lightgrey text-sm h-8 w-full pl-20 placeholder:text-sm placeholder:text-lightgrey focus:outline-0 px-2"
          />

          <select
            onChange={(e) => {
              setSelectedCurrency(e.target.value);
              setCryptoValue(currencyValue / e.target.value);
            }}
            defaultValue={coin.market_data?.current_price.usd}
            className="absolute focus:outline-0 left-0 bg-grey rounded-[10px] text-xs font-bold pl-2 text-white w-fit h-8"
          >
            <option value={coin.market_data?.current_price.usd}>USD</option>
            <option value={coin.market_data?.current_price.pln}>PLN</option>
            <option value={coin.market_data?.current_price.gbp}>GBP</option>
            <option value={coin.market_data?.current_price.eur}>EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SmallConverter;
