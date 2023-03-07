import { candleStickAdaptor } from "./adaptor"
import { candleType } from "./types"

export const parseCandleStickData = (candleArray = []) => {
  const transformedData = candleArray.reduce((accu: candleType[], curr) => {
    const candle = candleStickAdaptor(curr)
    accu.push(candle)
    return accu
  }, [])
  return transformedData
}
