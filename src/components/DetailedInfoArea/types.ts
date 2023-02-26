import { CoinsType } from "../../pages/Home/types"

export type DetailedInfoAreaType = {
  currentCoin?: CoinsType
  price: number
}

export type DetailsType = {
  ChangePrice: string
  ChangePricePercent: string
  High: string
  Low: string
  VolValue: string
  Cs: string
  MaxSupply: string
}
