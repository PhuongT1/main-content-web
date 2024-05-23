import React from 'react'
import { Chip } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { FIELD_SELECTED_COLORS } from '@/constants/competitor-analysis'

function TableItemChip({ text, index }: { text: string; index: number }) {
  return (
    <Chip
      label={text}
      sx={{
        background: FIELD_SELECTED_COLORS?.[index as 0 | 1 | 2],
        borderRadius: convertToRem(5),
        height: convertToRem(25)
      }}
    />
  )
}

export default TableItemChip
