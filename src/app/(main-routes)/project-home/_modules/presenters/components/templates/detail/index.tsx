import React from 'react'
import { Box } from '@mui/material'
import { RequireChildren } from '@/types/types.type'

type TDetailTemplate = RequireChildren & {}

export function DetailTemplate({ children }: TDetailTemplate) {
  return <Box>{children}</Box>
}

export default DetailTemplate
