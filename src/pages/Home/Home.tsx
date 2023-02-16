import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DetailedInfoArea from "../../components/DetailedInfoArea/DetailedInfoArea"
import InputArea from "../../components/InputArea/InputArea"
import { SHome } from "./styles"
import { CurrenciesType, CoinsType } from "./types"

export default function Home() {
  const [coins, setCoins] = useState<CoinsType[]>()
  const [currencies, setCurrencies] = useState<CurrenciesType[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCoins = await fetch("https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getsymbols")
        const responseCurrencies = await fetch(
          "https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getCurrencies"
        )
        const dataCoins = await responseCoins.json()
        const dataCurrencies = await responseCurrencies.json()
        const mappedCoinsData = dataCoins.map((d: any) => {
          return { value: d.Symbol, label: d.Name }
        })
        setCoins(mappedCoinsData)
        setCurrencies(dataCurrencies)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SHome>
      <InputArea coins={coins} currencies={currencies} />
      <DetailedInfoArea />
      <Link to={"/old"}>Go to old design</Link>
    </SHome>
  )
}
