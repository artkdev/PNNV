import { CoinsType } from "../../pages/Home/types"

export type DetailedInfoAreaType = {
  currentCoin?: CoinsType
  price: number
}

export type DetailsType = {
  ChangeRate: string
  ChangePrice: string
  High: string
  Low: string
  VolValue: string
  Cs: string
}
