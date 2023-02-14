import { useEffect, useState } from "react"
import { CoinType, OptionsType } from "../../pages/Home/types"
import { SInputArea } from "./styles"
import { InputAreaPropsType } from "./types"

export default function InputArea({ coins, currency }: InputAreaPropsType) {
  const DEFAULT_VALUE = "1"
  const RESET_VALUE = "0"

  const [coinInput, setCoinInput] = useState<string>("1")
  const [currencyInput, setCurrencyInput] = useState<string>("1")
  const [price, setPrice] = useState<number>(0)

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

  //    const handleCurrencyChange = async (newValue: string) => {
  //      const pair = coins?.find((c) => c.label === newValue)
  //      try {
  //        const response = await fetch(
  //          `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getprice?symbol=${pair?.value}`
  //        )
  //        const data = await response.json()
  //        setPrice(data[0]?.Price)
  //        handleCoinInput(coinInput, data[0]?.Price)
  //      } catch (error) {
  //        console.log(error)
  //      }
  //    }

  const handleCoinInput = (value: string, _price?: number) => {
    if (!value) {
      setCoinInput(DEFAULT_VALUE)
      setCurrencyInput((_price ? _price : price).toString())
      return
    }
    if (parseFloat(value) <= 0) {
      setCoinInput(RESET_VALUE)
      setCurrencyInput(RESET_VALUE)
      return
    }

    setCoinInput(value)
    let cost = parseFloat(value) * (_price ? _price : price)
    setCurrencyInput(cost.toString())
  }

  const handlePriceInput = (value: string, _price?: number) => {
    if (!value) {
      setCurrencyInput(DEFAULT_VALUE)
      let coins = parseFloat(DEFAULT_VALUE) / (_price ? _price : price)
      setCoinInput(coins.toString())
      return
    }
    if (parseFloat(value) <= 0) {
      setCoinInput(RESET_VALUE)
      setCurrencyInput(RESET_VALUE)
      return
    }
    setCurrencyInput(value)
    let coins = parseFloat(value) / (_price ? _price : price)
    setCoinInput(coins.toString())
  }

  return (
    <SInputArea>
      <input
        className="dataInput"
        type="number"
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
        {coins && coins.map((coin: OptionsType) => <option key={coin.value}>{coin.label}</option>)}
      </select>{" "}
      ={" "}
      <input
        className="dataInput"
        type="number"
        name="priceinput"
        id="priceinput"
        value={currencyInput}
        onChange={(e) => handlePriceInput(e.target.value)}
      />
      <select
        className="currency"
        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        //   setCurrentCurrency(e.target.value)
        // }}
      >
        {currency.map((cur: CoinType) => (
          <option key={cur.name}>{cur.name}</option>
        ))}
      </select>
    </SInputArea>
  )
}
