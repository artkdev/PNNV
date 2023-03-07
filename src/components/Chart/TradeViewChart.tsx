import React, { memo, useEffect, useCallback, useState } from "react"
import {
  areaDefaultConfig,
  condleStickDefaultConfig as candleStickDefaultConfig,
  defaultChartLayout,
  histogramDefaultConfig,
  WS_URL
} from "../../utils/constants"
import TradeView from "./TradeView"
import { Props, CandleStickSocketData, CandleType } from "../../utils/types"
import { fetchCandleStickData } from "../../utils/fetchService"
import { candleSocketAdaptor } from "../../utils/adaptor"

const TradeViewChart: React.FC<Props> = ({
  pair = "BTBUSDT",
  interval = "1m",
  candleStickConfig = candleStickDefaultConfig,
  histogramConfig = histogramDefaultConfig,
  areaConfig = areaDefaultConfig,
  chartLayout = defaultChartLayout,
  containerStyle
}) => {
  const [candleStickData, setCandleData] = useState<CandleType[] | null>(null)
  const [updatedata, setUpdateData] = useState<CandleStickSocketData | null>(null)

  const fetchCandleData = useCallback(async () => {
    const candleData = await fetchCandleStickData(pair)
    setCandleData(candleData)
  }, [pair])

  useEffect(() => {
    fetchCandleData()
  }, [fetchCandleData])

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/${pair.toLocaleLowerCase()}@kline_${interval}`)
    // ws.onopen = () => console.log("open");
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data)
      const parsedMessage = candleSocketAdaptor(message)
      setUpdateData(parsedMessage)
    }
    return () => {
      ws.close()
    }
  }, [pair, interval])

  if (!candleStickData) {
    return <div className="loader" />
  }
  return (
    <TradeView
      updatedata={updatedata}
      initialChartData={candleStickData}
      candleStickConfig={candleStickConfig}
      histogramConfig={histogramConfig}
      areaConfig={areaConfig}
      chartLayout={chartLayout}
      containerStyle={containerStyle}
    />
  )
}

export default memo(TradeViewChart)
