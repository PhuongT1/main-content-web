import { Card, CardActionArea, SxProps, Theme, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { Typography } from '@/elements'
import styles from './card.module.scss'
import React from 'react'
import CheckboxIcon from '@/assets/icons/checkbox'
import CheckFilledIcon from '@/assets/icons/check-filled'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import DeleteIcon from '@/assets/icons/delete'
import { gray_dark_home } from '@/themes/system-palette'
export interface CardElementProps {
  title?: React.ReactNode
  subTitle?: React.ReactNode
  content?: React.ReactNode
  idCard?: number
}
export interface CardListProps {
  cardItem: CardElementProps
  isActive?: boolean
  sxCard?: SxProps<Theme>
  sxContent?: SxProps<Theme>
  icon?: 'checked' | 'radio' | 'delete'
  onClick?: () => void
}

const CardItem = ({ cardItem, isActive, onClick, sxCard, sxContent, icon }: CardListProps) => {
  const { title, subTitle, content } = cardItem
  const {
    palette: { home }
  } = useTheme()

  const IconItem = () => {
    switch (icon) {
      case 'radio':
        return isActive ? <RadioOutlineFilledIcon /> : <RadioOutlineIcon color={home.gray100} />
      case 'checked':
        return isActive ? <CheckFilledIcon /> : <CheckboxIcon pathProps={{ stroke: home.gray100 }} />
      case 'delete':
        return <DeleteIcon fill={home.gray60} stroke={home.alpha_white_12} />
    }
  }

  return (
    <Box
      className={`${styles.card_item} ${isActive ? styles.active : ''}`}
      sx={{ ...sxCard }}
      onClick={() => onClick && onClick()}
    >
      <Box className={styles.card_action}>
        <Box
          component={'div'}
          sx={{ backgroundColor: isActive ? 'transparent' : gray_dark_home.gray300, p: 2.5, gap: 2.5 }}
          className={styles.card_content}
        >
          {content}
        </Box>
      </Box>
    </Box>
  )
}

export default CardItem
