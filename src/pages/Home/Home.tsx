import React, { useState, useEffect } from "react"
import DetailedInfoArea from "../../components/DetailedInfoArea/DetailedInfoArea"
import InputArea from "../../components/InputArea/InputArea"
import { Container } from "./styles"
import { CurrenciesType, CoinsType, SymbolDetailsType } from "./types"

export default function Home() {
  const [coins, setCoins] = useState<CoinsType[]>()
  const [currencies, setCurrencies] = useState<CurrenciesType[]>()
  const [currentCoin, setCurrentCoin] = useState<CoinsType>()
  const [symbolDetails, setSymbolDetails] = useState<SymbolDetailsType[]>()
  const [price, setPrice] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCoins = await fetch("https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getsymbols")
        const responseCurrencies = await fetch(
          "https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getcurrencies"
        )

        const dataCoins = await responseCoins.json()
        const dataCurrencies = await responseCurrencies.json()

        const mappedCoinsData = dataCoins.map((d: any) => {
          return { value: d.Symbol, label: d.Name }
        })
        const mappedCurrencyData = dataCurrencies.map((d: any) => {
          return { label: d.Currency, value: d.Currency }
        })
        const mappedSymbolDetails = dataCoins.map((d: any) => {
          return { name: d.Name, fullName: d.FullName, logo: d.Logo }
        })

        setCoins(mappedCoinsData)
        setCurrencies(mappedCurrencyData)
        setSymbolDetails(mappedSymbolDetails)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <InputArea
        coins={coins}
        currencies={currencies}
        price={price}
        setPrice={setPrice}
        setCurrentCoin={setCurrentCoin}
      />
      <DetailedInfoArea currentCoin={currentCoin} price={price} symbolDetails={symbolDetails} />
    </Container>
  )
}
