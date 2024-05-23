import { step1, step4 } from '@/atoms/logo'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as _ from 'lodash'
import { Box } from '@mui/material'
import styles from '../layout_03.module.scss'
import Image from 'next/image'
import { Typography } from '@/elements'
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
const LogoWhiteVersion = () => {
  const data1: any = useRecoilValue(step1)
  const [data4, setDataStep4] = useRecoilState(step4)
  useEffect(() => {
    if (!_.isEmpty(data4.htmlSvg)) {
      const elements: any = document.getElementsByClassName(`path_${data4.htmlSvg.id}_${data4.color}`)
      elements[elements.length - 1].setAttribute('fill', 'white')
      elements[elements.length - 1].setAttribute('stroke', 'white')
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

  return (
    <Box sx={{ height: '100%', minHeight: '140px' }}>
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
          color='white'
        >
          {data1.ideaSection.title}
        </Typography>
      </Box>
    </Box>
  )
}

export default LogoWhiteVersion
