import React from "react"
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

export default function DetailedInfoArea() {
  return (
    <SDetailedInfoArea>
      <DetailedInfoAreaHeading>
        <Coin>
          <img src={"blank"} alt="" />
          <h1 className="name">{"coinName"}</h1>
        </Coin>
        <Price>
          <Symbol>{"currencySymbol"}</Symbol>
          <Value>{"coinPrice"}</Value>
          <Delta theme={{ delta: "blank" ? "delta positive" : "delta negative" }}>{"delta %"}</Delta>
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
              <DetailedFoot>{"$ 24hVolume"}</DetailedFoot>
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
