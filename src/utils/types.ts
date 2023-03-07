import { CrosshairMode, LineStyle } from "lightweight-charts"

export interface CandleStickSocketData {
  open: number
  high: number
  low: number
  close: number
  time: number
  value: number
  color: string
}
export interface TradeViewProps {
  initialChartData: CandleType[]
  updatedata: CandleStickSocketData | null
  candleStickConfig: CandleStickConfig
  histogramConfig: HistogramConfig
  areaConfig: AreaConfig
  chartLayout: {}
  containerStyle?: {
    [x: string]: any
  }
}

export interface CandleStickConfig {
  upColor?: string
  downColor?: string
  borderDownColor?: string
  borderUpColor?: string
  wickDownColor?: string
  wickUpColor?: string
}

export interface HistogramConfig {
  base?: number
  lineWidth?: number
  priceFormat?: {
    type: string
  }
  overlay?: boolean
  scaleMargins?: {
    top?: number
    bottom?: number
  }
}

export interface AreaConfig {
  lineColor?: string
  topColor?: string
  bottomColor?: string
}
export interface ChartSeries {
  setData: (data: []) => {}
  applyOptions: (data: {}) => {}
  update: (data: CandleStickSocketData) => {}
}
export interface TradeViewChart {
  addCandlestickSeries: (config: CandleStickConfig) => {}
  addHistogramSeries: (config: HistogramConfig) => {}
  addAreaSeries: (config: AreaConfig) => {}
}
export interface Props {
  pair: string
  interval?: string
  candleStickConfig?: CandleStickConfig
  histogramConfig?: HistogramConfig
  areaConfig?: AreaConfig
  chartLayout?: DefaultChartLayout
  containerStyle?: {
    [x: string]: any
  }
}

export interface DefaultChartLayout {
  layout?: {
    backgroundColor: string
    textColor: string
  }
  grid?: {
    vertLines?: {
      color: string
      style: LineStyle
    }
    horzLines?: {
      color: "#838fa3"
      style: LineStyle
    }
  }
  crosshair?: {
    mode: CrosshairMode
  }
  priceScale?: {
    borderColor: string
  }
  timeScale?: {
    borderColor: string
    timeVisible: boolean
    secondsVisible: boolean
  }
}

export type CandleType = {
  time: number
  open: number
  high: number
  low: number
  close: number
  value: number
  color: string
}
