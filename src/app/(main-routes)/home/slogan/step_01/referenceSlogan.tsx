'use client'
import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import CardItem from '@/components/home/card-item'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import {
  GetReferenceSloganType,
  MAX_ITEM_REFERENCE_SLOGAN,
  SloganConceptType,
  Slogan_Step1_Type
} from '@/types/slogan.type'
import { CreateButton, MoreButton } from '@/components/home/button'
import { useMutation } from '@tanstack/react-query'
import styles from './step_01.module.scss'
import Alert from '@/elements/alert'
import CardSelectedBox from '../_component/card-selected'
import { getSloganGPT } from '@/services/slogan.service'
import LoadingAI from '@/elements/loadingAI'
import ScrollBar from 'react-perfect-scrollbar'
import { remConvert } from '@/utils/convert-to-rem'
import DividerItem from '../_component/divider-item'

interface Props {
  formArray: UseFieldArrayReturn<Slogan_Step1_Type, 'referenceSlogan', 'id'>
  formAI: UseFieldArrayReturn<Slogan_Step1_Type, 'referenceSloganAI', 'id'>
  sloganConcept: SloganConceptType[] | undefined
  isView?: boolean
}

const ReferenceSlogan: FC<Props> = ({
  formArray: { fields, append, remove },
  formAI: { fields: fieldsAI, append: appendAI },
  sloganConcept,
  isView = false
}) => {
  const {
    palette: { home }
  } = useTheme()

  const { trigger, getValues, watch } = useFormContext<Slogan_Step1_Type>()
  const [isErrorMax, setErrorMax] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (form: GetReferenceSloganType) => getSloganGPT(form),
    onSuccess: (data) => {
      appendAI(data)
    },
    meta: {
      offLoading: true
    }
  })

  const createSloganGPT = async () => {
    const data = await trigger(['brandName', 'idea', 'conceptID'])
    if (data && sloganConcept) {
      const { idea, brandName, conceptID } = getValues()
      const concept = sloganConcept?.find((item) => item.id === conceptID)?.nameKr
      concept && mutate({ idea, brandName, concept })
    }
  }

  const choosenSlogan = () => {
    if (isView) {
      return (
        <Grid container className={styles.layer_card_item} display='flex' spacing={2} alignItems='stretch'>
          {fields?.map((item, index) => (
            <Grid item xs={6} md={6} key={index} alignItems='stretch'>
              <CardSelectedBox label={item.kr} onRemove={() => remove(index)} isView />
            </Grid>
          ))}
        </Grid>
      )
    }
    return (
      <>
        <LoadingAI isLoading={isPending}>
          <Box className={styles.slogan_AI_area}>
            {!fieldsAI.length ? (
              <Box component={'div'} className={styles.default}>
                <Typography className={styles.reference_slogan_title}>슘페터AI 슬로건</Typography>
                <Typography className={styles.reference_slogan_sub_title}>
                  슬로건 컨셉에 맞춰 슘페터 AI가 알맞은 슬로건을 생성합니다.
                </Typography>
                <Box component={'div'}>
                  <CreateButton
                    disabled={watch(['brandName', 'conceptID', 'idea']).some((item: string | undefined | number) =>
                      [undefined, '', 0].includes(item)
                    )}
                    onClick={() => createSloganGPT()}
                  />
                </Box>
              </Box>
            ) : (
              <Box component={'div'} className={styles.list_slogan_AI_area}>
                <Box component={'div'} className={`${styles.child_layer_title}`}>
                  <Box component={'h2'}>추천 슬로건</Box>
                  <Box component={'p'} className={styles.card_note}>
                    {fieldsAI.length}개
                  </Box>
                </Box>
                <ScrollBar
                  style={{
                    maxHeight: remConvert('310px'),
                    marginLeft: remConvert('-3px'),
                    marginRight: remConvert('-3px'),
                    marginInline: remConvert('4px')
                  }}
                >
                  <Grid container className={styles.paper_slogan_AI} display='flex' spacing={2} alignItems='stretch'>
                    {fieldsAI?.map((item, index) => (
                      <Grid item xs={6} md={6} key={index} className={`${styles.grid_item}`} alignItems='stretch'>
                        <CardItem
                          icon='checked'
                          sxCard={{ height: '100%', backgroundColor: home.gray300 }}
                          isActive={watch('referenceSlogan')
                            ?.map((tem) => tem.kr)
                            ?.includes(item.kr)}
                          onClick={() => {
                            const dataReferenceSlogan = getValues('referenceSlogan')
                            if (dataReferenceSlogan.map((tem) => tem.kr)?.includes(item.kr)) {
                              remove(dataReferenceSlogan.findIndex((data) => data.kr === item.kr))
                            } else if (fields.length < MAX_ITEM_REFERENCE_SLOGAN) append(item)
                            else setErrorMax(true)
                          }}
                          cardItem={{ title: item.kr }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </ScrollBar>
                <Box component={'div'} display={'flex'} justifyContent={'center'}>
                  <MoreButton
                    disabled={fieldsAI && fieldsAI.length >= 120}
                    svgComponentProps={{
                      pathProps: {
                        stroke: fieldsAI && fieldsAI.length >= 120 ? home.gray200 : home.gray50
                      }
                    }}
                    onClick={() => createSloganGPT()}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </LoadingAI>
        {!!fieldsAI.length && (
          <Box className={styles.selected_item_AI}>
            <Box component={'div'} className={`${styles.child_layer_title}`}>
              <Box component={'h2'}>선택한 항목</Box>
              <Box component={'p'} className={styles.card_note}>
                {fields.length}개
              </Box>
            </Box>
            <Grid container className={styles.layer_card_item} display='flex' spacing={2} alignItems='stretch'>
              {fields?.map((item, index) => (
                <Grid item xs={6} md={6} key={index} alignItems='stretch'>
                  <CardSelectedBox label={item.kr} onRemove={() => remove(index)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <Alert
          key={`${isErrorMax}`}
          isOpen={isErrorMax}
          sx={{ backgroundColor: home.alpha_red_10 }}
          color='error'
          severity='error'
          variant='filled'
        >
          레퍼런스 슬로건은 최대 10개까지 선택 가능합니다.
        </Alert>
      </>
    )
  }

  return (
    <Stack sx={{ breakInside: 'avoid' }} gap={remConvert('60px')}>
      <DividerItem isView={isView} />
      <Box component={'div'} className={styles.part_area}>
        <Box component={'div'}>
          <Box component={'div'} className={`${styles.layer_title}`}>
            <Box component={'h2'}>레퍼런스 슬로건</Box>
            {!isView && (
              <Box component={'p'} className={styles.card_note}>
                (최대 10개 선택)
              </Box>
            )}
          </Box>
          {!isView && (
            <Typography className={styles.sub_title}>
              슘페터 AI가 생성한 슬로건 후보군 중에서 슬로건 개발에 참고할만한 슬로건을 선택해 보세요.
            </Typography>
          )}
        </Box>
        {choosenSlogan()}
      </Box>
    </Stack>
  )
}
export default ReferenceSlogan
