'use client'
import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import styles from './step_01.module.scss'
import { SloganConceptType, Slogan_Step1_Type } from '@/types/slogan.type'
import CardItem from '@/components/home/card-item'
import { remConvert } from '@/utils/convert-to-rem'
import DividerItem from '../_component/divider-item'

interface Props {
  isView?: boolean
  sloganConcept: SloganConceptType[] | undefined
}

const SloganConcept: FC<Props> = ({ sloganConcept, isView = false }) => {
  const {
    palette: { home }
  } = useTheme()

  const { watch, setValue } = useFormContext<Slogan_Step1_Type>()

  return (
    <Stack sx={{ breakInside: 'avoid' }} gap={remConvert('60px')}>
      <DividerItem isView={isView} />
      <Box component={'div'} className={styles.part_area}>
        <Box component={'div'}>
          <Box component={'h2'}>슬로건 컨셉</Box>
          {!isView && (
            <Typography className={styles.sub_title}>
              핵심 메시지 및 일관된 브랜드 이미지를 전달하기 위해 슬로건의 컨셉을 설정해보세요.
            </Typography>
          )}
        </Box>
        <Grid container className={styles.layer_card_item} display='flex' spacing={2} alignItems='stretch'>
          {sloganConcept?.map((item) => {
            if (isView) {
              return (
                watch('conceptID') === item.id && (
                  <Grid item xs={4} md={4} key={item.id} className={`${styles.grid_item}`} alignItems='stretch'>
                    <CardItem
                      icon='radio'
                      sxCard={{ height: '100%', background: !isView ? home.gray400 : home.gray300 }}
                      isActive={watch('conceptID') === item.id && !isView}
                      onClick={isView ? undefined : () => setValue('conceptID', item.id)}
                      sxContent={{ backgroundColor: 'transparent !important', color: home.gray100 }}
                      cardItem={{
                        title: item.nameKr,
                        subTitle: (
                          <div
                            className={styles.body_concept}
                            style={{ backgroundImage: `url('${item.imageUrl}')`, color: home.gray0 }}
                            dangerouslySetInnerHTML={{
                              __html: item.altTextKr
                            }}
                          />
                        ),
                        content: item.description
                      }}
                    />
                  </Grid>
                )
              )
            } else
              return (
                <Grid item xs={4} md={4} key={item.id} className={`${styles.grid_item}`} alignItems='stretch'>
                  <CardItem
                    icon='radio'
                    sxCard={{ height: '100%' }}
                    isActive={watch('conceptID') === item.id && !isView}
                    onClick={isView ? undefined : () => setValue('conceptID', item.id)}
                    cardItem={{
                      title: item.nameKr,
                      subTitle: item.description,
                      content: (
                        <div
                          className={styles.body_concept}
                          style={{ backgroundImage: `url('${item.imageUrl}')` }}
                          dangerouslySetInnerHTML={{
                            __html: item.altTextKr
                          }}
                        />
                      )
                    }}
                  />
                </Grid>
              )
          })}
        </Grid>
      </Box>
    </Stack>
  )
}
export default SloganConcept
