import { Box, Grid, Stack, useTheme } from '@mui/material'
import CardItem from '@/components/home/card-item'
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import ScrollBar from 'react-perfect-scrollbar'
import { FieldArrayitem, NamingAnalyzing, NamingTab } from '@/types/naming.type'
import { remConvert } from '@/utils/convert-to-rem'

export interface CardMultipleProps {
  dataList?: NamingTab[]
  fieldArrayCard?: UseFieldArrayReturn<NamingAnalyzing, 'cardActiveList'>
  cardActiveList?: NamingTab[]
  indexKr?: keyof NamingTab
  indexEn?: keyof NamingTab
  isAutoHeight?: boolean
  isHavAnalyzing?: boolean
  maxSelected?: number
  minSelected?: number
  isDisable?: boolean
  onAddCard?: (card: NamingTab) => void
  fetchNextPage?: () => void
  setActiveCardList?: React.Dispatch<React.SetStateAction<NamingTab[]>>
}

const CardMultiple = ({
  dataList,
  fetchNextPage,
  cardActiveList,
  setActiveCardList,
  indexKr,
  indexEn,
  isAutoHeight,
  maxSelected,
  minSelected,
  fieldArrayCard,
  isDisable,
  onAddCard
}: CardMultipleProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { setValue, getValues } = useFormContext<FieldArrayitem>()

  const convertTitle = (item: NamingTab) => {
    if (indexKr && indexEn) {
      const title = (
        <Box component={'p'} display={'flex'} columnGap={remConvert('12px')} flexWrap={'wrap'}>
          {item[indexKr]}
          <Box component={'span'} style={{ display: 'inline-flex', color: '#3C82F9' }}>
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
    if (isDisable) return

    const selectedItem = getValues('selectedItem') || []

    const max = maxSelected ?? 10
    const min = minSelected ?? 2

    const index = selectedItem?.findIndex((item) => item.name === card[indexKr as keyof NamingTab])

    if (index > -1) {
      if (Number(cardActiveList?.length) <= min && Number(cardActiveList?.length) > 0) return
      const newCard = cardActiveList?.filter(
        (item) => item[indexKr as keyof NamingTab] !== card[indexKr as keyof NamingTab]
      )

      const itemFilter = selectedItem?.filter((item) => item.name !== card[indexKr as keyof NamingTab])
      newCard && setActiveCardList && setActiveCardList(newCard)
      setValue('selectedItem', itemFilter)

      const indexRemove = cardActiveList?.findIndex(
        (item) => item[indexKr as keyof NamingTab] === card[indexKr as keyof NamingTab]
      )
      fieldArrayCard && fieldArrayCard.remove(indexRemove)
    } else {
      if (Number(cardActiveList?.length) >= max) return

      const item = {
        name: card[indexKr as keyof NamingTab],
        affectTitle: card[indexEn as keyof NamingTab]
      } as NamingTab

      fieldArrayCard && fieldArrayCard.append({ ...card, point: [] })
      setActiveCardList && setActiveCardList((pre) => [...pre, { ...card }])
      setValue('selectedItem', [...selectedItem, item])
      onAddCard && onAddCard(card)
    }
  }

  return (
    <ScrollBar
      style={{ width: '100%', height: isAutoHeight ? 'auto' : 200 }}
      onYReachEnd={() => fetchNextPage && fetchNextPage()}
    >
      <Stack display={'flex'} justifyContent={'center'} padding={'3px'}>
        <Grid container display='flex' wrap='wrap' spacing={2} alignItems='stretch'>
          {dataList?.map((item, index) => (
            <Grid item xs={3} md={3} key={index} alignItems='stretch'>
              <CardItem
                cardItem={convertTitle(item)}
                icon='checked'
                isActive={cardActiveList
                  ?.map((item) => item[indexKr as keyof NamingTab])
                  .includes(item[indexKr as keyof NamingTab])}
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
