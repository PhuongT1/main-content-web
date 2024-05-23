'use client'
import React from 'react'
import { IREditProvider } from './utils/provider'
import 'react-perfect-scrollbar/dist/css/styles.css'

const IRWrapper = ({ children, params }: { children: React.ReactNode; params: { id: number } }) => {
  return <IREditProvider>{children}</IREditProvider>
}

export default IRWrapper
