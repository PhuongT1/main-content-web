'use client'
import { Grid, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './step_01.module.scss'
import React, { FC } from 'react'
import InputItem from '@/form/input'
import { Slogan_Step1_Type } from '@/types/slogan.type'
import { useFormContext } from 'react-hook-form'

interface Props {
  isView?: boolean
}

const BusinessIdea: FC<Props> = ({ isView = false }) => {
  const {
    palette: { home }
  } = useTheme()
  const { control } = useFormContext<Slogan_Step1_Type>()
  return (
    <Box component={'div'} className={styles.part_area}>
      <Box component={'div'}>
        <Box component={'h2'}>사업 아이디어</Box>
        {!isView && <Typography className={`${styles.sub_title}`}>사업 아이디어를 간략하게 정리해보세요.</Typography>}
      </Box>
      <Grid container gap={'20px'}>
        <Grid item flex={'300px 0 0'}>
          <InputItem
            name='brandName'
            control={control}
            showErrorMessage
            label='브랜드명'
            maxLength={20}
            textFieldProps={{
              required: true,
              placeholder: '브랜드명 입력',
              InputProps: {
                readOnly: isView
              }
            }}
          />
        </Grid>
        <Grid item flex={'1 0 0'}>
          <InputItem
            control={control}
            label='아이디어'
            name={'idea'}
            maxLength={50}
            textFieldProps={{
              required: true,
              placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
              InputProps: {
                readOnly: isView
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default BusinessIdea
