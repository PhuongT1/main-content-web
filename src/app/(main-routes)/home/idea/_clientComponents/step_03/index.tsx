import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { TWriteIdea } from '@/types/idea.type'
import { useRecoilValue } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { useIdeaData } from '../use-idea'
import { useEffect } from 'react'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import Step_03_Edit from './edit'
import Step_03_View from './view'

export const defaultValuesStepWriteIdea: TWriteIdea = {
  title: '',
  description: '',
  selectedMethod: {
    type: '',
    title: '',
    description: ''
  },
  benefit: []
}

const Step3Idea = () => {
  const { data } = useIdeaData<TWriteIdea>(STEP.STEP_THREE, QUERY_KEY_IDEA.WRITE_IDEA)

  const schema = yup.object({
    selectedMethod: yup.object({
      type: yup.string().required(),
      title: yup.string(),
      description: yup.string().required()
    }),
    benefit: yup.array().of(
      yup.object({
        title: yup.string().required(),
        content: yup.string().required()
      })
    )
  })

  const complete = useRecoilValue(completeStepSelector)

  const form = useForm<TWriteIdea>({
    defaultValues: defaultValuesStepWriteIdea,
    mode: 'all',
    resolver: yupResolver(schema) as any
  })

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data, { keepDefaultValues: true })
    } else {
      form.reset(defaultValuesStepWriteIdea, { keepDefaultValues: true })
    }
  }, [data?.data])

  return (
    <FormProvider {...form}>{complete.includes(STEP.STEP_THREE) ? <Step_03_View /> : <Step_03_Edit />}</FormProvider>
  )
}
export default Step3Idea
