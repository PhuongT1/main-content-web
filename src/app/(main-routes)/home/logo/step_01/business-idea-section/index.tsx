'use client'

import { Box, Grid, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SectionTitle from '../../section-title'
import InputItem from '@/form/input'
import { useEffect, forwardRef, useImperativeHandle } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { step1 } from '@/atoms/logo'

const schema = yup.object().shape({
  title: yup.string().required('이름을 입력해주세요.'),
  idea: yup.string().required('이름을 입력해주세요.')
})

const BusinessIdeaSection = forwardRef(({ sendData }: any, ref) => {
  const {
    palette: { home }
  } = useTheme()

  const data = useRecoilValue(step1)

  const defaultValues: {
    title: string
    idea: string
  } = {
    title: data.ideaSection?.title || '',
    idea: data.ideaSection?.idea || ''
  }
  const { control, watch, getValues, reset, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  useEffect(() => {
    sendData('ideaSection', getValues())
  }, [watch('title'), watch('idea')])

  useImperativeHandle(ref, () => ({
    resetIdeaSection() {
      reset()
    }
  }))

  return (
    <Box sx={{ marginBottom: '60px' }}>
      <SectionTitle maintitle='사업 아이디어' subTitle='사업 아이디어를 간략하게 정리해보세요.' />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputItem
            name='title'
            label='타이틀'
            control={control}
            textFieldProps={{
              required: true,
              placeholder: '브랜드명 입력',
              inputProps: {
                maxLength: 20
              }
            }}
            sxLabel={{ color: home.gray50 }}
          />
        </Grid>
        <Grid item xs={8}>
          <InputItem
            name='idea'
            label='아이디어'
            control={control}
            textFieldProps={{
              required: true,
              placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
              inputProps: {
                maxLength: 50
              }
            }}
            sxLabel={{ color: home.gray50 }}
          />
        </Grid>
      </Grid>
    </Box>
  )
})

export default BusinessIdeaSection
