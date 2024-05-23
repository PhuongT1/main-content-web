'use client'
import Image from 'next/image'
import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import CardItem from '@/components/home/card-item'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { ChevronRightWithBgIcon } from '@/assets/icons'
import { ICompetitiveCharacteristicsResponse } from '@/types/competitor-analysis.type'
import { optionsTruncate } from '@/utils/styles'

type CardItemDataProps = {
  onClickCardItemData?: (item: ICompetitiveCharacteristicsResponse) => void
  selectedCompetitors?: ICompetitiveCharacteristicsResponse[]
  item: ICompetitiveCharacteristicsResponse
  onClickOpenModal?: (item: ICompetitiveCharacteristicsResponse) => void
}
const CardCharacteristicsItem = ({
  onClickCardItemData,
  item,
  selectedCompetitors,
  onClickOpenModal
}: CardItemDataProps) => {
  const { palette } = useTheme()

  const handleClickOpenModal = (e: any) => {
    e.stopPropagation()
    onClickOpenModal?.(item)
  }

  const cardData = {
    title: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: convertToRem(8),
          maxWidth: '84%'
        }}
      >
        <TooltipTitle sxBoxWrapper={{ display: 'flex' }} title={item?.name} />
        <Box component={'div'} display='flex' alignItems='center' onClick={handleClickOpenModal}>
          {/* <Typography
            fontWeight={600}
            whiteSpace={'nowrap'}
            color={palette.home.blue500}
            sx={{
              '@media only screen and (max-width: 1600px)': {
                display: 'none'
              }
            }}
          >
            자세히 보기{' '}
          </Typography> */}
          <ChevronRightWithBgIcon />
        </Box>
      </Box>
    ),
    subTitle: (
      <Box component={'span'} sx={{ ...optionsTruncate(3) }}>
        {item?.description}
      </Box>
    ),
    content: (
      <Box>
        {item?.imageUrl && (
          <Image
            alt='logo'
            width={0}
            height={0}
            sizes='auto'
            src={item?.imageUrl}
            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: convertToRem(8) }}
          />
        )}
      </Box>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      icon='checked'
      isActive={selectedCompetitors?.some((com) => com?.id === item?.id)}
      sxCard={{
        backgroundColor: palette.home.gray300,
        backgroundImage: 'none',
        '.MuiButtonBase-root': {
          backgroundColor: 'initial'
        }
      }}
      sxCardAction={{
        '> div > div:first-child': {
          alignItems: 'flex-start !important'
        }
      }}
      onClick={() => onClickCardItemData?.(item)}
    />
  )
}

export default CardCharacteristicsItem
