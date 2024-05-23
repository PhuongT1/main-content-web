'use client'

import { type JSX } from 'react'
import { ChevronLeftIcon } from '@/assets/icons'
import { SecondaryButton, Typography } from '@/elements'
import { useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'

export function BackButton(): JSX.Element {
  const { palette } = useTheme()
  const router = useRouter()

  return (
    <SecondaryButton
      action={() => {
        router.back()
      }}
      btnSize='sm'
      sx={{
        borderRadius: '99px !important',
        width: 121,
        mt: 6,
        display: {
          md: 'flex',
          xs: 'none'
        }
      }}
    >
      <ChevronLeftIcon
        svgProps={{ width: 16, height: 16 }}
        pathProps={{
          stroke: palette.main_grey.gray200
        }}
      />
      <Typography plainColor='main_grey.gray200' cate='button_20'>
        이전으로
      </Typography>
    </SecondaryButton>
  )
}
