import React, { useEffect, useState } from "react"
import {
  Coin,
  Delta,
  DetailedInfoAreaBody,
  DetailedInfoAreaHeading,
  Price,
  Symbol,
  SDetailedInfoArea,
  Value,
  DetailedHead,
  DetailedFoot
} from "./styles"
import { DetailedInfoAreaType, DetailsType } from "./types"

export default function DetailedInfoArea({ currentCoin, price }: DetailedInfoAreaType) {
  const [details, setDetails] = useState<DetailsType>()
  const [deltaPercentage, setDeltaPercentage] = useState<string>()
  const [deltaPositive, setDeltaPositive] = useState<boolean>()

  const hundred = 100

  useEffect(() => {
    if (!currentCoin) return

    const fetchData = async () => {
      try {
        const responseDetails = await fetch(
          `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getdetails?symbol='${currentCoin?.symbol}'`
        )

        const dataDetails = await responseDetails.json()
        setDetails(dataDetails[0])
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoin])

  useEffect(() => {
    if (!details) return
    const changePrice = parseFloat(details.changePrice)
    const oldPrice = price - changePrice
    const delta = ((price - oldPrice) * hundred) / oldPrice
    setDeltaPositive(delta >= 0)
    setDeltaPercentage(delta.toFixed(2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details])

  return (
    <SDetailedInfoArea>
      <DetailedInfoAreaHeading>
        <Coin>
          <img src={"blank"} alt="" />
          <h1 className="name">{currentCoin?.name}</h1>
        </Coin>
        <Price>
          <Symbol>{currentCoin?.symbol}</Symbol>
          <Value>{price}</Value>
          <Delta theme={{ isPositive: deltaPositive ? "green" : "red" }}>
            {deltaPositive ? <span>▲</span> : <span>▼</span>}
            {deltaPercentage}
          </Delta>
        </Price>
      </DetailedInfoAreaHeading>
      <DetailedInfoAreaBody>
        <tbody>
          <tr>
            <td>
              <DetailedHead>
                Market Cap<Delta theme={{ delta: "blank" ? "delta positive" : "delta negative" }}>{"delta %"}</Delta>
              </DetailedHead>
              <DetailedFoot>{"$ marketCap"}</DetailedFoot>
            </td>
            <td>
              <DetailedHead>24H Volume</DetailedHead>
              <DetailedFoot>{details && parseFloat(details.volValue).toFixed(1)}</DetailedFoot>
            </td>
            <td>
              <DetailedHead>Circulating Supply</DetailedHead>
              <DetailedFoot>
                {"circulatingSupply"} {"coinSymbol"}
              </DetailedFoot>
            </td>
          </tr>
          <tr>
            <td>
              <DetailedHead>Volume/Market Cap</DetailedHead>
              <DetailedFoot>{"volume/marketCap"}</DetailedFoot>
            </td>
            <td>
              <DetailedHead>Max Supply</DetailedHead>
              <DetailedFoot>{"maxSupply"}</DetailedFoot>
            </td>
            <td>
              <DetailedHead>Exchanges</DetailedHead>
              <DetailedFoot>
                <img src="" alt="" />
              </DetailedFoot>
            </td>
          </tr>
        </tbody>
      </DetailedInfoAreaBody>
    </SDetailedInfoArea>
  )
}
