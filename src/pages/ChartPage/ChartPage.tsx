import React from "react"
import TradeViewChart from "../../components/Chart/TradeViewChart"
import { Container } from "./styles"

const ChartPage = () => {
  return (
    <Container>
      <TradeViewChart pair={"BNBUSDT"} />
    </Container>
  )
}

export default ChartPage
