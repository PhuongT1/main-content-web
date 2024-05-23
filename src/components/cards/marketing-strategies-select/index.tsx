'use client'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Box, Typography, Divider, SxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionTruncateOneLine } from '@/utils/styles'
import CardItem from '@/components/home/card-item'
import { MarketingStrategyBox } from '@/components/cards/marketing-strategies-select-view'
import styles from './style.module.scss'

type MarketingStrategiesSelectProps = {
  children: ReactNode
  sxCard?: SxProps
  isActive?: boolean
  url?: string
  name?: string
  subTitle?: string
  prevDataList?: { title: string; data: string[] }[]
  isChildrenCustom?: boolean
}
export const MarketingStrategiesSelect = ({
  children,
  sxCard,
  isActive,
  url,
  name,
  subTitle,
  prevDataList = [],
  isChildrenCustom = true
}: MarketingStrategiesSelectProps) => {
  const cardData = {
    title: (
      <Box className={styles.title_box_wrapper}>
        {url ? <Image alt='logo' width={30} height={30} src={url} /> : <Box height={30} />}
        <Typography fontWeight={600} sx={{ ...optionTruncateOneLine(), flex: 1 }}>
          {name}
        </Typography>
      </Box>
    ),
    content: (
      <>
        {prevDataList?.map((prevData, index) => (
          <Box key={index}>
            <Divider sx={{ mb: convertToRem(12), bgcolor: 'main_grey.gray800' }} />
            <Box sx={{ mb: convertToRem(12) }} className={styles.content_box_wrapper}>
              <Typography fontWeight={600}>{prevData?.title}</Typography>
              {Array.from({ length: 3 }, (v, indexCol) =>
                prevData?.data?.[indexCol] ? (
                  <MarketingStrategyBox key={indexCol} index={indexCol} name={prevData?.data[indexCol]} />
                ) : (
                  <Box key={indexCol} height={44} />
                )
              )}
            </Box>
          </Box>
        ))}

        {isChildrenCustom ? (
          <>
            <Divider sx={{ mb: convertToRem(12), bgcolor: 'main_grey.gray800' }} />
            <Box className={styles.content_box_wrapper}>
              <Typography fontWeight={600}>{subTitle}</Typography>
              {children}
            </Box>
          </>
        ) : (
          children
        )}
      </>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      icon={undefined}
      sxCard={{
        '.MuiButtonBase-root': { padding: convertToRem(12), backgroundColor: 'initial' },
        '.MuiCardActionArea-focusHighlight': { opacity: '0 !important' },
        backgroundImage: 'none',
        ...sxCard
      }}
      sxContent={{ backgroundColor: 'initial !important' }}
      isActive={isActive}
    />
  )
}
