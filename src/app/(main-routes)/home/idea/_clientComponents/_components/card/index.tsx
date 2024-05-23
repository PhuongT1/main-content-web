import React from 'react'
import styles from './card.module.scss'
import { Box, useTheme } from '@mui/material'
import Radio from '@/elements/radio-button'
import { Typography } from '@/elements'

export type TValueCardSelect = string | number

type TCardSelectProps = {
  title: string
  subTitle: string
  value: string
  icon: React.ReactNode
  onClick: (value: string) => void
  active: boolean
}

function CardSelect({ title, subTitle, onClick, icon, value, active }: TCardSelectProps) {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      sx={{
        border: `2px solid ${home.gray300}`,
        backgroundColor: home.gray400
      }}
      onClick={() => onClick(value)}
      component={'div'}
      className={[styles.card, active ? styles.active : ''].join(' ')}
    >
      <Box component={'div'} className={styles.card_radio}>
        <Radio checked={active} />
      </Box>
      {icon}
      <Box textAlign={'center'}>
        <Typography
          cate='title_50'
          sx={{
            color: home.gray50,
            lineHeight: '150%'
          }}
        >
          {title}
        </Typography>
        <Typography
          cate='body_3'
          sx={{
            color: home.gray100
          }}
        >
          {subTitle}
        </Typography>
      </Box>
    </Box>
  )
}

export default CardSelect
