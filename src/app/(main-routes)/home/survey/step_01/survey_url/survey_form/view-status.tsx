'use client'
import { Box, Stack, useTheme } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { EditButton, SubmitButton } from '@/components/home/button'

interface Props {
  title: string
  subTit: string
  icon: ReactNode
}

const ViewStatus: FC<Props> = ({ title, subTit, icon }) => {
  const {
    palette: { home }
  } = useTheme()

  const moveToLink = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{ flexGrow: 1, padding: remConvert('80px 20px') }}
      width={'100%'}
      gap={remConvert('56px')}
    >
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={remConvert('24px')}>
        <Box display={'flex'} justifyContent={'center'}>
          {icon}
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={remConvert('8px')} textAlign={'center'}>
          <Box fontSize={remConvert('24px')} fontWeight={700} color={home.gray50}>
            {title}
          </Box>
          <Box fontSize={remConvert('16px')} fontWeight={400} color={home.gray100}>
            {subTit}
          </Box>
        </Box>
      </Box>
      <Stack flexDirection={'row'} gap={remConvert('20px')}>
        <EditButton
          sx={{ flexGrow: 1, background: home.gray400, '.MuiButton-startIcon': { display: 'none' } }}
          title='슘페터 둘러보기'
          onClick={() => moveToLink(`${window.location.origin}/sign-up`)} //TODO
        />
        <SubmitButton
          sx={{ flexGrow: 1, '.MuiButton-startIcon': { display: 'none' } }}
          onClick={() => moveToLink(`${window.location.origin}/sign-up`)} //TODO
        >
          회원가입
        </SubmitButton>
      </Stack>
    </Box>
  )
}
export default ViewStatus
