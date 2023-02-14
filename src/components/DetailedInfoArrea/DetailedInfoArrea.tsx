import React from "react"
import { SDetailedInfoArrea } from "./styles"

export default function DetailedInfoArrea() {
  return (
    <SDetailedInfoArrea>
      <div className="heading">
        <div className="coin">
          <img src={"blank"} alt="" />
          <h1 className="name">{"coinName"}</h1>
        </div>
        <div className="price">
          <p className="symbol">{"currencySymbol"}</p>
          <div className="value">{"coinPrice"}</div>
          <div className={"blank" ? "delta positive" : "delta negative"}>{"delta %"}</div>
        </div>
      </div>
      <table className="infoBody">
        <tbody>
          <tr>
            <td>
              <div className="head">
                Market Cap <span className={"blank" ? "delta positive" : "delta negative"}>{"delta %"}</span>{" "}
              </div>
              <div className="bot">{"$ marketCap"}</div>
            </td>
            <td>
              <div className="head">24H Volume</div>
              <div className="bot">{"$ 24hVolume"}</div>
            </td>
            <td>
              <div className="head">Circulating Supply</div>
              <div className="bot">
                {"circulatingSupply"} {"coinSymbol"}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="head">Volume/Market Cap</div>
              <div className="bot">{"volume/marketCap"}</div>
            </td>
            <td>
              <div className="head">Max Supply</div>
              <div className="bot">{"maxSupply"}</div>
            </td>
            <td>
              <div className="head">Exchanges</div>
              <div className="bot">
                <img src="" alt="" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </SDetailedInfoArrea>
  )
}
