import { Card, CardActionArea, SxProps, Theme, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './card.module.scss'
import React from 'react'
import CheckboxIcon from '@/assets/icons/checkbox'
import CheckFilledIcon from '@/assets/icons/check-filled'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import DeleteIcon from '@/assets/icons/delete'
import { SvgComponentProps } from '@/types/types.type'
import { CommonProps } from '@mui/material/OverridableComponent'
import { NoEncryption } from '@mui/icons-material'
export interface CardElementProps {
  title?: React.ReactNode
  subTitle?: React.ReactNode
  content?: React.ReactNode
  idCard?: number
}
export interface CardListProps extends CommonProps {
  cardItem: CardElementProps
  isActive?: boolean
  sxCard?: SxProps<Theme>
  sxContent?: SxProps<Theme>
  sxIcon?: SxProps<Theme>
  sxCardAction?: SxProps<Theme>
  icon?: 'checked' | 'radio' | 'delete'
  isHiddenIcon?: boolean
  sxTitle?: SxProps<Theme>
  onClick?: () => void
  checkedProps?: SvgComponentProps
}

const CardItem = ({
  cardItem,
  isActive,
  onClick,
  sxCard,
  sxContent,
  icon,
  sxIcon,
  sxCardAction,
  isHiddenIcon = false,
  sxTitle,
  checkedProps,
  className
}: CardListProps) => {
  const { title, subTitle, content } = cardItem
  const {
    palette: { home }
  } = useTheme()

  const IconItem = () => {
    switch (icon) {
      case 'radio':
        return isActive ? <RadioOutlineFilledIcon /> : <RadioOutlineIcon color={home.gray100} />
      case 'checked':
        return isActive ? <CheckFilledIcon {...checkedProps} /> : <CheckboxIcon pathProps={{ stroke: home.gray100 }} />
      case 'delete':
        return <DeleteIcon fill={home.gray60} stroke={home.alpha_white_12} />
    }
  }

  return (
    <Card
      className={[className, styles.card_item, isActive ? 'active' : ''].join(' ')}
      sx={{
        '&.active': {
          backgroundColor: home.opacity_blue_100,
          outline: `1px solid ${home.blue500}`
        },
        boxShadow: 'none',
        backgroundColor: home.gray400,
        backgroundImage: 'initial',
        ...sxCard,
        height: '100%'
      }}
      onClick={() => onClick && onClick()}
    >
      <CardActionArea
        sx={{
          ...sxCardAction
        }}
        className={styles.card_action}
        disableRipple={!onClick}
      >
        <Box component={'div'}>
          <Box
            component={'div'}
            sx={{ color: home.gray50, ...sxTitle }}
            className={[styles.card_title, styles.card_title_icon, !subTitle ? styles.no_subTitle : ''].join(' ')}
          >
            {title}
            {onClick && !isHiddenIcon && (
              <Box
                component={'span'}
                className={[styles.card_icon, !icon ? styles.icon_checkbox : ''].join(' ')}
                sx={sxIcon}
              >
                <IconItem />
              </Box>
            )}
          </Box>
          {subTitle && (
            <Box component={'div'} sx={{ color: home.gray100 }} className={styles.card_sub_title}>
              {subTitle}
            </Box>
          )}
        </Box>
        {content && (
          <Box component={'div'} sx={{ backgroundColor: home.gray300, ...sxContent }} className={styles.card_content}>
            {content}
          </Box>
        )}
      </CardActionArea>
    </Card>
  )
}

export default CardItem
