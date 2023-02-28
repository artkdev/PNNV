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
  const [marketCap, setMarketCap] = useState<number>()
  const [volumeToMarketCap, setVolumeToMarketCap] = useState<number>()
  const [circulatingSupply, setCirculatingSupply] = useState<number>()

  useEffect(() => {
    if (!currentCoin) return

    const fetchData = async () => {
      try {
        const responseDetails = await fetch(
          `https://j3tizqwiqb.execute-api.us-east-1.amazonaws.com/prod/getdetails?symbol='${currentCoin?.label}'`
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
    const cs = parseFloat(details.Cs)
    const vol = parseFloat(details.VolValue)
    const marketCap = cs * price
    setDeltaPositive(parseFloat(details.ChangePricePercent) >= 0)
    setDeltaPercentage(details.ChangePricePercent)
    setMarketCap(marketCap)
    setVolumeToMarketCap(vol / marketCap)
    setCirculatingSupply(marketCap / price)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details])

  return (
    <SDetailedInfoArea>
      <DetailedInfoAreaHeading>
        <Coin>
          <img src={"blank"} alt="" />
          <h1 className="name">{currentCoin?.label}</h1>
        </Coin>
        <Price>
          <Symbol>{currentCoin?.value}</Symbol>
          <Value>{price}</Value>
          <Delta theme={{ isPositive: deltaPositive }}>
            {deltaPositive ? <span>▲</span> : <span>▼</span>}
            {deltaPercentage}
          </Delta>
        </Price>
      </DetailedInfoAreaHeading>
      <DetailedInfoAreaBody>
        {details && (
          <tbody>
            <tr>
              <td>
                <DetailedHead>Market Cap</DetailedHead>
                {marketCap && <DetailedFoot>{marketCap?.toFixed(2)}</DetailedFoot>}
              </td>
              <td>
                <DetailedHead>24H Volume</DetailedHead>
                <DetailedFoot>{details && parseFloat(details.VolValue).toFixed(1)}</DetailedFoot>
              </td>
              <td>
                <DetailedHead>Circulating Supply</DetailedHead>
                {circulatingSupply && <DetailedFoot>{circulatingSupply?.toFixed(2)}</DetailedFoot>}
              </td>
              <td>
                <DetailedHead>High</DetailedHead>
                <DetailedFoot>{details?.High}</DetailedFoot>
              </td>
              <td>
                <DetailedHead>Change Price</DetailedHead>
                <DetailedFoot>{details?.ChangePrice}</DetailedFoot>
              </td>
            </tr>
            <tr>
              <td>
                <DetailedHead>Volume/Market Cap</DetailedHead>
                {marketCap && <DetailedFoot>{volumeToMarketCap?.toFixed(4)}</DetailedFoot>}
              </td>
              <td>
                <DetailedHead>Max Supply</DetailedHead>
                <DetailedFoot>{details?.MaxSupply}</DetailedFoot>
              </td>
              <td>
                <DetailedHead>Exchanges</DetailedHead>
                <DetailedFoot>
                  <img src="" alt="" />
                </DetailedFoot>
              </td>
              <td>
                <DetailedHead>Low</DetailedHead>
                <DetailedFoot>{details?.Low}</DetailedFoot>
              </td>
            </tr>
          </tbody>
        )}
      </DetailedInfoAreaBody>
    </SDetailedInfoArea>
  )
}
