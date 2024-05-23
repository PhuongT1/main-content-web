import { Typography } from '@/elements'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import CardOption from '../../card-option'
import styles from './step_03_result.module.scss'
import { DataStep1 } from '@/types/logo.type'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { step1, step3, step4 } from '@/atoms/logo'
import * as _ from 'lodash'
import { useEffect } from 'react'
import DownloadIcon from '@/assets/icons/download'
import * as htmlToImage from 'html-to-image'
import SectionTitle from '../../section-title'
import { convertToRem } from '@/utils/convert-to-rem'
import { EditButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
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

const Step03Result = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const data1: DataStep1 = useRecoilValue(step1)
  const [data3, setDataStep3] = useRecoilState(step3)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)

  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (data3.length) {
      for (const logo of data3) {
        if (!_.isEmpty(logo.htmlSvg)) {
          const elements: any = document.getElementsByClassName(`path_${logo.htmlSvg.id}_${logo.color}`)
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i]
            element.setAttribute('fill', logo.color || 'black')
            element.setAttribute('stroke', logo.color || 'black')
          }
        }
      }
    }
  }, [data3])

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
  const [, setDataStep4]: any = useRecoilState(step4)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setDataStep4({})
    setActiveStep(STEP.STEP_THREE)
  }

  return (
    <Box
      pt={convertToRem(60)}
      mt={convertToRem(60)}
      pb={convertToRem(40)}
      sx={{ borderTop: `1px solid ${home.gray200}` }}
    >
      <Box sx={{ marginBottom: '20px' }}>
        <SectionTitle maintitle='로고 디자인' subTitle='' />
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
          {data3.map((logo: any, index: number) => {
            return (
              <Grid key={index} item xs={3}>
                <CardOption
                  backgroundColorDefault={
                    logo.backgrounds === 1 || logo.backgrounds === 3
                      ? 'white'
                      : logo.backgrounds === 2 || logo.backgrounds === 4
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
                        onClick={() => onDownloadLogoDesigned(index)}
                      >
                        <DownloadIcon svgProps={{ width: 16, height: 16 }} pathProps={{ stroke: '#000000' }} />
                      </Box>
                    </Box>
                    <Box id={`logoDesigned${index}`} className={`${styles[logo.layout]} ${styles.symbolLayout}`}>
                      {!_.isEmpty(logo.symbol) && <Image src={logo.symbol.url} width={50} height={50} alt='' />}
                      {!_.isEmpty(logo.htmlSvg) && (
                        <div
                          className={styles.htmlSvg}
                          dangerouslySetInnerHTML={{
                            __html: logo.htmlSvg.htmlSvg
                          }}
                        />
                      )}
                      <Typography
                        sx={{ fontFamily: logo.font?.id, fontWeight: getFontWeight(logo.font?.weightActive) }}
                        component={'span'}
                        cate='sub_title_30'
                        color={logo.font?.fontColor || 'black'}
                      >
                        {data1.ideaSection.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardOption>
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <Stack sx={{ marginTop: '60px' }} flexDirection={'row'} justifyContent={'center'} className={styles.btn_edit}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step03Result
