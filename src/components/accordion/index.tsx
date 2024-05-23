import { IconButton } from '@/elements'
import { convertToRem } from '@/utils/styles'
import { Stack, Box, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type TAccordion = {
  children: ReactNode
  open: boolean
  toggle: () => void
}

const Accordion = ({ children, open, toggle }: TAccordion) => {
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: open ? 'column' : 'row' }}>
      <Box sx={{ height: '100%', paddingY: convertToRem(16) }}>{children}</Box>
      <Stack
        direction='row'
        sx={{
          position: open ? 'static' : 'absolute',
          alignSelf: 'end',
          right: 0,
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(270deg, #1F1F29 0%, rgba(31, 31, 41, 0.00) 133.27%)',
            width: convertToRem(32),
            height: '100%'
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.main.gray80,
            height: '100%',
            paddingRight: convertToRem(16)
          }}
        >
          <IconButton
            onClick={toggle}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${theme.palette.main.gray50}`,
              width: convertToRem(24),
              height: convertToRem(24),
              padding: convertToRem(6),
              background: theme.palette.main.gray80,
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.5s ease'
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='12' height='13' viewBox='0 0 12 13' fill='none'>
              <path
                d='M3 4.52734L6 7.52734L9 4.52734'
                stroke='white'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </IconButton>
        </Box>
      </Stack>
    </Box>
  )
}

export default Accordion
