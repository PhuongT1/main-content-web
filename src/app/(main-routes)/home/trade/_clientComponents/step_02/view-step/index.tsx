'use client'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import { SolidInput, Typography } from '@/elements'
import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import styles from './view.module.scss'
import { NamingCandidates } from '@/types/naming.type'
import { useFormContext } from 'react-hook-form'
import { EditButton } from '@/components/home/button'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilState } from 'recoil'
import { remConvert } from '@/utils/convert-to-rem'
import { STEP } from '@/constants/common.constant'
import InputItem from '@/form/input'
import { convertToRem } from '@/utils/convert-to-rem'
import { gray_dark_home } from '@/themes/system-palette'
import Image from 'next/image'
import CardProductType from '../card-product-type'
import { dataTrade } from '@/atoms/home/trade'
import { useQuery } from '@tanstack/react-query'
import { getClasifications } from '@/services/trade.service'
import { classificationFormat } from '../edit-step'
import { conceptData } from '@/constants/trade.constant'

const Step2View = () => {
  const {
    palette: { home }
  } = useTheme()
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const lgUp = useMediaQuery('(min-width: 1400px)')
  const [classificationSelected, setClassificationSelected] = useState<any[]>([])

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => {
      const removeStep = pre.filter((item) => item !== STEP.STEP_TWO)
      return removeStep
    })
  }
  const [{ tradeCopyBrand }, setDataTrade] = useRecoilState(dataTrade)

  const { data: tradeClassifications } = useQuery({
    queryKey: ['trade-classifications-view'],
    queryFn: async () => await getClasifications()
  })

  const concept = conceptData.find((i) => i.title === tradeCopyBrand?.data?.concept?.title)

  return (
    <Stack gap={7.5}>
      <Stack alignItems={'flex-start'}>
        <Box component={'div'} width={'100%'} className={[styles.layer_title, styles.border].join(' ')}>
          <Box component={'h2'} color={home.gray50}>
            사업 아이디어
          </Box>
        </Box>
        <Grid container gap={'20px'}>
          <Grid item flex={'300px 0 0'}>
            <SolidInput
              sx={{
                p: 2,
                backgroundColor: home.gray300,
                '.Mui-disabled': {
                  color: home.gray50 + ' !important',
                  '-webkit-text-fill-color': 'unset'
                },
                fieldset: {
                  borderColor: home.gray200 + ' !important'
                }
              }}
              value={tradeCopyBrand?.data?.title}
              label='타이틀'
              disabled
            />
          </Grid>
          <Grid item flex={'1 0 0'}>
            <SolidInput
              sx={{
                p: 2,
                backgroundColor: home.gray300,
                '.Mui-disabled': {
                  color: home.gray50 + ' !important',
                  '-webkit-text-fill-color': 'unset'
                },
                fieldset: {
                  borderColor: home.gray200 + ' !important'
                }
              }}
              value={tradeCopyBrand?.data?.idea}
              label='아이디어'
              name={'idea'}
              disabled
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack alignItems={'flex-start'}>
        <Box component={'div'} width={'100%'} className={[styles.layer_title].join(' ')}>
          <Box component={'h2'} color={home.gray50}>
            상표유형
          </Box>
        </Box>
        <Stack sx={{ width: 373, borderRadius: 1.25, bgcolor: home.gray300, p: 2.5, gap: 1.25 }}>
          <Typography cate='body_3_semibold' color={home.gray50}>
            {concept?.title}
          </Typography>
          <Box component={'div'} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box
              sx={{
                width: '160px',
                height: '106.67px',
                borderRadius: 2
              }}
            >
              <Image
                width={160}
                height={106.67}
                style={{ borderRadius: 8 }}
                src={concept?.content?.image || ''}
                alt={''}
              />
            </Box>
            <Box flex={1}>
              <Typography
                sx={{
                  color: home.gray100,
                  textAlign: ' left',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  display: '-webkit-box',
                  WebkitLineClamp: '6',
                  WebkitBoxOrient: 'vertical',
                  cursor: 'pointer'
                }}
                cate='mandatory_10'
              >
                {concept?.content?.description}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems={'flex-start'} sx={{ breakInside: 'avoid' }}>
        <Box component={'div'} width={'100%'} className={[styles.layer_title].join(' ')}>
          <Box component={'h2'} color={home.gray50}>
            상품분류
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: home.gray300,
            py: 2.5,
            px: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2.5,
            borderRadius: 1.25,
            width: '100%'
          }}
        >
          {classificationFormat({ item: tradeCopyBrand?.data?.productClassifications || [], home: home }).map(
            (item) => (
              <Box sx={{ flex: `${lgUp ? 'calc((100% - 20px) / 2)' : 1} 0 0` }} key={item.id}>
                <CardProductType sxCard={{ bgcolor: home.gray200 }} cardItem={item} />
              </Box>
            )
          )}
          {/* {tradeCopyBrand?.data?.productClassifications?.map((item) => (
            <Box sx={{ flex: `${lgUp ? 'calc((100% - 20px) / 2)' : 1} 0 0` }} key={item.idCard}>
              <CardProductType sxCard={{ bgcolor: home.gray200 }} cardItem={item} />
            </Box>
          ))} */}
        </Box>
      </Stack>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Stack>
  )
}

export default Step2View
