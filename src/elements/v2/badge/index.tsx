'use client'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Chip, ChipProps } from '@mui/material'
import { ReactNode } from 'react'

enum BadgeState {
  HOT = 'hot',
  NEW = 'new',
  PREMIUM = 'premium',
  FREE = 'free'
}

type BadgeProps = {
  state: keyof typeof BadgeState
  label: ReactNode
} & ChipProps

const badgeColor = (state: string) => {
  const stt = BadgeState[state as keyof typeof BadgeState]
  switch (stt) {
    case BadgeState.HOT:
      return 'sub.red500'
    case BadgeState.NEW:
      return 'main.primary'
    case BadgeState.PREMIUM:
      return 'sub.orange700'
    case BadgeState.FREE:
      return 'sub.green500'
  }
}

const CardBadge = ({ label, state, ...rest }: BadgeProps) => {
  return (
    <Chip
      sx={{
        bgcolor: badgeColor(state),
        height: convertToRem(21),
        borderRadius: 1,
        '& .MuiChip-label': {
          padding: `${convertToRem(2)} ${convertToRem(6)}`
        }
      }}
      label={
        typeof label === 'string' ? (
          <Typography cate='sub_title_20' plainColor='main_grey.gray1000'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      {...rest}
    />
  )
}

export { CardBadge }
