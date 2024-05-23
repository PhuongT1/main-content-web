'use client'
import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useFieldArray, useForm } from 'react-hook-form'
import styles from './step_02.module.scss'
import React, { useEffect, useState } from 'react'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import Alert from '@/elements/alert'
import { Form, Typography } from '@/elements'
import HocStepSwot, { propStepComponent } from '../_clientComponents/hoc-step-swot'
import FactorBox from '../_clientComponents/factor-box'
import { convertToRem } from '@/utils/convert-to-rem'
import AIBox from './_clientComponents/AI-box'
import AIRender from './_clientComponents/AI-render'
import { useMutation } from '@tanstack/react-query'
import { ParamsGPT, Swot_Step1_Type, Swot_Step2_Type } from '@/types/swot.type'
import useToggle from '@/hooks/use-toggle'
import { Alert as AlertDialog } from '@/components/dialog'
import { cancelTxt, subTitleReset, submitTxt, titleReset } from '@/constants/naming.constant'
import { getSwotGPT } from '@/services/swot.service'
import DividerItem from '../_clientComponents/divider-item'
import { useLanguage } from '@/hooks/use-language'

const Step_02_Swot: React.FC<propStepComponent<Swot_Step2_Type, Swot_Step1_Type>> = ({
  isView,
  data,
  prewStep,
  onFinish,
  showEdit
}) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useForm<Swot_Step2_Type>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {}
  })

  const { dict, getValueLanguage } = useLanguage()

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = form as any

  const strengthAndOpportunity = useFieldArray({
    control,
    name: 'strengthAndOpportunity'
  })

  const weaknessAndOpportunity = useFieldArray({
    control,
    name: 'weaknessAndOpportunity'
  })

  const strengthAndThreat = useFieldArray({
    control,
    name: 'strengthAndThreat'
  })

  const weaknessAndThreat = useFieldArray({
    control,
    name: 'weaknessAndThreat'
  })

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const { mutateAsync: mutateStrengthAndOpportunity, isPending: isPendingStrengthAndOpportunity } = useMutation({
    mutationFn: (form: ParamsGPT) => getSwotGPT(form),
    onSuccess: (data: any) => {
      strengthAndOpportunity.append(data?.data?.results)
    },
    meta: {
      offLoading: true
    }
  })

  const { mutateAsync: mutateWeaknessAndOpportunity, isPending: isPendingWeaknessAndOpportunity } = useMutation({
    mutationFn: (form: ParamsGPT) => getSwotGPT(form),
    onSuccess: (data: any) => {
      weaknessAndOpportunity.append(data?.data?.results)
    },
    meta: {
      offLoading: true
    }
  })

  const { mutateAsync: mutateStrengthAndThreat, isPending: isPendingStrengthAndThreat } = useMutation({
    mutationFn: (form: ParamsGPT) => getSwotGPT(form),
    onSuccess: (data: any) => {
      strengthAndThreat.append(data?.data?.results)
    },
    meta: {
      offLoading: true
    }
  })

  const { mutateAsync: mutateWeaknessAndThreat, isPending: isPendingWeaknessAndThreat } = useMutation({
    mutationFn: (form: ParamsGPT) => getSwotGPT(form),
    onSuccess: (data: any) => {
      weaknessAndThreat.append(data?.data?.results)
    },
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    if (data?.data) form.reset(data.data, { keepDefaultValues: true })
  }, [data?.data])

  const {
    opportunityArray,
    strengthArray,
    threatArray,
    weaknessArray,
    derivationOfBusinessObjectives,
    brandName,
    idea
  } = prewStep?.data || {}

  const mapArr = (arr: any) => arr?.map((x: any) => getValueLanguage(x, 'name'))

  const createDataGPT = (cb: (value: any) => void, list: any) => {
    const data = {
      // brandName,
      // idea,
      // details: derivationOfBusinessObjectives?.map((x) => x?.title),
      ...list
    } as ParamsGPT
    cb(data)
  }

  const strengthAndOpportunityArray = watch('strengthAndOpportunity')
  const weaknessAndOpportunityArray = watch('weaknessAndOpportunity')
  const strengthAndThreatArray = watch('strengthAndThreat')
  const weaknessAndThreatArray = watch('weaknessAndThreat')

  return (
    <Form {...form}>
      <Box component='form' className={[styles.form_slogan].join(' ')} onSubmit={handleSubmit(onFinish)}>
        <DividerItem isView={isView} sx={{ marginBottom: convertToRem(60), borderColor: `${home.gray200}` }} />
        <Box component={'div'} className={styles.part_area}>
          <Box component={'div'}>
            <Box component={'div'} className={`${styles.layer_title}`}>
              <Box component={'h2'} color={home.gray50}>
                {dict.swot_analysis}
              </Box>
            </Box>
            {!isView && (
              <Typography className={styles.sub_title} plainColor='home.gray100'>
                {dict.swot_schumpeter}
              </Typography>
            )}
          </Box>
          <Alert
            key={errors.userSlogan?.type}
            isOpen={!!errors.userSlogan?.type}
            color='error'
            severity='error'
            variant='outlined'
          >
            {errors.userSlogan?.type === 'min' && '슬로건을 1개 이상 작성해주세요.'}
            {errors.userSlogan?.type === 'max' && '슬로건은 최대 3개까지 작성 가능합니다.'}
          </Alert>
        </Box>
        <Box
          component='table'
          className={styles['table-step-2']}
          sx={{ backgroundColor: isView ? home.gray300 : home.gray400 }}
        >
          <thead>
            <tr>
              <th>
                <Box
                  className={styles['top-left-table']}
                  sx={{
                    border: `1px solid ${home.gray200}`,
                    background: `linear-gradient(to top right, ${
                      isView ? home.gray300 : home.gray400
                    } calc(50% - 1px), ${home.gray200}, ${isView ? home.gray300 : home.gray400} calc(50% + 1px))`
                  }}
                >
                  <Typography
                    cate='subtitle_1_semibold'
                    sx={{ position: 'absolute', right: '20px', color: home.gray50 }}
                  >
                    {dict.swot_internal}
                  </Typography>
                  <Typography
                    cate='subtitle_1_semibold'
                    sx={{ position: 'absolute', bottom: '20px', left: '20px', color: home.gray50 }}
                  >
                    {dict.swot_external}
                  </Typography>
                </Box>
              </th>
              <th>
                <FactorBox
                  title={dict.swot_strength}
                  subTitle='Strength'
                  type='Strength'
                  sx={{ borderLeft: 0, background: isView ? home.gray300 : home.gray400 }}
                  data={mapArr(strengthArray)}
                />
              </th>
              <th>
                <FactorBox
                  title={dict.swot_weakness}
                  subTitle='Weakness'
                  type='Weakness'
                  sx={{
                    borderLeft: 0,
                    borderTopRightRadius: convertToRem(10),

                    background: isView ? home.gray300 : home.gray400
                  }}
                  data={mapArr(weaknessArray)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FactorBox
                  title={dict.swot_opportunity}
                  subTitle='Opportunity'
                  type='Opportunity'
                  sx={{
                    borderTop: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: isView ? home.gray300 : home.gray400
                  }}
                  data={mapArr(opportunityArray)}
                  direction='column'
                />
              </td>
              <td>
                <AIBox
                  titleOne={dict.swot_strength}
                  subTitleOne='Strength'
                  titleTwo={dict.swot_opportunity}
                  subTitleTwo='Opportunity'
                  content={dict.swot_strength_opportunity}
                  sx={{ borderLeft: 0, borderTop: 0 }}
                >
                  <AIRender
                    isPending={isPendingStrengthAndOpportunity}
                    dataSloganGPT={strengthAndOpportunityArray}
                    formArray={strengthAndOpportunity}
                    isView={isView}
                    onCreate={() =>
                      createDataGPT(mutateStrengthAndOpportunity, {
                        strengths: mapArr(strengthArray),
                        opportunities: mapArr(opportunityArray)
                        // weakness: [],
                        // threats: []
                      })
                    }
                    subTitle={dict.swot_ai_strength_opportunity}
                  />
                </AIBox>
              </td>
              <td>
                <AIBox
                  titleOne={dict.swot_weakness}
                  subTitleOne='Weakness'
                  titleTwo={dict.swot_opportunity}
                  subTitleTwo='Opportunity'
                  content={dict.swot_weakness_opportunity}
                  sx={{ borderLeft: 0, borderTop: 0 }}
                >
                  <AIRender
                    isPending={isPendingWeaknessAndOpportunity}
                    dataSloganGPT={weaknessAndOpportunityArray}
                    formArray={weaknessAndOpportunity}
                    isView={isView}
                    onCreate={() =>
                      createDataGPT(mutateWeaknessAndOpportunity, {
                        weakness: mapArr(weaknessArray),
                        opportunities: mapArr(opportunityArray)
                        // strengths: [],
                        // threats: []
                      })
                    }
                    subTitle={dict.swot_ai_weakness_opportunity}
                  />
                </AIBox>
              </td>
            </tr>
            <tr>
              <td>
                <FactorBox
                  title={dict.swot_threat}
                  subTitle='Threat'
                  type='Threat'
                  sx={{
                    borderTop: 0,
                    borderBottomLeftRadius: convertToRem(10),
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '100%',
                    background: isView ? home.gray300 : home.gray400
                  }}
                  data={mapArr(threatArray)}
                  direction='column'
                />
              </td>
              <td>
                <AIBox
                  titleOne={dict.swot_strength}
                  subTitleOne='Strength'
                  titleTwo={dict.swot_threat}
                  subTitleTwo='Threat'
                  content={dict.swot_strength_threat}
                  sx={{ borderLeft: 0, borderTop: 0 }}
                >
                  <AIRender
                    isPending={isPendingStrengthAndThreat}
                    dataSloganGPT={strengthAndThreatArray}
                    formArray={strengthAndThreat}
                    isView={isView}
                    onCreate={() =>
                      createDataGPT(mutateStrengthAndThreat, {
                        strengths: mapArr(weaknessArray),
                        threats: mapArr(threatArray)
                        // opportunities: [],
                        // weakness: []
                      })
                    }
                    subTitle={dict.swot_ai_strength_threat}
                  />
                </AIBox>
              </td>
              <td>
                <AIBox
                  titleOne={dict.swot_weakness}
                  subTitleOne='Weakness'
                  titleTwo={dict.swot_threat}
                  subTitleTwo='Threat'
                  content={dict.swot_weakness_threat}
                  sx={{ borderBottomRightRadius: convertToRem(10), borderLeft: 0, borderTop: 0 }}
                >
                  <AIRender
                    isPending={isPendingWeaknessAndThreat}
                    dataSloganGPT={weaknessAndThreatArray}
                    formArray={weaknessAndThreat}
                    isView={isView}
                    onCreate={() =>
                      createDataGPT(mutateWeaknessAndThreat, {
                        weakness: mapArr(weaknessArray),
                        threats: mapArr(threatArray)
                        // strengths: [],
                        // opportunities: []
                      })
                    }
                    subTitle={dict.swot_ai_weakness_threat}
                  />
                </AIBox>
              </td>
            </tr>
          </tbody>
        </Box>
        <Stack flexDirection={'row'} className={styles.btn_active}>
          {!isView ? (
            <>
              <RefreshButton onClick={toggleShowDialog} />
              <SubmitButton disabled={!isValid} type='submit' />
              <AlertDialog
                description={subTitleReset}
                title={titleReset}
                cancelTxt={cancelTxt}
                submitTxt={submitTxt}
                open={showDialog}
                onCancel={toggleShowDialog}
                onSubmit={() => {
                  strengthAndOpportunity.remove()
                  weaknessAndOpportunity.remove()
                  strengthAndThreat.remove()
                  weaknessAndThreat.remove()
                  form.reset(undefined)
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
export default HocStepSwot<Swot_Step2_Type, Swot_Step1_Type>(Step_02_Swot, {
  currentStep: 1
})
