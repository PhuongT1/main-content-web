import { Box, useTheme } from '@mui/material'
import React from 'react'

import styles from './card.module.scss'
import { Typography } from '@/elements'
import CheckedIdeaIcon from '@/assets/icons/idea/checked'
import { useLanguage } from '@/hooks/use-language'

type CardProps = {
  icon: React.ReactNode
  title: string
  subTitle: string
  active: boolean
  onClick: VoidFunction
  completed: boolean
}

function Card({ icon, title, subTitle, active, onClick, completed = false }: CardProps) {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const renderButton = () => {
    if (completed) {
      return (
        <Box
          sx={{
            backgroundColor: home.blue500,
            color: '#fff',
            fontSize: '14px'
          }}
          className={styles.card_button}
        >
          <CheckedIdeaIcon />
          {dict.common_complete}
        </Box>
      )
    }

    if (active) {
      return (
        <Box
          sx={{
            backgroundColor: home.alpha_mint_10,
            color: home.gray0
          }}
          className={styles.card_button}
        >
          {dict.common_proceeding}
        </Box>
      )
    }
    return (
      <Box
        sx={{
          backgroundColor: home.gray300,
          color: home.gray100
        }}
        className={styles.card_button}
      >
        {dict.common_incomplete}
      </Box>
    )
  }
  return (
    <Box
      onClick={onClick}
      component={'div'}
      sx={{
        backgroundColor: completed ? home.opacity_blue_100 : active ? home.alpha_mint_10 : home.gray400,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: completed ? home.blue500 : active ? home.mint500 : 'transparent'
      }}
      className={styles.card}
    >
      <Box component={'div'} className={styles.card_content}>
        {icon}
        <Box component={'h2'} sx={{ color: home.gray50, display: 'flex', flexDirection: 'column' }}>
          <Typography cate='body_3_semibold' color={home.gray50}>
            {title}
          </Typography>
          <Typography cate='body_20' color={home.gray100}>
            {subTitle}
          </Typography>
        </Box>
      </Box>
      {renderButton()}
    </Box>
  )
}

export default Card
