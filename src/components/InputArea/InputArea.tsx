import { useEffect, useState } from "react"
import { CoinType, OptionsType } from "../../pages/Home/types"
import { SInputArea, StyledInput, StyledSelect } from "./styles"
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
    let _coinInput = value ? value : DEFAULT_VALUE
    let _currencyInput = (parseFloat(_coinInput) * (_price ? _price : price)).toString()

    if (value && parseFloat(value) <= 0) {
      _coinInput = RESET_VALUE
      _currencyInput = RESET_VALUE
    }

    setCoinInput(_coinInput)
    setCurrencyInput(_currencyInput)
  }

  const handlePriceInput = (value: string, _price?: number) => {
    let _currencyInput = value ? value : DEFAULT_VALUE
    let _coinInput = (parseFloat(_currencyInput) / (_price ? _price : price)).toString()

    if (value && parseFloat(value) <= 0) {
      _currencyInput = RESET_VALUE
      _coinInput = RESET_VALUE
    }

    setCurrencyInput(_currencyInput)
    setCoinInput(_coinInput)
  }

  return (
    <SInputArea>
      <StyledInput type="number" value={coinInput} onChange={(e) => handleCoinInput(e.target.value)} />
      <StyledSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleCoinChange(e.target.value)
        }}>
        {coins && coins.map((coin: OptionsType) => <option key={coin.value}>{coin.label}</option>)}
      </StyledSelect>
      =
      <StyledInput type="number" value={currencyInput} onChange={(e) => handlePriceInput(e.target.value)} />
      <StyledSelect
        className="currency"
        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        //   setCurrentCurrency(e.target.value)
        // }}
      >
        {currency.map((cur: CoinType) => (
          <option key={cur.name}>{cur.name}</option>
        ))}
      </StyledSelect>
    </SInputArea>
  )
}
