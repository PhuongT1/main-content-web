import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, SxProps, Theme, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { STEP } from '@/constants/common.constant'
import { VIRTUAL_TARGET_CUSTOMER } from '@/constants/customer-service.constant'
import { VirtualTargetCustomer } from '@/types/customer-service.type'
import { useCustomerData } from '../../_clientComponents/use-customer'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'

export type ColumnGrid = {
  label: string
  labelFullWidth?: boolean
  content?: string
  column?: number
  isTitlePersion?: boolean
}

export type PersonItemProps = {
  layoutOne?: boolean
  isHiddenImage?: boolean
  sxBox?: SxProps<Theme>
}

const PersonItem = ({ layoutOne, isHiddenImage, sxBox }: PersonItemProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)

  const { data } = useCustomerData<VirtualTargetCustomer>(STEP.STEP_ONE, VIRTUAL_TARGET_CUSTOMER, false)
  const customer = data?.data.customer

  const labelStyle = (title: string) => (
    <Typography cate='text_12_bold' sx={{ color: '#383B45' }}>
      {title}
    </Typography>
  )

  const contentStyle = (title?: string, isTitlePersion?: boolean) => (
    <Typography
      cate='text_12_bold'
      sx={{ fontWeight: isTitlePersion ? 700 : 400, color: isTitlePersion ? primaryColor : home.ir_neutral_500 }}
    >
      {title}
    </Typography>
  )

  const columnGrid = ({ column, label, content, labelFullWidth, isTitlePersion }: ColumnGrid) => {
    return (
      <Grid item xs={column ?? 6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: labelFullWidth ? 'column' : 'row',
            alignItems: labelFullWidth ? 'flex-start' : 'center',
            gap: remConvert('4px'),
            width: 1
          }}
        >
          {labelStyle(label)}
          {contentStyle(content, isTitlePersion)}
        </Box>
      </Grid>
    )
  }

  return (
    <Box
      component={'div'}
      sx={{
        background: 'rgba(60, 130, 249, 0.10)',
        padding: remConvert('24px 16px'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: remConvert('18px'),
        borderRadius: remConvert('4px'),
        flex: '1 0 0',
        ...sxBox
      }}
    >
      {!isHiddenImage && customer?.path && (
        <Box
          component={'div'}
          sx={{
            width: remConvert('80px'),
            height: remConvert('80px'),
            borderRadius: '50%',
            border: '2px solid #729AFE',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            alt='user'
            src={customer?.path}
            quality={100}
            width={72}
            height={72}
            style={{
              flexShrink: 0,
              borderRadius: '50%',
              objectFit: 'cover',
              overflow: 'hidden'
            }}
          />
        </Box>
      )}

      <Grid container alignItems={'center'} rowSpacing={remConvert('4px')}>
        {columnGrid({ label: '이름', content: customer?.name, isTitlePersion: true })}
        {columnGrid({ label: '나이', content: customer?.age, isTitlePersion: true })}
        {columnGrid({ label: '성별', content: customer?.gender })}
        {columnGrid({ label: '지역', content: customer?.region })}
        {layoutOne ? (
          <>
            {columnGrid({
              label: '소개',
              labelFullWidth: true,
              column: 12,
              content: data?.data.introductionCustomer.content?.kr
            })}
          </>
        ) : (
          <>
            {columnGrid({ label: '지역', content: '홍길동' })}
            {columnGrid({ label: '직업', content: customer?.job })}
            {columnGrid({ label: '소득', content: customer?.incomeLevel, column: 12 })}
            {columnGrid({ label: 'MBTI', content: customer?.mbti, column: 12 })}
          </>
        )}
      </Grid>
    </Box>
  )
}

export default PersonItem
