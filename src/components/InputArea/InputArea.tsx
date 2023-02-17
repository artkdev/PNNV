import { useEffect, useState } from "react"
import { CurrenciesType, CoinsType } from "../../pages/Home/types"
import { SInputArea, StyledInput, StyledSelect } from "./styles"
import { InputAreaPropsType } from "./types"

export default function InputArea({ coins, currencies }: InputAreaPropsType) {
  const DEFAULT_VALUE = "1"
  const RESET_VALUE = "0"

  const [coinInput, setCoinInput] = useState<string>("1")
  const [currencyInput, setCurrencyInput] = useState<string>("1")
  const [price, setPrice] = useState<number>(0)

  const [oldCurrency, setOldCurrency] = useState<string>("USD")

  useEffect(() => {
    if (!coins) return
    handleCoinChange(coins[0].name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins])

  const handleCoinChange = async (newValue: string) => {
    const pair = coins?.find((c) => c.name === newValue)
    try {
      const response = await fetch(
        `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getprice?symbol=${pair?.symbol}`
      )
      const data = await response.json()
      setPrice(data[0]?.Price)
      handleCoinInput(coinInput, data[0]?.Price)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCurrencyChange = async (newValue: string) => {
    convert(newValue)
    setOldCurrency(newValue)
  }

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

  const convert = async (newCurrency: string) => {
    try {
      var myHeaders = new Headers()
      myHeaders.append("apikey", "t39onDuMTiuWKvwmvZ63ScfFPjU9ITJ8")

      let requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders
      }

      const data = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${newCurrency}&from=${oldCurrency}&amount=${currencyInput}`,
        requestOptions
      )

      const dataJSON = await data.json()
      setCurrencyInput(dataJSON.result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <SInputArea>
      <StyledInput type="number" value={coinInput} onChange={(e) => handleCoinInput(e.target.value)} />
      <StyledSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleCoinChange(e.target.value)
        }}>
        {coins && coins.map((coin: CoinsType) => <option key={coin.symbol}>{coin.name}</option>)}
      </StyledSelect>
      =
      <StyledInput type="number" value={currencyInput} onChange={(e) => handlePriceInput(e.target.value)} />
      <StyledSelect
        className="currency"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleCurrencyChange(e.target.value)
        }}>
        {currencies?.map((currency: CurrenciesType) => (
          <option key={currency.currency}>{currency.currency}</option>
        ))}
      </StyledSelect>
    </SInputArea>
  )
}
