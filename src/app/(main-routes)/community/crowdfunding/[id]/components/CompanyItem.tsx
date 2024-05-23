import { type JSX } from 'react'
import { CompanyForm } from '@/app/(main-routes)/community/crowdfunding/[id]/components/CompanyForm'
import { Box, BoxProps } from '@mui/material'

interface CompanyItemProps extends BoxProps {}

export function CompanyItem(props: CompanyItemProps): JSX.Element {
  return (
    <Box
      {...props}
      p={2}
      bgcolor={'base_gray.800'}
      sx={{
        borderRadius: 4,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <CompanyForm />
    </Box>
  )
}
