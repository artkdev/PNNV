import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [data, setData] = useState<any>()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1d"
    )

    ws.onmessage = (ev: MessageEvent<any>) => {
      const _data = JSON.parse(ev.data)
      setData(_data)
    }

    fetch("https://api.binance.com/api/v3/aggTrades?symbol=BTCUSDT")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
          console.log(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  return (
    <div className="App">
      <header className="App-body">
        <h2>Real time crypto prices</h2>
        <h3>BNBBTC Kline/Candlestick data with web3 socket</h3>
        <div>Open price: {parseFloat(data?.k?.o).toFixed(2)}</div>
        <div>Close price: {parseFloat(data?.k?.c).toFixed(2)}</div>
        <div>High price: {parseFloat(data?.k?.h).toFixed(2)}</div>
        <div>Low price: {parseFloat(data?.k?.l).toFixed(2)}</div>
        <div>Base asset volume: {parseFloat(data?.k?.v).toFixed(2)}</div>
        <h3>Aggregator trades:</h3>
        <div>
          {items.map((item) => (
            <div>
              <div>Aggregate tradeId: {item?.a}</div>
              <div>Price: {item?.p}</div>
              <div>Timestamp: {item?.T}</div>
              <hr />
            </div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default App
