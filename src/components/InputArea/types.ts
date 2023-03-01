import { Dispatch, SetStateAction } from "react"
import { CurrenciesType, CoinsType } from "../../pages/Home/types"

export type InputAreaPropsType = {
  coins?: CoinsType[]
  currencies?: CurrenciesType[]
  price: number
  setPrice: Dispatch<SetStateAction<number>>
  setCurrentCoin: Dispatch<SetStateAction<CoinsType | undefined>>
}
