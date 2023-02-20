import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DetailedInfoArea from "../../components/DetailedInfoArea/DetailedInfoArea"
import InputArea from "../../components/InputArea/InputArea"
import { SHome } from "./styles"
import { CurrenciesType, CoinsType } from "./types"

export default function Home() {
  const [coins, setCoins] = useState<CoinsType[]>()
  const [currencies, setCurrencies] = useState<CurrenciesType[]>()
  const [currentCoin, setCurrentCoin] = useState<CoinsType>()
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
          return { symbol: d.Symbol, name: d.Name }
        })
        const mappedCurrencyData = dataCurrencies.map((d: any) => {
          return { currency: d.Currency }
        })

        setCoins(mappedCoinsData)
        setCurrencies(mappedCurrencyData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!coins) return
    setCurrentCoin(coins[0])
  }, [coins])

  return (
    <SHome>
      <InputArea
        coins={coins}
        currencies={currencies}
        price={price}
        setPrice={setPrice}
        setCurrentCoin={setCurrentCoin}
      />
      <DetailedInfoArea currentCoin={currentCoin} price={price} />
      <Link to={"/old"}>Go to old design</Link>
    </SHome>
  )
}
