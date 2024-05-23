import Box from '@mui/material/Box'
import React from 'react'
import styles from './view-strategy.module.scss'
import { Typography } from '@/elements'
import SvgIcon from '@/components/home/svg'
import ParentBox from '../connect-box/parent-box'
import { arrright } from '../connect-box'
import TextColor from '../text-color'
import { convertToRem } from '@/utils/styles'
import FactorBox from '../../../_clientComponents/factor-box'
import { useLanguage } from '@/hooks/use-language'
import { useTheme } from '@mui/material'

const dataOne = [
  {
    parent: arrright[0]
  },
  {
    parent: arrright[1]
  },
  {
    parent: arrright[2]
  }
]

const ViewStrategy = ({
  brandName,
  idea,
  arrOne,
  arrTwo,
  arrThree,
  opportunityArray,
  strengthArray,
  threatArray,
  weaknessArray
}: any) => {
  const { dict, lang, getValueLanguage } = useLanguage()
  const filterTitle = (arr: any) => arr?.map((x: any) => x?.nameKr)
  const {
    palette: { home }
  } = useTheme()

  const RenderChild = ({ arr }: any) => {
    return (
      <Box className={styles['list']} sx={{ background: home.gray300 }}>
        {arr?.map((x: any, index: number) => (
          <Box key={index} className={styles['item']} sx={{ background: home.gray200 }}>
            <Box px={'10px'} py={'5px'}>
              <TextColor textOne={x?.type[0]} textTwo={x?.type[1]} />
            </Box>
            <Typography cate='body_30' plainColor='home.gray50'>
              {x?.text}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box className={styles['wrapper-strategy']}>
      <Box className={styles['header-content']} sx={{ background: home.gray300 }}>
        <Box className={styles['tag']} sx={{ background: home.gray50 }}>
          <Typography cate='body_3_semibold' plainColor='home.gray500'>
            {brandName}
          </Typography>
        </Box>
        <Typography cate='subtitle_1_semibold' plainColor='home.gray50'>
          {idea}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <SvgIcon>
          <svg xmlns='http://www.w3.org/2000/svg' width='13' height='47' viewBox='0 0 13 47' fill='none'>
            <path d='M6.5 0L0.726498 10L12.2735 10L6.5 0ZM5.5 9L5.5 47L7.5 47L7.5 9L5.5 9Z' fill='#3C82F9' />
          </svg>
        </SvgIcon>
      </Box>
      <Box
        className={styles['wrapper-right']}
        sx={{ display: 'flex', gap: convertToRem(16), alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}
      >
        {dataOne.map((x: any, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: convertToRem(11)
            }}
          >
            <ParentBox
              width='auto'
              height='auto'
              key={x.parent.id}
              text={getValueLanguage(x.parent, 'text') as any}
              sub={getValueLanguage(x.parent, 'sub') as any}
              color={x.parent.color}
              sx={{ height: convertToRem(123), background: home.gray300 }}
            />
            <SvgIcon>
              <svg xmlns='http://www.w3.org/2000/svg' width='13' height='47' viewBox='0 0 13 47' fill='none'>
                <path d='M6.5 0L0.726498 10L12.2735 10L6.5 0ZM5.5 9L5.5 47L7.5 47L7.5 9L5.5 9Z' fill='#44BDBD' />
              </svg>
            </SvgIcon>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: convertToRem(16), alignItems: 'flex-start', width: '100%' }}>
        <RenderChild arr={arrOne} />
        <RenderChild arr={arrTwo} />
        <RenderChild arr={arrThree} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '80%',
          margin: 'auto'
        }}
      >
        <SvgIcon>
          <svg xmlns='http://www.w3.org/2000/svg' width='13' height='47' viewBox='0 0 13 47' fill='none'>
            <path d='M6.5 0L0.726498 10L12.2735 10L6.5 0ZM5.5 9L5.5 47L7.5 47L7.5 9L5.5 9Z' fill='#3C82F9' />
          </svg>
        </SvgIcon>
        <Box className={styles['container']}>
          <Box className={styles['vertical-line']}></Box>

          <Box className={styles['vertical-line']}></Box>

          <Box className={styles['vertical-line']}></Box>

          <Box className={styles['vertical-line']}></Box>
        </Box>
        <Box sx={{ display: 'flex', gap: convertToRem(20), marginTop: convertToRem(47), maxWidth: '120%' }}>
          <FactorBox
            title={dict.swot_strength}
            subTitle='Strength'
            type='Strength'
            sx={{
              width: convertToRem(287),
              borderRadius: convertToRem(10),
              background: home.gray300,
              border: 0
            }}
            data={filterTitle(strengthArray)}
          />
          <FactorBox
            title={dict.swot_weakness}
            subTitle='Weakness'
            type='Weakness'
            sx={{
              width: convertToRem(287),
              borderRadius: convertToRem(10),
              background: home.gray300,
              border: 0
            }}
            data={filterTitle(weaknessArray)}
          />
          <FactorBox
            title={dict.swot_opportunity}
            subTitle='Opportunity'
            type='Opportunity'
            sx={{
              width: convertToRem(287),
              borderRadius: convertToRem(10),
              background: home.gray300,
              border: 0
            }}
            data={filterTitle(opportunityArray)}
          />
          <FactorBox
            title={dict.swot_threat}
            subTitle='Threat'
            type='Threat'
            sx={{
              width: convertToRem(287),
              borderRadius: convertToRem(10),
              background: home.gray300,
              border: 0
            }}
            data={filterTitle(threatArray)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ViewStrategy
