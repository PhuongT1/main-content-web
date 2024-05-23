'use client'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Loading from '@/elements/loading'
import { getStep } from '@/services/step.service'
import { TStepApi } from '@/types/step.type'
import { isEmpty } from '@/utils/object'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import * as yup from 'yup'
import { COMPOSITION_FORM_DEFAULT_VALUES } from '../constants/business-model-composition.constant'
import { BUSINESS_MODEL, STEP_ID } from '../constants/business.constant'
import { TSelectedCharacteristicByModel } from '../types/business-model-canvas.type'
import { TBusinessModelCompositionForm, TModelBox, TRelationBox } from '../types/business-model-composition.type'
import Step_02_Edit from './edit'
import Step_02_View from './view'

const Step_02_BusinessModel = ({ projectId }: { projectId: number }) => {
  const completeStep = useRecoilValue(completeStepSelector)

  const schema = yup.object().shape({
    diagramDatas: yup.mixed<{ [k: number]: TModelBox }>().required(),
    diagramRelationshipDatas: yup.mixed<{ [k: number]: TRelationBox }>().required()
  })

  const form = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: COMPOSITION_FORM_DEFAULT_VALUES
  })

  const { data: dataStep2, isLoading: isLoadingDataStep2 } = useQuery({
    queryKey: [`business-model-step-${STEP_ID.STEP_TWO}`],
    queryFn: () => getStep({ projectId: projectId, deckId: BUSINESS_MODEL.DECK_ID, stepId: STEP_ID.STEP_TWO }),
    staleTime: 0,
    meta: {
      offLoading: true
    }
  })

  const { data: dataStep1, isLoading: isLoadingDataStep1 } = useQuery({
    queryKey: [`business-model-step-${STEP_ID.STEP_ONE}`],
    queryFn: () => getStep({ projectId: projectId, deckId: BUSINESS_MODEL.DECK_ID, stepId: STEP_ID.STEP_ONE }),
    staleTime: 0,
    gcTime: 0,
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    const data: any = (dataStep2?.data as TStepApi) || {}
    if (data && !isEmpty(data)) {
      form.reset(data?.data)
    }
  }, [dataStep2?.data])

  useEffect(() => {
    const data: any = (dataStep1?.data as TStepApi) || {}
    if (data && !isEmpty(data)) {
      const selectedCharacteristics = data?.data?.selectedCharacteristicByModel as TSelectedCharacteristicByModel
      const diagramDatas = {
        ...form.getValues().diagramDatas,
        1: {
          iconId: 1,
          name: selectedCharacteristics?.corePartnership?.reduce((pre, cur) => {
            const text = pre + `${cur.name}\n`
            return text
          }, ''),
          added: true
        },
        4: {
          iconId: 1,
          name: data?.data?.industry,
          added: true
        },
        5: {
          iconId: 2,
          name: data?.data?.idea,
          added: true
        },
        6: {
          iconId: 7,
          name: selectedCharacteristics?.customerSegment?.reduce((pre, cur) => {
            const text = pre + `${cur.name}\n`
            return text
          }, ''),
          added: true
        }
      }
      form.setValue('diagramDatas', diagramDatas)
    }
  }, [dataStep1?.data, dataStep2?.data])

  if (isLoadingDataStep2 || isLoadingDataStep1) return <Loading isLoading={true} />

  return (
    <FormProvider {...form}>
      {completeStep.includes(STEP.STEP_TWO) ? <Step_02_View /> : <Step_02_Edit {...{ projectId }} />}
    </FormProvider>
  )
}
export default Step_02_BusinessModel
