'use client'

import React from 'react'
import { Box, Stack, useTheme } from '@mui/material'
import { Button, Divider, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import MenuIcon from '@/assets/icons/team-building/menu'
import HomeIcon from '@/assets/icons/team-building/home'

//css
import styles from '../teambuilding.module.scss'

type THeaderTopArea = {}

function HeaderArea() {
  const theme = useTheme()
  return (
    <Box mb={6} display='flex' justifyContent='space-between' alignItems='center'>
      <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
        <Typography cate='title_2_semibold'>팀빌딩</Typography>
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
        <Button
          fitContent
          sx={{
            padding: '10px 18px',
            borderRadius: convertToRem(8),
            backgroundColor: '#191A1C',
            color: theme.palette.common.white,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          }}
          size='small'
          startIcon={<HomeIcon />}
        >
          프로젝트 Home
        </Button>
        <Button
          fitContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 12px',
            justifyContent: 'center',
            borderRadius: convertToRem(8),
            backgroundColor: '#191A1C',
            color: theme.palette.common.white,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          }}
          className={styles.btn_menu}
          size='small'
          startIcon={<MenuIcon />}
        >
          리스트
        </Button>
      </Box>
    </Box>
  )
}

export default HeaderArea
