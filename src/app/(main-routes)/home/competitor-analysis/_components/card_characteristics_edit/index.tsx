import React from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { FIELD_SELECTED_COLORS } from '@/constants/competitor-analysis'
import { ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { optionTruncateOneLine } from '@/utils/styles'
import { CompetitorAnalyzingCard } from '@/components/cards/competitor-analyzing-card'
import { convertToRem } from '@/utils/convert-to-rem'
import styles from './style.module.scss'

interface ICardInputCheckbox {
  competitor: ICompetitiveCompaniesResponse
  isHighlight?: boolean
  item: string[]
  activeCard?: boolean
  subTitle?: string
}
const CardInputCheckbox = ({ competitor, isHighlight, item, activeCard, subTitle }: ICardInputCheckbox) => {
  const {
    palette: { home }
  } = useTheme()

  if (!competitor?.name) return
  return (
    <Box sx={activeCard ? { border: `2px solid ${home.blue500}`, borderRadius: convertToRem(10) } : {}}>
      <CompetitorAnalyzingCard
        subTitle={subTitle || '타깃고객'}
        item={competitor}
        sxCard={isHighlight ? { backgroundColor: home.alpha_blue_10 } : { backgroundColor: home.gray300 }}
      >
        {item?.map((name, index) => (
          <Box
            key={`${name}${index}`}
            className={styles.box_wrapper}
            sx={{ background: isHighlight ? FIELD_SELECTED_COLORS?.[index as 0 | 1 | 2] : home.gray200 }}
          >
            <Typography sx={{ ...optionTruncateOneLine() }}>{name}</Typography>
          </Box>
        ))}
      </CompetitorAnalyzingCard>
    </Box>
  )
}

export default CardInputCheckbox
