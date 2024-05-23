'use client'
import { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import { Box, SxProps, useTheme } from '@mui/material'
import { optionsTruncate } from '@/utils/styles'
import { convertToRem } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'
import CardItem from '@/components/home/card-item'

type CardItemDataProps<T> = {
  onClickCardItemData?: (item: T) => void
  selectedGoals?: T[]
  item: T
  isView?: boolean
  sxCard?: SxProps
  sxBoxTitle?: CSSProperties
  children?: ReactNode
  icon?: 'checked' | 'radio' | 'delete'
}
const CardMarketingGoalItem = <T extends { id?: string | number; name?: string; url?: string; description?: string }>({
  onClickCardItemData,
  item,
  selectedGoals,
  isView = false,
  sxCard,
  sxBoxTitle,
  children,
  icon = 'checked'
}: CardItemDataProps<T>) => {
  const { palette } = useTheme()
  const { getValueLanguage } = useLanguage()

  const cardData = {
    title: (
      <Box
        component={'span'}
        sx={{
          ...optionsTruncate(),
          fontWeight: 600,
          color: palette.home.gray50,
          paddingRight: isView ? convertToRem(16) : 0,
          ...sxBoxTitle
        }}
      >
        {(getValueLanguage(item, 'name') as string)?.replace(/\//g, ' / ')}
      </Box>
    ),
    subTitle: (
      <Box component={'span'} sx={{ ...optionsTruncate(3) }}>
        {getValueLanguage(item, 'description')}
      </Box>
    ),
    content: (
      <Box>
        {children
          ? children
          : item?.url && (
              <Image
                alt='logo'
                width={0}
                height={0}
                sizes='auto'
                src={item?.url}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: convertToRem(10) }}
              />
            )}
      </Box>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      icon={isView ? undefined : icon}
      isActive={selectedGoals?.some((goal) => goal?.id === item?.id || goal?.name === item?.name)}
      sxCard={{
        backgroundColor: palette.home.gray300,
        backgroundImage: 'none',
        width: '100%',
        '.MuiButtonBase-root': {
          backgroundColor: 'initial'
        },
        '&.active': {
          backgroundColor: palette.home.opacity_blue_100,
          outline: `1px solid ${palette.home.blue500}`
        },
        ...sxCard
      }}
      onClick={() => onClickCardItemData?.(item)}
    />
  )
}

export default CardMarketingGoalItem
