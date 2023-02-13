import React, { useState, useEffect } from "react"
import ReactJson from "react-json-view"
import { Link } from "react-router-dom"

export default function Old(){
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
    } catch (err) {
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


 
    return(
     <div className="App-body">
        <h1>
          (Binance) Price for{" "}
          <div>
            <select
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
          </div>
          to
          <select
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
        </h1>
        <div className="Accordion-container">
          exchange data (Binance)
          <ReactJson src={exchangeData} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/markets markets info (CoinGeko)
          <ReactJson src={market} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/(id) details (CoinGeko)
          <ReactJson src={coinDetails} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/(id)/tickers (CoinGeko)
          <ReactJson src={tickers} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/(id)/history (CoinGeko)
          <ReactJson src={historyData} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/(id)/market_chart (CoinGeko)
          <ReactJson src={marketChart} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/(id)/market_chart/range (CoinGeko)
          <ReactJson src={marketRange} theme="bright:inverted" collapsed />
        </div>
        <div className="Accordion-container">
          /coins/(id)/ohlc (CoinGeko)
          <ReactJson src={ohlc} theme="bright:inverted" collapsed />
        </div>
        <Link to={"/"} >Go to new design</Link>
      </div>)
}