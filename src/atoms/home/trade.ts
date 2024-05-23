import { TradeDeck } from '@/types/trade.type'
import { atom } from 'recoil'

// const dataTradeKeyWord = atom({
//   key: 'dataTradeKeyword',
//   default: {} as StepActivity<Tradekeyword>
// })

// const dataTradeCandidates = atom({
//   key: 'dataTradeCandidates',
//   default: {} as StepActivity<TradeCandidates>
// })

// const dataTradeAnalyzing = atom({
//   key: 'dataTradeAnalyzing',
//   default: {} as StepActivity<TradeAnalyzing>
// })

const dataTrade = atom({
  key: 'dataTrade',
  default: {} as TradeDeck
})

export { dataTrade }
