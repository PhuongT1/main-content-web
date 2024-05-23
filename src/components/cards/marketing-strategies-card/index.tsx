'use client'
import { Box, Typography, Chip, useTheme } from '@mui/material'
import { optionsTruncate, optionTruncateOneLine } from '@/utils/styles'
import { convertToRem } from '@/utils/convert-to-rem'
import CardItem from '@/components/home/card-item'
import styles from './../competitor-card/style.module.scss'

type CardItemDataProps = {
  onClickCardItemData?: () => void
  name?: string
  description?: string
  tags?: string[]
  isActive?: boolean
}
const CardMarketingItem = ({ onClickCardItemData, name, description, tags = [], isActive }: CardItemDataProps) => {
  const { palette } = useTheme()

  const cardData = {
    title: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: convertToRem(8), maxWidth: '84%' }}>
        <Typography fontWeight={600} color={palette.home.gray50} sx={{ ...optionTruncateOneLine(), flex: 1 }}>
          {name}
        </Typography>
      </Box>
    ),
    subTitle: (
      <>
        <Box component={'span'} sx={{ ...optionsTruncate(3) }}>
          {description}
        </Box>
        {tags?.length > 0 && (
          <Box mt={convertToRem(10)} className={styles.chip_wrapper}>
            {tags.map((tag: string, index: number) => (
              <Chip key={`${tag}_${index}`} label={tag} className={styles.chip} />
            ))}
          </Box>
        )}
      </>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      icon='checked'
      isActive={isActive}
      sxCard={{
        backgroundColor: palette.home.gray300,
        backgroundImage: 'none',
        '.MuiButtonBase-root': {
          backgroundColor: 'initial'
        }
      }}
      onClick={onClickCardItemData}
    />
  )
}

export default CardMarketingItem
