'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import { Box, Typography, Divider, SxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import CardItem from '@/components/home/card-item'
import { ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { optionTruncateOneLine } from '@/utils/styles'
import styles from './style.module.scss'

type CompetitorAnalyzingCardProps = {
  item: ICompetitiveCompaniesResponse
  subTitle?: string
  children: ReactNode
  sxCard?: SxProps
}
export const CompetitorAnalyzingCard = ({ item, subTitle, children, sxCard }: CompetitorAnalyzingCardProps) => {
  const cardData = {
    title: (
      <Box className={styles.title_box_wrapper}>
        {item?.companyImageUrl ? (
          <Image alt='logo' width={30} height={30} src={item.companyImageUrl as string} />
        ) : (
          <Box height={30} />
        )}
        <Typography fontWeight={600} sx={{ ...optionTruncateOneLine(), flex: 1 }}>
          {item?.name}
        </Typography>
      </Box>
    ),
    content: (
      <>
        <Divider sx={{ mb: convertToRem(12), bgcolor: 'main_grey.gray800' }} />
        <Box className={styles.content_box_wrapper}>
          <Typography fontWeight={600}>{subTitle}</Typography>
          {children}
        </Box>
      </>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      icon={undefined}
      sxCard={{
        backgroundImage: 'none',
        '.MuiButtonBase-root': {
          padding: convertToRem(12),
          backgroundColor: 'initial'
        },
        ...sxCard
      }}
      sxContent={{ backgroundColor: 'initial !important' }}
    />
  )
}
