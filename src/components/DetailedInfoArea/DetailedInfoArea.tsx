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
  DetailedFoot,
  Name
} from "./styles"
import { DetailedInfoAreaType, DetailsType } from "./types"

export default function DetailedInfoArea({ currentCoin, price, symbolDetails }: DetailedInfoAreaType) {
  const [details, setDetails] = useState<DetailsType>()
  const [deltaPercentage, setDeltaPercentage] = useState<string>()
  const [deltaPositive, setDeltaPositive] = useState<boolean>()
  const [marketCap, setMarketCap] = useState<number>()
  const [volumeToMarketCap, setVolumeToMarketCap] = useState<number>()
  const [circulatingSupply, setCirculatingSupply] = useState<number>()
  const [logo, setLogo] = useState<string>()
  const [fullName, setFullName] = useState<string>()

  useEffect(() => {
    if (!currentCoin) return

    const sD = symbolDetails?.find((sd) => sd.name === currentCoin.label)

    setLogo(sD?.logo)
    setFullName(sD?.fullName)

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
    <div>
      <SDetailedInfoArea>
        <DetailedInfoAreaHeading>
          <Coin>
            <img src={logo} alt={fullName} width="50px" />
            <Name>{fullName}</Name>
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
                  <DetailedFoot>{details?.Volume24h}</DetailedFoot>
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
                  {marketCap && <DetailedFoot>{(details?.Volume24h / marketCap)?.toFixed(4)}</DetailedFoot>}
                </td>
                <td>
                  <DetailedHead>Max Supply</DetailedHead>
                  <DetailedFoot>{details?.MaxSupply}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Volume Change 34h</DetailedHead>
                  <DetailedFoot>{details?.VolumeChange24h}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Low</DetailedHead>
                  <DetailedFoot>{details?.Low}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Change Price Percent</DetailedHead>
                  <DetailedFoot>{details?.ChangePricePercent}</DetailedFoot>
                </td>
              </tr>
            </tbody>
          )}
        </DetailedInfoAreaBody>
      </SDetailedInfoArea>
      <SDetailedInfoArea>
        <DetailedInfoAreaHeading>Additional info</DetailedInfoAreaHeading>
        <DetailedInfoAreaBody>
          {details && (
            <tbody>
              <tr>
                <td>
                  <DetailedHead>Percent Change 1h</DetailedHead>
                  <DetailedFoot>{details?.PercentChange1h}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Percent Change 24h</DetailedHead>
                  <DetailedFoot>{details?.PercentChange24h}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Percent Change 30d</DetailedHead>
                  <DetailedFoot>{details?.PercentChange30d}</DetailedFoot>
                </td>
              </tr>
              <tr>
                <td>
                  <DetailedHead>Percent Change 60d</DetailedHead>
                  <DetailedFoot>{details?.PercentChange60d}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Percent Change 7d</DetailedHead>
                  <DetailedFoot>{details?.PercentChange7d}</DetailedFoot>
                </td>
                <td>
                  <DetailedHead>Percent Change 90d</DetailedHead>
                  <DetailedFoot>{details?.PercentChange90d}</DetailedFoot>
                </td>
              </tr>
            </tbody>
          )}
        </DetailedInfoAreaBody>
      </SDetailedInfoArea>
    </div>
  )
}
