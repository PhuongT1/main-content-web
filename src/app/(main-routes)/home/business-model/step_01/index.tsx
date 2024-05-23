'use client'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Loading from '@/elements/loading'
import { getStep } from '@/services/step.service'
import { IFormValuesStepOne } from '@/types/competitor-analysis.type'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { CANVAS_FORM_DEFAULT_DATA } from '../constants/business-model-canvas.constant'
import { BUSINESS_MODEL, MAX_LENGTH, STEP_ID } from '../constants/business.constant'
import {
  TBusinessModelCavansForm,
  TRequiredCharacteristicError,
  TSelectedCharacteristicByModel
} from '../types/business-model-canvas.type'
import Step_01_Edit from './edit'
import Step_01_View from './view'

const Step_01_BusinessModel = ({ projectId }: { projectId: number }) => {
  const [completeStep] = useRecoilState(completeStepSelector)
  const [requiredCharacteristicErr, setRequiredCharacteristicErr] = useState<TRequiredCharacteristicError>({
    corePartnership: false,
    customerSegment: false
  })

  const schema = yup.object({
    industry: yup.string().max(MAX_LENGTH.INDUSTRY).required(),
    idea: yup.string().max(MAX_LENGTH.IDEA).required(),
    selectedCharacteristicByModel: yup
      .mixed<TSelectedCharacteristicByModel>()
      .required()
      .test('selectedCharacteristicByModel', (value, ctx) => {
        let errObject: TRequiredCharacteristicError = {
          ...requiredCharacteristicErr,
          corePartnership: value?.corePartnership?.length === 0,
          customerSegment: value?.customerSegment?.length === 0
        }
        setRequiredCharacteristicErr(errObject)
        return !(errObject.corePartnership || errObject.customerSegment)
      })
  })

  const form = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: CANVAS_FORM_DEFAULT_DATA
  })

  const { data: dataStep, isLoading: isLoadingDataStep } = useQuery({
    queryKey: [`business-model-step-${STEP_ID.STEP_ONE}`],
    queryFn: () => getStep({ projectId: projectId, deckId: BUSINESS_MODEL.DECK_ID, stepId: STEP_ID.STEP_ONE }),
    staleTime: 0,
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    const data = (dataStep?.data as TStepApi) || {}
    if (data) {
      form.reset((data as any)?.data)
    }
  }, [dataStep?.data])

  if (isLoadingDataStep) return <Loading isLoading={true} />
  return (
    <FormProvider {...form}>
      {completeStep.includes(STEP.STEP_ONE) ? (
        <Step_01_View data={dataStep?.data} />
      ) : (
        <Step_01_Edit data={dataStep?.data as any} {...{ requiredCharacteristicErr, projectId }} />
      )}
    </FormProvider>
  )
}
export default Step_01_BusinessModel
