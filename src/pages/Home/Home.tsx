import React, { useState, useEffect } from "react"
import ReactJson from "react-json-view"
import { Link } from "react-router-dom"
import { SHome } from "./styles"

export default function Home(){
  const [exchangeData, setExchangeData] = useState<any>()
  const [coinsGeko, setCoinsGeko] = useState<any[]>()
  const [market, setMarket] = useState<any>()
  const [coinDetails, setCoinDetails] = useState<any>()
  const [tickers, setTickers] = useState<any>()
  const [historyData, setHistoryData] = useState<any>()
  const [marketChart, setMarketChart] = useState<any>()
  const [marketRange, setMarketRange] = useState<any>()
  const [ohlc, setOhlc] = useState<any>()
  const [currentCoin, setCurrentCoin] = useState<string>("BNB")
  const [currentCurrency, setCurrentCurrency] = useState<string>("USDT")

  const [coinInput, setcoinInput] = useState<string>("1")
  const [currencyInput, setcurrencyInput] = useState<string>("1")

  const coins = ["BNB", "LTC", "ETH", "NEO", "BTC", "QTUM", "EOS"]
  const currency = ["USDT", "EUR", "GBP"]

  useEffect(() => {
    fetchExchangePrice(currentCoin, currentCurrency)
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (coinsGeko) {
      filterCoin(currentCoin)
      fetchMarket(currentCoin, currentCurrency)
      fetchCoinDetails(currentCoin)
      fetchTickers(currentCoin)
      fetchHistoryData(currentCoin)
      fetchMarketChart(currentCoin, currentCurrency)
      fetchMarketRange(currentCoin, currentCurrency)
      fetchOHLC(currentCoin, currentCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinsGeko])

  useEffect(() => {
    if(exchangeData){
    let price = exchangeData.price;
    let cost = parseFloat(coinInput) * parseFloat(price);
    setcurrencyInput(cost.toString());
    }
   
  }, [exchangeData])
  

  const fetchExchangePrice = async (
    _currentCoin: string,
    _currentCurrency: string
  ) => {
    try {
      const data = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${_currentCoin}${_currentCurrency}`
      )
      const json = await data.json()
      setExchangeData(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCoins = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
      const json = await data.json()
      setCoinsGeko(json)
    } catch (err) {
      console.error(err)
    }
  }

  const filterCoin = (symbol?: string) => {
    const coin = coinsGeko?.find((item) => {
      return item.symbol === symbol?.toLowerCase()
    })
    return coin?.id
  }

  const fetchMarket = async (
    _currentCoin?: string,
    _currentCurrency?: string
  ) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      let cur
      if (_currentCurrency === "USDT") {
        cur = _currentCurrency.slice(0, -1)
      } else {
        cur = _currentCurrency
      }
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&ids=${currentId}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      const json = await data.json()
      setMarket(json[0])
    } catch (err: any) {
      
        console.error(err)
    }
  }

  const fetchCoinDetails = async (_currentCoin?: string) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${currentId}`
      )
      const json = await data.json()
      setCoinDetails(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchTickers = async (_currentCoin?: string) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${currentId}`
      )
      const json = await data.json()
      setTickers(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchHistoryData = async (_currentCoin?: string) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${currentId}/history?date=30-12-2017`
      )
      const json = await data.json()
      setHistoryData(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchMarketChart = async (
    _currentCoin?: string,
    _currentCurrency?: string
  ) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      let cur
      if (_currentCurrency === "USDT") {
        cur = _currentCurrency.slice(0, -1)
      } else {
        cur = _currentCurrency
      }
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${currentId}/market_chart?vs_currency=${cur}&days=1`
      )
      const json = await data.json()
      setMarketChart(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchMarketRange = async (
    _currentCoin?: string,
    _currentCurrency?: string
  ) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      let cur
      if (_currentCurrency === "USDT") {
        cur = _currentCurrency.slice(0, -1)
      } else {
        cur = _currentCurrency
      }
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${currentId}/market_chart/range?vs_currency=${cur}&from=1392577232&to=1422577232`
      )
      const json = await data.json()
      setMarketRange(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchOHLC = async (
    _currentCoin?: string,
    _currentCurrency?: string
  ) => {
    try {
      const currentId = filterCoin(_currentCoin ? _currentCoin : currentCoin)
      let cur
      if (_currentCurrency === "USDT") {
        cur = _currentCurrency.slice(0, -1)
      } else {
        cur = _currentCurrency
      }
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${currentId}/ohlc?vs_currency=${cur}&days=1`
      )
      const json = await data.json()
      setOhlc(json)
    } catch (err) {
      console.error(err)
    }
  }

  const handlecoininput = (value: string)=>{
    setcoinInput(value);
    let price = exchangeData.price;
    let cost = parseFloat(value) * parseFloat(price);
    setcurrencyInput(cost.toString());
  }

  const handlepriceinput = (value: string)=>{
    setcurrencyInput(value);
    let price = exchangeData.price;
    let coins = parseFloat(value)/parseFloat(price)
    setcoinInput(coins.toString());
  }

  function checkSymbol(){
    switch (currentCurrency) {
      case "USDT":
        return "$"
        case "EUR":
        return "€"
     case "GBP":
        return "£"
      default:
        return "$"
    }
  }
    return(
     <SHome>
          <div className="selectArea">
              <input className="datainput" type={"text"}  name="coininput" id="coininput"  value={coinInput} onChange={(e)=>handlecoininput(e.target.value) }/>
              <select
              className="coin"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  fetchExchangePrice(e.target.value, currentCurrency)
                  fetchMarket(e.target.value, currentCurrency)
                  fetchCoinDetails(e.target.value)
                  fetchTickers(e.target.value)
                  fetchHistoryData(e.target.value)
                  fetchMarketChart(e.target.value, currentCurrency)
                  setCurrentCoin(e.target.value)
                }}
              >
                {coins.map((coin) => (
                  <option key={coin}>{coin}</option>
                ))}
              </select>
            {" "}
            = {" "}
             <input className="datainput" type={"text"}   name="priceinput" id="priceinput" value={currencyInput} onChange={(e)=>handlepriceinput(e.target.value) }/>
            <select
            className="currency"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                fetchExchangePrice(currentCoin, e.target.value)
                fetchMarket(currentCoin, e.target.value)
                fetchMarketChart(currentCurrency, e.target.value)
                setCurrentCurrency(e.target.value)
              }}
            >
              {currency.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>
          
          <div className="infoArea">
            <div className="heading">
              <div className="coin">
                <img src={market && market.image} alt="" />
                <h1 className="name">
                {market && market.name}
                </h1>
                </div>
              <div className="price">
                <p className="symbol">{market && checkSymbol()}</p>
                <div className="value">{market && parseFloat(market.current_price)}</div>
                
                <div className={market ? market.price_change_percentage_24h > 0 ? "delta positive": "delta negative" : ""}>{market && market.price_change_percentage_24h.toFixed(1) + " %"}</div>
              </div>
            </div>
            <table className="infoBody">
                <tr>
                  <td>
                    <div className="head">Market Cap <span className={market && market.market_cap_change_percentage_24h > 0 ? "delta positive": "delta negative"}>{market && market.market_cap_change_percentage_24h.toFixed(1) + " %"}</span> </div>
                    <div className="bot">{market && "$" + market.market_cap.toLocaleString()}</div>
                  </td>
                  <td>
                    <div className="head">24H Volume</div>
                     <div className="bot">{market && "$" + market.total_volume.toLocaleString()}</div>
                  </td>
                  <td>
                    <div className="head">Circulating Supply</div>

                    <div className="bot">{market && market.circulating_supply.toLocaleString()} {market && market.symbol}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                   <div className="head">Volume/Market Cap</div>

                    <div className="bot">{market && (market.total_volume / market.market_cap).toFixed(2) }</div>
                  </td>
                  <td>
                    <div className="head">Max Supply</div>

                    <div className="bot">{market && market.max_supply ? market.max_supply : "-" }</div>
                  </td>
                  <td>
                      <div className="head">Exchanges</div>

                    <div className="bot"></div>
                  </td>
                    
                </tr>

            </table>
          </div>

          <Link to={"/old"} >Go to old design</Link>

          
          
      </SHome>)
}

