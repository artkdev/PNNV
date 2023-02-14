import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DetailedInfoArrea from "../../components/DetailedInfoArrea/DetailedInfoArea"
import InputArea from "../../components/InputArea/InputArea"
import { SHome } from "./styles"
import { OptionsType } from "./types"

export default function Home() {
  // const [exchangeData, setExchangeData] = useState<any>()
  // const [market, setMarket] = useState<any>()
  const [coins, setCoins] = useState<OptionsType[]>()

  const currency = [
    { name: "USDT", symbol: "$" }
    // ,
    // { name: "EUR", symbol: "€" },
    // { name: "GBP", symbol: "£" }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getsymbols")
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

  return (
    <SHome>
      <InputArea coins={coins} currency={currency} />
      <DetailedInfoArrea />
      <Link to={"/old"}>Go to old design</Link>
    </SHome>
  )
}
