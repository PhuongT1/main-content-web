import { convertToRem } from '@/utils/convert-to-rem'
import { Chip, ChipProps, useTheme } from '@mui/material'
import React from 'react'

type TChipIdeaProps = {
  isSelected?: boolean
  chipColor?: string
  isDashed?: boolean
} & ChipProps

function ChipIdea({ isSelected, isDashed = true, chipColor, ...rest }: TChipIdeaProps) {
  const {
    palette: { home, sub }
  } = useTheme()

  const currentColor = chipColor ?? home.gray100
  return (
    <Chip
      sx={{
        borderColor: isSelected ? currentColor : home.gray100,
        maxWidth: convertToRem(160),
        textDecoration: isSelected && isDashed ? 'line-through' : 'none',
        textDecorationColor: isSelected ? currentColor : 'transparent',
        minWidth: convertToRem(44),
        padding: '6px 12px',
        color: isSelected ? currentColor : home.gray100,
        '& .MuiChip-label': {
          paddingLeft: 0,
          paddingRight: 0,
          fontSize: convertToRem(14),
          lineHeight: '150%',
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textTransform: 'capitalize'
        }
      }}
      variant='outlined'
      {...rest}
    />
  )
}

export default ChipIdea
