import { useEffect, useState } from "react"
import { CoinType, OptionsType } from "../../pages/Home/types"
import { SInputArrea } from "./styles"
import { InputArreaPropsType } from "./types"

export default function InputArrea({ coins, currency }: InputArreaPropsType) {
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
      setCoinInput("1")
      setCurrencyInput((_price ? _price : price).toString())
      return
    }
    if (parseFloat(value) <= 0) {
      setCoinInput("0")
      setCurrencyInput("0")
      return
    }

    setCoinInput(value)
    let cost = parseFloat(value) * (_price ? _price : price)
    setCurrencyInput(cost.toString())
  }

  const handlePriceInput = (value: string, _price?: number) => {
    if (!value) {
      setCurrencyInput("1")
      let coins = parseFloat("1") / (_price ? _price : price)
      setCoinInput(coins.toString())
      return
    }
    if (parseFloat(value) <= 0) {
      setCoinInput("0")
      setCurrencyInput("0")
      return
    }
    setCurrencyInput(value)
    let coins = parseFloat(value) / (_price ? _price : price)
    setCoinInput(coins.toString())
  }

  return (
    <SInputArrea>
      <input
        className="datainput"
        type={"number"}
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
        className="datainput"
        type={"number"}
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
    </SInputArrea>
  )
}
