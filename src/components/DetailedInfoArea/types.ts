import { CoinsType } from "../../pages/Home/types"

export type DetailedInfoAreaType = {
  currentCoin?: CoinsType
  price: number
}

export type DetailsType = {
  changeRate: string
  changePrice: string
  high: string
  low: string
  volValue: string
}
