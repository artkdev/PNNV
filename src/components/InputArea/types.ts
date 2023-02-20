import { CurrenciesType, CoinsType } from "../../pages/Home/types"

export type InputAreaPropsType = {
  coins?: CoinsType[]
  currencies?: CurrenciesType[]
  price: number
  setPrice: (price: number) => void
  setCurrentCoin: (coin?: CoinsType) => void
}
