'use client'
import { ChevronRightSmIcon, ShareProjectIcon } from '@/assets/icons'
import Home from '@/assets/icons/home'
import { DELETE_ON_DOWNLOAD_PDF } from '@/constants/common.constant'
import { Gray700Chip, Typography } from '@/elements'
import { OutlinedIconButton } from '@/elements/v2/icon-button'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Avatar, Breadcrumbs, Stack, SxProps, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export interface IBreadcrumbItem {
  icon?: React.ReactNode
  title?: string
  label?: string
  url?: string
}
export interface IBreadcrumb {
  sxBox?: SxProps
  list: IBreadcrumbItem[]
  hasShare?: boolean
}

export default function Breadcrumb({ sxBox, list, hasShare = true }: IBreadcrumb) {
  const {
    palette: { home }
  } = useTheme()

  // list of breadcrumbs, turn into component in the future
  const pathBreadcrumbs = list.map((item, idx) => {
    if (idx === 0) {
      return (
        <Stack key={idx + 1} alignItems={'center'}>
          {item.icon || <Home stroke={home.gray50} />}
        </Stack>
      )
    }
    if (idx > 0) {
      return (
        <Stack key={idx + 1} alignItems={'flex-start'} direction={'row'} gap={1}>
          <Gray700Chip
            chipHeight={22}
            padding={false}
            label={
              <Typography cate='body_10' color={home.gray100}>
                {item.icon ? item.icon : null} {item.label ? item.label : '-'}
              </Typography>
            }
            sx={{
              padding: remConvert('5px 10px')
            }}
          />
          {item.url ? (
            <Link color='inherit' href={item.url}>
              <Typography
                cate='body_3'
                color={home.gray50}
                sx={{
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {item.title ? item.title : '-'}
              </Typography>
            </Link>
          ) : (
            <Typography cate='body_3' color={home.gray50}>
              {item.title ? item.title : '-'}
            </Typography>
          )}
        </Stack>
      )
    }
  })

  return (
    // Modified current breadscrumb to apply current design by Hudson
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      sx={{ ...sxBox }}
      className={DELETE_ON_DOWNLOAD_PDF}
    >
      <Breadcrumbs
        separator={
          <ChevronRightSmIcon
            pathProps={{
              stroke: home.gray50
            }}
          />
        }
        aria-label='breadcrumb'
        // sx={{
        //   [`& .${breadcrumbsClasses.ol}`]: {
        //     alignItems: 'flex-end'
        //   }
        // }}
      >
        {pathBreadcrumbs}
      </Breadcrumbs>
      {hasShare && (
        <Stack direction={'row'} gap={2.25}>
          <Stack
            direction={'row'}
            sx={{
              '& .MuiAvatar-root': {
                '&:not(:first-child)': {
                  marginLeft: convertToRem(-8)
                }
              }
            }}
          >
            <Avatar sx={{ height: 32, width: 32 }} />
            <Avatar sx={{ height: 32, width: 32 }} />
            <Avatar sx={{ height: 32, width: 32 }} />
          </Stack>
          <OutlinedIconButton
            btnSize='p8'
            sx={{
              borderColor: home.gray300,
              '&:hover': {
                backgroundColor: home.gray200
              }
            }}
            onClick={() => {
              console.log('share deck')
            }}
          >
            <ShareProjectIcon />
          </OutlinedIconButton>
        </Stack>
      )}
    </Stack>
  )
}
