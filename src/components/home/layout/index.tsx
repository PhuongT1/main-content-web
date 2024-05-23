import Home from '@/assets/icons/home'
import MenuIcon from '@/assets/icons/team-building/menu'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Button, Divider, useTheme } from '@mui/material'
import React from 'react'
import StepItem, { StepProps } from '../step'
import styles from './layout.module.scss'

export type THomeLayoutProps = {
  title: string | React.ReactNode
  onClickHome?: VoidFunction
  onClickMenu?: VoidFunction
  breadcumbs: IBreadcrumbItem[]
  onClickPreviewButton?: () => void
} & StepProps

function HomePageLayout({
  title,
  onClickMenu,
  onClickHome,
  onClickPreviewButton,
  breadcumbs,
  ...stepProps
}: THomeLayoutProps) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box component={'div'}>
      <StepItem
        breadcrumb={{ list: breadcumbs }}
        pageHeader={{ title }}
        {...stepProps}
        onClickPreviewButton={onClickPreviewButton}
      />
    </Box>
  )
}

export default HomePageLayout
