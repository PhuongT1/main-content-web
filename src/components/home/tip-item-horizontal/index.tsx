import { Button, Grid, SxProps, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import styles from './tip.module.scss'

interface Props {
  content: React.ReactNode
  customSX?: SxProps
}

const TipItemHorizontal: FC<Props> = ({ content, customSX }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Grid
      container
      component={'div'}
      display={'flex'}
      flexDirection={'column'}
      className={styles.layer_item}
      sx={{ backgroundColor: home.alpha_mint_10, ...customSX }}
    >
      <Grid
        item
        component={'p'}
        className={styles.title}
        sx={{
          color: home.mint500
        }}
      >
        TIP
      </Grid>
      <Grid item className={styles.content} sx={{ color: home.gray50 }}>
        {content}
      </Grid>
    </Grid>
  )
}

export default TipItemHorizontal
