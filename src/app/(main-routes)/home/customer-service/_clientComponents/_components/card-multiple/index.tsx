import { Box, Grid, IconButton, Stack, SxProps, Theme, useTheme } from '@mui/material'
import CardItem, { CardElementProps } from '@/components/home/card-item'
import ScrollBar from 'react-perfect-scrollbar'
import { remConvert } from '@/utils/convert-to-rem'
import Image from 'next/image'
import { LiftStyle } from '@/types/customer-service.type'
import { DeleteIcon } from '@/assets/icons'
import { PaymentMethodData } from '../../step_03/edit/card-data-customer'

export interface CardMultipleProps {
  dataList?: LiftStyle[]
  cardActiveList?: LiftStyle[]
  isAutoHeight?: boolean
  maxSelected?: number
  minSelected?: number
  isTitle?: boolean
  isView?: boolean
  height?: number | 'auto'
  sxCard?: SxProps<Theme>
  isHiddenIconDelete?: boolean
  handleCarditem?: (card: LiftStyle) => void
  overQuantity?: () => void
  onAddCard?: (card: LiftStyle, index?: number) => void
  onRemoveCard?: (index: number) => void
  fetchNextPage?: () => void
}

const CardMultiple = ({
  dataList,
  cardActiveList,
  isAutoHeight,
  maxSelected,
  isTitle,
  height = 453,
  sxCard,
  isHiddenIconDelete,
  isView,
  onAddCard,
  onRemoveCard,
  overQuantity,
  fetchNextPage
}: CardMultipleProps) => {
  const { breakpoints } = useTheme()

  const {
    palette: { home }
  } = useTheme()

  const convertImage = (item: LiftStyle) => {
    if (isView) return <>{PaymentMethodData[Number(item.index)]?.url}</>
    if (item?.url && !isTitle)
      return (
        <Image
          alt='user'
          src={item?.url as string}
          quality={100}
          width={40}
          height={40}
          style={{
            flexShrink: 0,
            borderRadius: remConvert('10px'),
            objectFit: 'cover',
            overflow: 'hidden'
          }}
        />
      )
    return <>{item?.url}</>
  }

  const convertTitle = (item: LiftStyle, index: number) => {
    const title = (
      <Box display={'flex'} gap={remConvert('10px')} alignItems={'center'} flex={'1 0 0'}>
        {convertImage(item)}
        <Box flex={'1 0 0'} display={'flex'} flexDirection={'column'}>
          {item.name && <Box component={'span'}>{item.name}</Box>}
          {item.description && !isTitle && <Box component={'span'}>{item.description}</Box>}
        </Box>
        {!isHiddenIconDelete && (
          <IconButton
            onClick={() => onRemoveCard && onRemoveCard(index)}
            sx={{ padding: `${remConvert('8px')} !important` }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    )
    return {
      title
    } as CardElementProps
  }

  const compareItem = (card: LiftStyle) => {
    const { name, description } = card
    const dataListItem = cardActiveList || dataList
    const index = dataListItem?.findIndex(
      ({ name: nameActive, description: descriptionActive }) => nameActive === name && descriptionActive === description
    )
    return index
  }

  const handleAddCarditem = (card: LiftStyle, indexList: number) => {
    if (!cardActiveList) return
    const index = compareItem(card)
    if (Number(index) > -1) {
      onRemoveCard && onRemoveCard(Number(index))
    } else {
      if (maxSelected && cardActiveList?.length >= maxSelected) {
        overQuantity && overQuantity()
        return
      }
      onAddCard && onAddCard(card, indexList)
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
            <Grid
              item
              key={index}
              sx={{
                [breakpoints.up(1200)]: {
                  flex: '0 0 33.33%'
                },
                [breakpoints.up(1800)]: {
                  flex: '0 0 20%'
                }
              }}
            >
              <CardItem
                cardItem={convertTitle(item, index)}
                icon='checked'
                isActive={cardActiveList && Number(compareItem(item)) > -1 ? true : false}
                sxCard={{
                  backgroundColor: cardActiveList ? home.gray300 : home.gray400,
                  button: {
                    padding: remConvert('16px 20px')
                  },
                  ...sxCard
                }}
                onClick={cardActiveList ? () => handleAddCarditem(item, index) : undefined}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ScrollBar>
  )
}

export default CardMultiple
