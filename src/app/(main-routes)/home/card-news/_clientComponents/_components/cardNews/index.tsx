import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import { ICardData } from '@/types/cardnews/index.type'
import Card1 from '../card1'
import Card2 from '../card2'
import Card3 from '../card3'
import Card4 from '../card4'
import Card5 from '../card5'
import Card7 from '../card7'
import Card6 from '../card6'
import Card10 from '../card10'
import Card11 from '../card11'
import Card8 from '../card8'
import Card9 from '../card9'
import { memo } from 'react'

interface ICardNews {
  type: CARD_NEWS_TYPES
  data: ICardData[]
}

const CardNews: React.FC<ICardNews> = ({ type, data }) => {
  // return (
  //   <>
  //     1
  //     <Card1 data={data[0]} idx={0} />
  //     2 <Card2 data={data[1]} idx={1} />
  //     3<Card3 data={data[2]} idx={2} />
  //     4<Card4 data={data[3]} idx={3} />
  //     5 <Card5 data={data[4]} idx={4} />
  //     6<Card6 data={data[0]} idx={0} />
  //     7<Card7 data={data[1]} idx={1} />
  //     8<Card8 data={data[2]} idx={2} />
  //     9<Card9 data={data[3]} idx={3} />
  //     10
  //     <Card10 data={data[4]} idx={4} />
  //     11
  //     <Card11 data={data[4]} idx={4} />
  //   </>
  // )
  switch (type) {
    case CARD_NEWS_TYPES.BRAND_PROMOTION:
      return (
        <>
          <Card1 data={data[0]} idx={0} />
          <Card2 data={data[1]} idx={1} />
          <Card3 data={data[2]} idx={2} />
          <Card4 data={data[3]} idx={3} />
          <Card5 data={data[4]} idx={4} />
        </>
      )
    case CARD_NEWS_TYPES.PRODUCT_AND_SERVICE_INTRODUCTION:
      return (
        <>
          <Card7 data={data[0]} idx={0} />
          <Card2 data={data[1]} idx={1} />
          <Card4 data={data[2]} idx={2} />
          <Card6 data={data[3]} idx={3} />
          <Card5 data={data[4]} idx={4} />
        </>
      )
    case CARD_NEWS_TYPES.CUSTOMER_ENGAGEMENT_AND_INTERACTION:
      return (
        <>
          <Card7 data={data[0]} idx={0} />
          <Card10 data={data[1]} idx={1} />
          <Card3 data={data[2]} idx={2} />
          <Card5 data={data[3]} idx={3} />
          <Card11 data={data[4]} idx={4} />
        </>
      )
    case CARD_NEWS_TYPES.COOPORATE_UPDATE_NEWS:
      return (
        <>
          <Card1 data={data[0]} idx={0} />
          <Card11 data={data[1]} idx={1} />
          <Card4 data={data[2]} idx={2} />
          <Card3 data={data[3]} idx={3} />
          <Card5 data={data[4]} idx={4} />
        </>
      )

    case CARD_NEWS_TYPES.EVENT_AND_PROMOTIONS:
      return (
        <>
          <Card1 data={data[0]} idx={0} />
          <Card4 data={data[1]} idx={1} />
          <Card8 data={data[2]} idx={2} />
          <Card3 data={data[3]} idx={3} />
          <Card5 data={data[4]} idx={4} />
        </>
      )
    case CARD_NEWS_TYPES.SHARING_INFORMATION:
      return (
        <>
          <Card7 data={data[0]} idx={0} />
          <Card11 data={data[1]} idx={1} />
          <Card4 data={data[2]} idx={2} />
          <Card2 data={data[3]} idx={3} />
          <Card5 data={data[4]} idx={4} />
        </>
      )
    default:
      return (
        <>
          <Card7 data={data[0]} idx={0} />
          <Card9 data={data[1]} idx={1} />
          <Card11 data={data[2]} idx={2} />
          <Card8 data={data[3]} idx={3} />
          <Card5 data={data[4]} idx={4} />
        </>
      )
  }
}

export default memo(CardNews)
