'use client'

import Analyzing, { DataTableAnalyzing, TableColumnsType } from '@/components/home/analyzing'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import { Form } from '@/elements'
import useToggle from '@/hooks/use-toggle'
import { Slogan_Step2_Type, Slogan_Step3_Type, Slogan_Step3_Yup } from '@/types/slogan.type'
import { nanum_pen } from '@/utils/font'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import DividerItem from '../_component/divider-item'
import HocStepSlogan, { propStepComponent } from '../_component/hoc-step-slogan'
import styles from './step_03.module.scss'
import { ModalReset } from '@/components/dialog/modal-deck'
import { remConvert } from '@/utils/convert-to-rem'

const Step_03_Slogan: React.FC<propStepComponent<Slogan_Step3_Type, Slogan_Step2_Type>> = ({
  isView,
  data,
  prewStep,
  onFinish,
  showEdit
}) => {
  const {
    palette: { home }
  } = useTheme()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const form = useForm<Slogan_Step3_Type>({
    // resolver: yupResolver(Slogan_Step3_Yup),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      checkPointSlogan: []
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isValid }
  } = form

  const defaultDataPoin = useMemo(
    () => ({
      checkPointSlogan: prewStep?.data?.userSlogan?.map((item) => ({
        ...item,
        point: [],
        isActive: false
      }))
    }),
    [prewStep?.data]
  )

  useEffect(() => {
    if (data?.data?.checkPointSlogan) {
      return replace(data.data.checkPointSlogan)
    } else if (prewStep) {
      return replace(defaultDataPoin.checkPointSlogan || [])
    }
  }, [data?.data?.checkPointSlogan, prewStep, defaultDataPoin])

  const { fields, replace } = useFieldArray({ control, name: 'checkPointSlogan' })

  const convertTitle = (index: number) => (
    <Box component={'p'} display={'flex'} justifyContent={'center'} textAlign={'center'}>
      {fields[index]?.value}
    </Box>
  )

  const rowItem: TableColumnsType[] = [
    {
      title: '구 분',
      onRender: (_row, index) => convertTitle(index)
    },
    {
      title: '기억되기 쉬운가?'
    },
    {
      title: '메시지 전달이 명확한가?'
    },
    {
      title: '독창적이고 유니크한가?'
    },
    {
      title: '브랜드와 일관성이 있는가?'
    },
    {
      title: '트렌드와 사회적 상황에 부합하는가?'
    },
    {
      title: '종합 점수',
      onRender: (row) => {
        return (
          <Box component={'span'} color={home.blue500} fontWeight={600}>
            {row?.reduce((a: number, b: number) => (a || 0) + (b || 0), 0) || 0}점
          </Box>
        )
      }
    }
  ]

  const getValuesForm = (data: DataTableAnalyzing) => {
    data.tableAnalyzing.map((item, index) => {
      setValue(`checkPointSlogan.${index}.point`, item)
    })
  }

  return (
    <Form {...form}>
      <Box component='form' className={[styles.form_slogan].join(' ')} onSubmit={handleSubmit(onFinish)}>
        <DividerItem isView={isView} />
        <Box component={'div'} className={styles.part_area}>
          <Box component={'div'}>
            <Box component={'div'} className={`${styles.layer_title}`}>
              <Box component={'h2'}>슬로건 분석</Box>
              {!isView && (
                <Box component={'p'} className={styles.card_note}>
                  (최대 3개 작성)
                </Box>
              )}
            </Box>
            {!isView && (
              <Typography className={styles.sub_title}>
                슬로건 비교분석을 통해 평가를 진행하고 최종 슬로건을 선택해 보세요.
              </Typography>
            )}
          </Box>
          <Analyzing
            isDisable={isView}
            getValuesForm={getValuesForm}
            tableAnalyzing={fields.map((data) => data.point)}
            hiddenFinalSelected={isView}
            bgColorColumn={isView ? home.gray300 : undefined}
            rows={rowItem}
            indexActive={fields.findIndex((item) => item.isActive)}
            textFinalSelected={'당신의 선택은?'}
            sliderProps={{
              min: 1,
              max: 5,
              step: 1
            }}
            onSetActive={(index) => {
              setValue(
                'checkPointSlogan',
                getValues('checkPointSlogan').map((item, indexActive) => ({
                  ...item,
                  isActive: indexActive === index
                }))
              )
            }}
          />
          {isView && (
            <Box
              component={'div'}
              className={styles.part_area}
              sx={{ paddingTop: remConvert('60px'), breakInside: 'avoid' }}
            >
              <Box component={'h2'}>슬로건 개발</Box>
              <Box
                component={'div'}
                display={'flex'}
                className={[styles.final_slogan, nanum_pen.variable].join(' ')}
                bgcolor={home.gray300}
              >
                <Box component={'div'} className={[styles.slogan, nanum_pen.variable].join(' ')}>
                  {fields.find((item) => item.isActive)?.value}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Stack flexDirection={'row'} className={styles.btn_active}>
          {!isView ? (
            <>
              <RefreshButton onClick={toggleShowDialog} />
              <SubmitButton disabled={!isValid} type='submit' />
              <ModalReset
                open={showDialog}
                onCancel={toggleShowDialog}
                onSubmit={() => {
                  form.reset(defaultDataPoin)
                  setToggleShowDialog(false)
                }}
              />
            </>
          ) : (
            <EditButton onClick={() => showEdit()} />
          )}
        </Stack>
      </Box>
    </Form>
  )
}
export default HocStepSlogan<Slogan_Step3_Type, Slogan_Step2_Type>(Step_03_Slogan, {
  currentStep: 2
})
