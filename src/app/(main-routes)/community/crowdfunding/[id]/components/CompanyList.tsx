import { type JSX } from 'react'
import { CompanyItem } from '@/app/(main-routes)/community/crowdfunding/[id]/components/CompanyItem'
import { Box, BoxProps } from '@mui/material'

interface CompanyListProps extends BoxProps {}

export function CompanyList(props: CompanyListProps): JSX.Element {
  return (
    <Box {...props}>
      <CompanyItem />
    </Box>
  )
}
