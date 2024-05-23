import { Typography } from '@/elements'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import styles from './step_04_result.module.scss'
import { DataStep1 } from '@/types/logo.type'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { step1, step3, step4 } from '@/atoms/logo'
import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import DownloadIcon from '@/assets/icons/download'
import * as htmlToImage from 'html-to-image'
import { convertToRem } from '@/utils/convert-to-rem'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import CardOption from '../../card-option'
import SectionTitle from '../../section-title'
import Image from 'next/image'
import useToggle from '@/hooks/use-toggle'
import { DeleteDeck } from '@/components/dialog/delete-deck'

const fontWeights = {
  thin: '100',
  heavy: '900',
  black: '900',
  extraBold: '800',
  medium: '500',
  extraLight: '200',
  bold: '700',
  regular: '400',
  light: '300'
}

const Step04Result = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const data1: DataStep1 = useRecoilValue(step1)
  const [data4, setDataStep4] = useRecoilState(step4)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!_.isEmpty(data4.htmlSvg)) {
      const elements: any = document.getElementsByClassName(`path_${data4.htmlSvg.id}_${data4.color}`)
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i]
        element.setAttribute('fill', data4.color || 'black')
        element.setAttribute('stroke', data4.color || 'black')
      }
    }
  }, [data4])

  const getFontWeight = (weight: string) => {
    switch (weight) {
      case 'Thin':
        return fontWeights.thin
      case 'Medium':
        return fontWeights.medium
      case 'Black':
        return fontWeights.black
      case 'ExtraLight':
        return fontWeights.extraLight
      case 'Bold':
        return fontWeights.bold
      case 'ExtraBold':
        return fontWeights.extraBold
      case 'Light':
        return fontWeights.light
      case 'Regular':
        return fontWeights.regular
      case 'Heavy':
        return fontWeights.heavy
      default:
        return ''
    }
  }
  const onDownloadLogoDesigned = (index: number) => {
    const element: any = document.getElementById(`logoDesigned${index}`)
    htmlToImage.toJpeg(element, { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement('a')
      link.download = 'logo.jpeg'
      link.href = dataUrl
      link.click()
    })
  }
  const [, setExpandStep] = useRecoilState(expandStepSelector)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_FOUR))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_FOUR))
    setActiveStep(STEP.STEP_FOUR)
  }

  return (
    <Box
      pt={convertToRem(60)}
      mt={convertToRem(60)}
      pb={convertToRem(40)}
      sx={{ borderTop: `1px solid ${home.gray200}` }}
    >
      <Box sx={{ marginBottom: '20px' }}>
        <SectionTitle maintitle='최종 로고 선택' subTitle='' />
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          padding: '20px 24px',
          borderRadius: '10px',
          backgroundColor: home.gray300
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CardOption
              backgroundColorDefault={
                data4.backgrounds === 1 || data4.backgrounds === 3
                  ? 'white'
                  : data4.backgrounds === 2 || data4.backgrounds === 4
                  ? 'black'
                  : 'white'
              }
              backgroundColorActive='white'
              active={false}
            >
              <Box sx={{ position: 'relative', height: '100%', minHeight: '140px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: '8px',
                    position: 'absolute',
                    top: '8px',
                    right: '8px'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#EDEEF1',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      cursor: 'pointer'
                    }}
                    onClick={() => onDownloadLogoDesigned(0)}
                  >
                    <DownloadIcon svgProps={{ width: 16, height: 16 }} pathProps={{ stroke: '#000000' }} />
                  </Box>
                </Box>
                <Box id={`logoDesigned0`} className={`${styles[data4.layout]} ${styles.symbolLayout}`}>
                  {!_.isEmpty(data4.symbol) && <Image src={data4.symbol.url} width={50} height={50} alt='' />}
                  {!_.isEmpty(data4.htmlSvg) && (
                    <div
                      className={styles.htmlSvg}
                      dangerouslySetInnerHTML={{
                        __html: data4.htmlSvg.htmlSvg
                      }}
                    />
                  )}
                  <Typography
                    sx={{ fontFamily: data4.font?.id, fontWeight: getFontWeight(data4.font?.weightActive) }}
                    component={'span'}
                    cate='sub_title_30'
                    color={data4.font?.fontColor || 'black'}
                  >
                    {data1.ideaSection.title}
                  </Typography>
                </Box>
              </Box>
            </CardOption>
          </Grid>
        </Grid>
      </Box>
      <Stack sx={{ marginTop: '60px' }} flexDirection={'row'} justifyContent={'center'} className={styles.btn_edit}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step04Result
