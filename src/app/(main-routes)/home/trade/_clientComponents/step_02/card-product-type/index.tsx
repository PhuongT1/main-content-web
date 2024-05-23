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
import { TooltipTitle } from '@/components/home/tooltip-item'
export interface CardElementProps {
  tag?: React.ReactNode
  content?: string
  id?: number
  classificationCode?: string
}
export interface CardListProps {
  cardItem: CardElementProps
  isActive?: boolean
  sxCard?: SxProps<Theme>
  sxContent?: SxProps<Theme>
  icon?: 'checked' | 'radio' | 'delete'
  onClick?: () => void
}

const CardProductType = ({ cardItem, isActive, onClick, sxCard, icon }: CardListProps) => {
  const { tag, id, content, classificationCode } = cardItem
  const {
    palette: { home }
  } = useTheme()

  const IconItem = () => {
    switch (icon) {
      case 'checked':
        return isActive ? <CheckFilledIcon /> : <CheckboxIcon pathProps={{ stroke: home.gray100 }} />
      case 'delete':
        return <DeleteIcon fill={home.gray300} stroke={home.gray0} />
    }
  }

  return (
    <Card
      className={[styles.card_item, isActive ? 'active' : ''].join(' ')}
      sx={{
        '&.active': {
          backgroundColor: home.alpha_blue_10,
          outline: `2px solid ${home.blue500}`
        },
        backgroundImage: 'none',
        backgroundColor: icon === 'checked' ? home.gray300 : home.gray400,
        ...sxCard,
        height: '100%',
        justifyContent: 'center'
      }}
      onClick={() => onClick && onClick()}
    >
      <CardActionArea disableRipple={!onClick}>
        <Box
          component={'div'}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 1.25, flexShrink: 0, alignItems: 'center' }}>
              <Typography cate='body_3_semibold' color={home.gray50} width={60} flexShrink={0}>
                {classificationCode}
              </Typography>
              <Box width={70} flexShrink={0}>
                {tag}
              </Box>
            </Box>
            <Box flexShrink={1} mr={2.5} height={34} display={'flex'} alignItems='center'>
              <TooltipTitle title={content || ''} sxBox={{ WebkitLineClamp: 2 }} />
            </Box>
          </Box>
          {onClick && (
            <Box
              component={'span'}
              className={[styles.card_icon, !icon ? styles.icon_checkbox : ''].join(' ')}
              sx={{ flexShrink: 0 }}
            >
              <IconItem />
            </Box>
          )}
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default CardProductType
