import { Box, Grid, Stack, useTheme } from '@mui/material'
import CardItem from '@/components/home/card-item'
import ScrollBar from 'react-perfect-scrollbar'
import { NamingTab } from '@/types/naming.type'
import { remConvert } from '@/utils/convert-to-rem'

export interface CardMultipleProps {
  dataList?: NamingTab[]
  cardActiveList?: NamingTab[]
  indexKr?: keyof NamingTab
  indexEn?: keyof NamingTab
  isAutoHeight?: boolean
  isHavAnalyzing?: boolean
  maxSelected?: number
  minSelected?: number
  isDisable?: boolean
  onAddCard?: (card: NamingTab) => void
  onRemoveCard?: (index: number) => void
  fetchNextPage?: () => void
  height?: number
  handleCarditem?: (card: NamingTab) => void
  overQuantity?: () => void
}

const CardMultiple = ({
  dataList,
  fetchNextPage,
  cardActiveList = [],
  indexKr,
  indexEn,
  isAutoHeight,
  maxSelected,
  onAddCard,
  onRemoveCard,
  handleCarditem,
  overQuantity,
  height = 353
}: CardMultipleProps) => {
  const {
    palette: { home }
  } = useTheme()

  const convertTitle = (item: NamingTab) => {
    if (indexKr && indexEn) {
      const title = (
        <Box component={'p'} display={'flex'} columnGap={remConvert('12px')} flexWrap={'wrap'}>
          {item[indexKr]}
          <Box component={'span'} style={{ display: 'inline-flex', color: home.blue500 }}>
            {item[indexEn]}
          </Box>
        </Box>
      )
      return {
        title: title,
        ...item
      }
    }

    return item
  }

  const handleAddCarditem = (card: NamingTab) => {
    if (handleCarditem) {
      return handleCarditem(card)
    }
    const index = cardActiveList?.findIndex(
      (item) => item.name === card[indexKr as keyof NamingTab] && item.affectTitle === card[indexEn as keyof NamingTab]
    )

    if (index > -1) {
      const indexRemove = cardActiveList.findIndex((item) => item.name === card[indexKr as keyof NamingTab])
      onRemoveCard && onRemoveCard(indexRemove)
    } else {
      if (maxSelected && cardActiveList?.length >= maxSelected) {
        overQuantity && overQuantity()
        return
      }

      const item = {
        name: card[indexKr as keyof NamingTab],
        affectTitle: card[indexEn as keyof NamingTab]
      } as NamingTab
      onAddCard && onAddCard(item)
    }
  }

  return (
    <ScrollBar
      style={{
        height: !height || isAutoHeight ? 'auto' : remConvert(`${height}px`),
        marginLeft: remConvert('-3px'),
        marginRight: remConvert('-3px')
      }}
      onYReachEnd={() => fetchNextPage && fetchNextPage()}
    >
      <Stack display={'flex'} justifyContent={'center'} padding={remConvert('3px')}>
        <Grid container display='flex' wrap='wrap' spacing={remConvert('12px')} alignItems='stretch'>
          {dataList?.map((item, index) => (
            <Grid item xs={3} md={3} key={index}>
              <CardItem
                cardItem={convertTitle(item)}
                icon='checked'
                isActive={cardActiveList?.map((item) => item.name).includes(item[indexKr as keyof NamingTab])}
                sxCard={{ backgroundColor: home.gray300 }}
                onClick={() => handleAddCarditem(item)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ScrollBar>
  )
}

export default CardMultiple
