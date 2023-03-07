import { candleStickAdaptor } from "./adaptor"
import { CandleType } from "./types"

export const parseCandleStickData = (candleArray = []) => {
  const transformedData = candleArray.reduce((accu: CandleType[], curr) => {
    const candle = candleStickAdaptor(curr)
    accu.push(candle)
    return accu
  }, [])
  return transformedData
}
