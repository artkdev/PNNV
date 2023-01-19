import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [exchangeData, setExchangeData] = useState<any>()
  const [priceChangeDataDay, setPriceChangeDataDay] = useState<any>()
  const [priceChangeDataHour, setPriceChangeDataHour] = useState<any>()
  const [priceChangeDataWeek, setPriceChangeDataWeek] = useState<any>()
  const [currentCoin, setCurrentCoin] = useState<string>("BNB")
  const [currentCurrency, setCurrentCurrency] = useState<string>("USDT")

  const coins = ["BNB", "LTC", "ETH", "NEO", "BTC", "QTUM", "EOS"]
  const currency = ["USDT", "EUR", "GBP"]

  useEffect(() => {
    fetchExchangePrice(currentCoin, currentCurrency)
    fetchPriceChangeDay(currentCoin, currentCurrency)
    fetchPriceChangeHour(currentCoin, currentCurrency)
    fetchPriceChangeWeek(currentCoin, currentCurrency)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const fetchPriceChangeDay = async (
    _currentCoin: string,
    _currentCurrency: string
  ) => {
    try {
      const data = await fetch(
        `https://api.binance.com/api/v3/ticker?symbol=${_currentCoin}${_currentCurrency}&windowSize=1d`
      )
      const json = await data.json()
      setPriceChangeDataDay(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPriceChangeHour = async (
    _currentCoin: string,
    _currentCurrency: string
  ) => {
    try {
      const data = await fetch(
        `https://api.binance.com/api/v3/ticker?symbol=${_currentCoin}${_currentCurrency}&windowSize=1h`
      )
      const json = await data.json()
      setPriceChangeDataHour(json)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPriceChangeWeek = async (
    _currentCoin: string,
    _currentCurrency: string
  ) => {
    try {
      const data = await fetch(
        `https://api.binance.com/api/v3/ticker?symbol=${_currentCoin}${_currentCurrency}&windowSize=7d`
      )
      const json = await data.json()
      setPriceChangeDataWeek(json)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <header className="App-body">
        <h1>
          (Binance) Price for{" "}
          <div>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                fetchExchangePrice(e.target.value, currentCurrency)
                fetchPriceChangeDay(e.target.value, currentCurrency)
                fetchPriceChangeHour(e.target.value, currentCurrency)
                fetchPriceChangeWeek(e.target.value, currentCurrency)
                setCurrentCoin(e.target.value)
              }}
            >
              {coins.map((coin) => (
                <option key={coin}>{coin}</option>
              ))}
            </select>{" "}
          </div>
          to{" "}
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              fetchExchangePrice(currentCoin, e.target.value)
              fetchPriceChangeDay(currentCoin, e.target.value)
              fetchPriceChangeHour(currentCoin, e.target.value)
              fetchPriceChangeWeek(currentCoin, e.target.value)
              setCurrentCurrency(e.target.value)
            }}
          >
            {currency.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>{" "}
          : {parseFloat(exchangeData?.price).toFixed(2)}
        </h1>
        <p>
          Info {currentCoin} price change (1h):{" "}
          {parseFloat(priceChangeDataHour?.priceChangePercent).toFixed(2)}%
        </p>
        <p>
          Info {currentCoin} price change (24h):{" "}
          {parseFloat(priceChangeDataDay?.priceChangePercent).toFixed(2)}%
        </p>
        <p>
          Info {currentCoin} price change (7d):{" "}
          {parseFloat(priceChangeDataWeek?.priceChangePercent).toFixed(2)}%
        </p>
      </header>
    </div>
  )
}

export default App
