'use client'
import React from 'react'
import { Stack } from '@mui/material'
import MainHeader from '@/components/header'
import IRDrawer from '../_component/ir-drawer'
import 'react-perfect-scrollbar/dist/css/styles.css'

const IRWrapper = ({ children, params }: { children: React.ReactNode; params: { id: number } }) => {
  return (
    <Stack>
      <MainHeader />

      <IRDrawer />

      {children}
    </Stack>
  )
}

export default IRWrapper
