import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [data, setData] = useState<any>()
  const [fetchData, setFetchData] = useState<any>()
  const [currentCoin, setCurrentCoin] = useState<string>("BTC")

  const coins = ["BTC", "LTC", "ETH", "NEO", "BNB", "QTUM", "EOS"]

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:443/ws/ltcusdt@trade`)

    ws.onmessage = (ev: MessageEvent<any>) => {
      const _data = JSON.parse(ev.data)
      setData(_data)
    }
  }, [])

  useEffect(() => {
    let isSubscribed = true
    const fetchData = async () => {
      const data = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${currentCoin}USDT`
      )
      const json = await data.json()
      if (isSubscribed) {
        setFetchData(json)
      }
    }

    fetchData().catch(console.error)

    return () => {
      isSubscribed = false
    }
  }, [currentCoin])

  return (
    <div className="App">
      <header className="App-body">
        <h2>BINANCE</h2>
        <h3>Trade Streams</h3>
        <h4>
          The Trade Streams push raw trade information; each trade has a unique
          buyer and seller.
        </h4>
        <h4>For LTC: </h4>
        <div>Event type: {data?.e}</div>
        <div>Event time: {data?.E}</div>
        <div>Symbol: {data?.s}</div>
        <div>Trade ID: {data?.t}</div>
        <div>Price: {parseFloat(data?.p).toFixed(2)}</div>
        <div>Quantity: {data?.q}</div>
        <div>Buyer order ID: {data?.b}</div>
        <div>Seller order ID: {data?.a}</div>
        <div>Trade time: {data?.T}</div>
        <h1>
          Price for{" "}
          <div>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCurrentCoin(e.target.value)
              }}
            >
              {coins.map((coin) => (
                <option key={coin}>{coin}</option>
              ))}
            </select>{" "}
          </div>
          to USDT: {parseFloat(fetchData?.price).toFixed(2)}
        </h1>
      </header>
    </div>
  )
}

export default App
