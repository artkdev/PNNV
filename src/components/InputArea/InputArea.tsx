import { useEffect, useState } from "react"
import { CoinsType, CurrenciesType } from "../../pages/Home/types"
import { ReactSelectElement, SInputArea, StyledInput } from "./styles"
import { InputAreaPropsType } from "./types"

export default function InputArea({ coins, currencies, price, setPrice, setCurrentCoin }: InputAreaPropsType) {
  const DEFAULT_VALUE = "1"
  const RESET_VALUE = "0"

  const [coinInput, setCoinInput] = useState<string>("1")
  const [currencyInput, setCurrencyInput] = useState<string>("1")

  const [oldCurrency, setOldCurrency] = useState<CurrenciesType>()

  useEffect(() => {
    if (!coins) return
    handleCoinChange(coins[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins])

  const handleCoinChange = async (newValue: CoinsType) => {
    const pair = coins?.find((c) => c.label === newValue?.label)
    try {
      const response = await fetch(
        `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getprice?symbol='${pair?.value}'`
      )
      const data = await response.json()
      setPrice(data[0]?.Price)
      handleCoinInput(coinInput, data[0]?.Price)
      pair && setCurrentCoin(pair)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCurrencyChange = async (newValue: CoinsType) => {
    convert(newValue?.value)
    const value: CurrenciesType = {
      value: newValue?.value ? newValue?.value : "",
      label: newValue?.value ? newValue?.value : ""
    }
    setOldCurrency(value)
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

  const convert = async (newCurrency?: string) => {
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
      <StyledInput
        type="number"
        value={coinInput}
        autoFocus
        style={{ width: coinInput.length + 2 + "ch" }}
        onChange={(e) => {
          handleCoinInput(e.target.value)
        }}
      />
      {coins && coins?.length > 0 && (
        <ReactSelectElement
          options={coins}
          defaultValue={coins[0]}
          onChange={(newValue: unknown) => {
            handleCoinChange(newValue as CoinsType)
          }}
          isClearable
          isSearchable
          classNamePrefix="react-select"
        />
      )}
      =
      <StyledInput
        type="number"
        style={{ width: currencyInput.length + 2 + "ch" }}
        value={currencyInput}
        onChange={(e) => {
          handlePriceInput(e.target.value)
        }}
      />
      {currencies && currencies?.length > 0 && (
        <ReactSelectElement
          options={currencies}
          defaultValue={currencies[0]}
          onChange={(newValue: unknown) => {
            handleCurrencyChange(newValue as CoinsType)
          }}
          isClearable
          isSearchable
          classNamePrefix="react-select"
        />
      )}
    </SInputArea>
  )
}
