import React, { memo, useRef, useEffect, useCallback } from "react"
import { createChart } from "lightweight-charts"
import { ChartSeries, TradeViewChart, TradeViewProps } from "../../utils/types"

const TradeView: React.FC<TradeViewProps> = ({
  initialChartData,
  updatedata = null,
  candleStickConfig = {},
  histogramConfig = {},
  areaConfig = {},
  chartLayout = {},
  containerStyle = {
    maxWidth: "100%",
    maxHeight: "850px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center"
  }
}) => {
  const resizeObserver = useRef<any>()
  const chartContainerRef = useRef<string | any>()
  const chartAreContainerRef = useRef<string | any>()
  const chart = useRef<TradeViewChart | any>()
  const chartArea = useRef<TradeViewChart | any>()
  const candleSeries = useRef<ChartSeries | any>()
  const volumeSeries = useRef<ChartSeries | any>()
  const areaSeries = useRef<ChartSeries | any>()

  const setInitialData = useCallback(() => {
    candleSeries.current = chart?.current?.addCandlestickSeries(candleStickConfig)
    candleSeries?.current.setData(initialChartData)

    const areaData = initialChartData?.map((candle) => {
      return { value: candle?.close, time: candle?.time }
    })

    areaSeries.current = chartArea?.current?.addAreaSeries(areaConfig)
    areaSeries?.current.setData(areaData)

    // volumeSeries.current = chart?.current?.addHistogramSeries(histogramConfig)
    // volumeSeries?.current?.setData(initialChartData)

    candleSeries.current.applyOptions({
      priceFormat: {
        type: "price",
        precision: 5,
        minMove: 0.001
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candleStickConfig, histogramConfig, initialChartData])

  useEffect(() => {
    if (updatedata) {
      candleSeries?.current?.update(updatedata)
      // volumeSeries?.current?.update(updatedata)
    }
  }, [updatedata])

  useEffect(() => {
    if (chart.current) return // no duplication condition
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      ...chartLayout
    })

    if (chartArea.current) return // no duplication condition
    chartArea.current = createChart(chartAreContainerRef.current, {
      width: chartAreContainerRef.current.clientWidth,
      height: chartAreContainerRef.current.clientHeight,
      ...chartLayout
    })
    setInitialData()
  }, [setInitialData, chartLayout])

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      chart.current.applyOptions({
        width,
        height,
        priceFormat: {
          type: "price",
          precision: 5,
          minMove: 0.001
        }
      })
      chartArea.current.applyOptions({
        width,
        height,
        priceFormat: {
          type: "price",
          precision: 5,
          minMove: 0.001
        }
      })
    })

    resizeObserver.current.observe(chartContainerRef.current)

    return () => resizeObserver.current.disconnect()
  }, [])
  return (
    <div style={{ height: "100vh" }}>
      <div ref={chartContainerRef} className="chartContainer" style={containerStyle} />
      <div ref={chartAreContainerRef} className="chartContainer" style={containerStyle} />
    </div>
  )
}

export default memo(TradeView)
