import { Card, CardActionArea, SxProps, Theme, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './card.module.scss'
import React from 'react'
import CheckboxIcon from '@/assets/icons/checkbox'
import CheckFilledIcon from '@/assets/icons/check-filled'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import DeleteIcon from '@/assets/icons/delete'
import { convertToRem } from '@/utils/convert-to-rem'
import { TooltipTitle } from '../tooltip-item'
export interface CardElementProps {
  title?: React.ReactNode
}
export interface CardListProps {
  cardItem: CardElementProps
  isActive?: boolean
  sxCard?: SxProps<Theme>
  sxContent?: SxProps<Theme>
  icon?: 'checked' | 'radio' | 'delete'
  onClick?: () => void
  children?: React.ReactNode
  maxWidth?: number | string
  isHaveHover?: boolean
  nowrap?: boolean
}

const CardCheckBox = ({ cardItem, isActive, onClick, sxCard, icon, children }: CardListProps) => {
  const { title } = cardItem
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
    <Box sx={{ width: '100%' }}>
      <Card
        className={[styles.card_item, isActive ? 'active' : ''].join(' ')}
        sx={{
          '&.active': {
            backgroundColor: home.alpha_blue_10,
            outline: `2px solid ${home.blue500}`
          },
          backgroundColor: home.gray400,
          ...sxCard,
          height: '100%'
        }}
        onClick={() => onClick && onClick()}
      >
        <CardActionArea className={styles.card_action} disableRipple={!onClick}>
          <Box
            component={'div'}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: convertToRem(12) }}
          >
            <Box sx={{ display: 'flex', gap: convertToRem(12), alignItems: 'center', flex: '1 0 0' }}>
              {children}
              <TooltipTitle
                title={title}
                sxBox={{
                  fontSize: convertToRem(16),
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%'
                }}
              />
            </Box>
            <Box component={'div'} sx={{ color: home.gray50 }}>
              {onClick && (
                <Box component={'span'} className={[styles.card_icon, !icon ? styles.icon_checkbox : ''].join(' ')}>
                  <IconItem />
                </Box>
              )}
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default CardCheckBox
