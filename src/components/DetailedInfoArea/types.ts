import { CoinsType, SymbolDetailsType } from "../../pages/Home/types"

export type DetailedInfoAreaType = {
  currentCoin?: CoinsType
  price: number
  symbolDetails?: SymbolDetailsType[]
}

export type DetailsType = {
  ChangePrice: string
  ChangePricePercent: string
  High: string
  Low: string
  VolValue: string
  Cs: string
  MaxSupply: string
  Volume24h: number
  VolumeChange24h: number
  PercentChange1h: number
  PercentChange24h: number
  PercentChange30d: number
  PercentChange60d: number
  PercentChange7d: number
  PercentChange90d: number
}
