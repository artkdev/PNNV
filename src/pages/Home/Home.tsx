import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { SHome } from "./styles"
import { OptionsType } from "./types"

export default function Home() {
  const [exchangeData, setExchangeData] = useState<any>()
  const [market, setMarket] = useState<any>()
  const [currentCoin, setCurrentCoin] = useState<string>("BNB")
  const [currentCurrency, setCurrentCurrency] = useState<string>("USDT")
  const [coins, setCoins] = useState<OptionsType[]>()
  const [price, setPrice] = useState<number>(0)
  const [coinInput, setCoinInput] = useState<string>("1")
  const [currencyInput, setCurrencyInput] = useState<string>("1")

  const currency = [
    { name: "USDT", symb: "$" }
    // { name: "EUR", symb: "€" },
    // { name: "GBP", symb: "£" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getsymbols")
        const data = await response.json()
        const mappedData = data.map((d: any) => {
          return { value: d.Symbol, label: d.Name }
        })
        setCoins(mappedData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!coins) return
    handleCoinChange(coins[0].label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins])

  const handleCoinChange = async (newValue: string) => {
    const pair = coins?.find((c) => c.label === newValue)
    try {
      const response = await fetch(
        `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getprice?symbol=${pair?.value}`
      )
      const data = await response.json()
      setPrice(data[0]?.Price)
      handleCoinInput(coinInput, data[0]?.Price)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCoinInput = (value: string, _price?: number) => {
    setCoinInput(value)
    let cost = parseFloat(value) * (_price ? _price : price)
    setCurrencyInput(cost.toString())
  }

  const handlePriceInput = (value: string, _price?: number) => {
    setCurrencyInput(value)
    let coins = parseFloat(value) / (_price ? _price : price)
    setCoinInput(coins.toString())
  }

  return (
    <SHome>
      <div className="selectArea">
        <input
          className="datainput"
          type={"text"}
          name="coininput"
          id="coininput"
          value={coinInput}
          onChange={(e) => handleCoinInput(e.target.value)}
        />
        <select
          className="coin"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleCoinChange(e.target.value)
          }}>
          {coins && coins.map((coin) => <option key={coin.value}>{coin.label}</option>)}
        </select>{" "}
        ={" "}
        <input
          className="datainput"
          type={"text"}
          name="priceinput"
          id="priceinput"
          value={currencyInput}
          onChange={(e) => handlePriceInput(e.target.value)}
        />
        <select
          className="currency"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCurrentCurrency(e.target.value)
          }}>
          {currency.map((cur) => (
            <option key={cur.name}>{cur.name}</option>
          ))}
        </select>
      </div>
      {/* <div className="infoArea">
        <div className="heading">
          <div className="coin">
            <img src={market && market.image} alt="" />
            <h1 className="name">{market && market.name}</h1>
          </div>
          <div className="price">
            <p className="symbol">{market}</p>
            <div className="value">
              {market && parseFloat(market.current_price)}
            </div>
            <div
              className={
                market
                  ? market.price_change_percentage_24h > 0
                    ? "delta positive"
                    : "delta negative"
                  : ""
              }
            >
              {market && market.price_change_percentage_24h.toFixed(1) + " %"}
            </div>
          </div>
        </div>
        <table className="infoBody">
          <tr>
            <td>
              <div className="head">
                Market Cap{" "}
                <span
                  className={
                    market && market.market_cap_change_percentage_24h > 0
                      ? "delta positive"
                      : "delta negative"
                  }
                >
                  {market &&
                    market.market_cap_change_percentage_24h.toFixed(1) + " %"}
                </span>{" "}
              </div>
              <div className="bot">
                {market && "$" + market.market_cap.toLocaleString()}
              </div>
            </td>
            <td>
              <div className="head">24H Volume</div>
              <div className="bot">
                {market && "$" + market.total_volume.toLocaleString()}
              </div>
            </td>
            <td>
              <div className="head">Circulating Supply</div>
              <div className="bot">
                {market && market.circulating_supply.toLocaleString()}{" "}
                {market && market.symbol}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="head">Volume/Market Cap</div>
              <div className="bot">
                {market && (market.total_volume / market.market_cap).toFixed(2)}
              </div>
            </td>
            <td>
              <div className="head">Max Supply</div>
              <div className="bot">
                {market && market.max_supply ? market.max_supply : "-"}
              </div>
            </td>
            <td>
              <div className="head">Exchanges</div>
              <div className="bot"></div>
            </td>
          </tr>
        </table>
      </div> */}
      <Link to={"/old"}>Go to old design</Link>
    </SHome>
  )
}
