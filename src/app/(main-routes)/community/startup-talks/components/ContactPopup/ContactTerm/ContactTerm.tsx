import Checkbox from '@/elements/checkbox'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Button, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import TermPopup from './TermPopup'

const ContactTerm = ({ onChange, title, checked, content, required }: any) => {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleCheck = () => {
    onChange()
  }

  return (
    <Box>
      <Box alignItems={'center'} display={'flex'} justifyContent={'space-between'} mt={3}>
        <Box alignItems={'center'} display={'flex'}>
          <Checkbox checked={checked} onChange={handleCheck} sx={{ mr: convertToRem(12) }} />

          <Button
            onClick={() => {
              setIsOpen((prev) => !prev)
            }}
            sx={{ padding: 0 }}
          >
            <Typography
              cate='body_40'
              color={theme.palette.main.gray10}
              sx={{ textDecoration: 'underline', fontWeight: 700 }}
            >
              개인정보 제공
            </Typography>
          </Button>
          <Typography cate='body_40' color={theme.palette.main.gray10}>
            에 대한 동의
          </Typography>
        </Box>
      </Box>

      <TermPopup
        onClose={() => {
          setIsOpen(false)
        }}
        onSubmit={() => {
          if (!checked) {
            onChange()
          }
          setIsOpen(false)
        }}
        open={isOpen}
      />
      <Box />
    </Box>
  )
}

export default ContactTerm
