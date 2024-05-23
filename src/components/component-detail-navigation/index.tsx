'use client'
import { ChevronLeftIcon } from '@/assets/icons'
import { Divider, SecondaryButton, Typography } from '@/elements'
import { useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import PageTitle from '../page-title'

type ComponentDetailNavigationProps = {
  customBack?: () => void
  children: ReactNode
}

const ComponentDetailNavigation = ({ customBack, children }: ComponentDetailNavigationProps) => {
  const router = useRouter()
  const theme = useTheme()
  const onBack = () => {
    customBack ? customBack() : router.back()
  }
  return (
    <>
      <PageTitle>{children}</PageTitle>
      <SecondaryButton
        action={onBack}
        btnSize='sm'
        sx={{
          borderRadius: '99px !important',
          width: 121,
          mt: 6,
          display: {
            md: 'flex',
            xs: 'none'
          }
        }}
      >
        <ChevronLeftIcon
          svgProps={{ width: 16, height: 16 }}
          pathProps={{
            stroke: theme.palette.main_grey.gray200
          }}
        />
        <Typography plainColor='main_grey.gray200' cate='button_20'>
          이전으로
        </Typography>
      </SecondaryButton>
      <Divider
        sx={{
          my: 6,
          borderColor: 'main_grey.gray700',
          display: {
            md: 'block',
            xs: 'none'
          }
        }}
      />
    </>
  )
}

export default ComponentDetailNavigation
