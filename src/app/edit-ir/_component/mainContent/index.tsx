'use client'
import React from 'react'
import { Box } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import HeadMainContent from './component/headMainContent'
import BodyMainContent from './component/bodyMainContent'

export interface IMainContentProps {
  projectID: number
}

const MainContent = ({ projectID }: IMainContentProps) => {
  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        padding: remConvert('40px 85px'),
        flexDirection: 'column',
        alignItems: 'center',
        gap: remConvert('24px'),
        flex: '1 0 0'
      }}
    >
      <HeadMainContent />
      <BodyMainContent projectID={projectID} />
    </Box>
  )
}

export default MainContent
