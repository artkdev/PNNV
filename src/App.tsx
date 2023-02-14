import React, { useState, useEffect } from "react"
import "./App.css"
import { OptionsType } from "./types"
import Select, { SingleValue, StylesConfig } from "react-select"

function App() {
  const [currentCoin, setCurrentCoin] = useState<string>("BNB")
  const [currentCurrency, setCurrentCurrency] = useState<string>("USDT")
  const [coins, setCoins] = useState<OptionsType[]>()
  const [price, setPrice] = useState<number>()

  const currency: OptionsType[] = [{ value: "USDT", label: "USDT" }]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getsymbols"
        )
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
    handleCoinChange(coins[0])
  }, [coins])

  const dropdownStyles: StylesConfig<OptionsType, false> = {
    container: (provided) => ({
      ...provided,
      width: "150px",
    }),
    control: (provided) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      height: "24px",
      width: "150px",
      fontSize: "16px",
    }),
    menu: (provided, state) => ({
      ...provided,
      color: "#000",
      fontSize: "16px",
    }),
  }

  const handleCoinChange = async (newValue: SingleValue<OptionsType>) => {
    try {
      const response = await fetch(
        `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getprice?symbol=${newValue?.value}`
      )
      const data = await response.json()
      setPrice(data[0]?.Price)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCurrencyChange = async (newValue: SingleValue<OptionsType>) => {}

  return (
    <div className="App">
      <div className="App-body">
        Price for{" "}
        {coins && (
          <Select
            options={coins}
            defaultValue={coins[0]}
            styles={dropdownStyles}
            isSearchable={false}
            onChange={handleCoinChange}
          />
        )}
        to{" "}
        <Select
          options={currency}
          defaultValue={currency[0]}
          styles={dropdownStyles}
          isSearchable={false}
          onChange={handleCurrencyChange}
        />
        : {price}
      </div>
    </div>
  )
}

export default App
