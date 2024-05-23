import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Step_01_Edit from './edit'
import { TIdiaFormValues } from '@/types/idea.type'
import { useRecoilValue } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'
import Step_01_View from './view'
import { STEP } from '@/constants/common.constant'
import { useIdeaData } from '../use-idea'
import { useEffect } from 'react'
import { MODE_IDEA, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { isEmpty } from '@/utils/object'

export const defaultValuesStepIdea = {
  path: null,
  industrial: {
    id: 0,
    nameKr: '',
    nameEn: ''
  },
  mode: '',
  findIdeas: {
    situation: '',
    target_customer: '',
    inconvenience_factor: '',
    keyword: '',
    groupIdeas: []
  },
  writeIdeas: {
    resolution: '',
    target_customer: '',
    inconvenience_factor: '',
    service_name: '',
    idea: '',
    ideas: [],
    ideasDataAI: []
  }
}

const Step1Idea = () => {
  const { data } = useIdeaData<TIdiaFormValues>(STEP.STEP_ONE, QUERY_KEY_IDEA.IDEA)

  const schema = yup.object({
    mode: yup.string().required(),
    findIdeas: yup.object().when(['mode'], {
      is: (mode: string) => mode === MODE_IDEA.INSDUSTRY,
      then: () => {
        return yup.object({
          keyword: yup.string(),
          situation: yup.string(),
          target_customer: yup.string(),
          inconvenience_factor: yup.string(),
          groupIdeas: yup.array().min(1).max(5)
        })
      }
    }),
    writeIdeas: yup
      .object({
        resolution: yup.string().required(),
        target_customer: yup.string().required(),
        inconvenience_factor: yup.string().required(),
        service_name: yup.string().required(),
        // idea: yup.string().when(['resolution', 'inconvenience_factor', 'target_customer', 'service_name'], {
        //   is: (resolution: string, inconvenience_factor: string, target_customer: string, service_name: string) => {
        //     return resolution && inconvenience_factor && target_customer && service_name
        //   },
        //   then(schema) {
        //     return schema.required()
        //   }
        // })
        ideas: yup
          .array()
          .of(
            yup.object({
              id: yup.string().required(),
              content: yup.string().required()
            })
          )
          .max(12)
      })
      .required(),
    path: yup.mixed().required()
  })

  const complete = useRecoilValue(completeStepSelector)

  const form = useForm<TIdiaFormValues>({
    defaultValues: defaultValuesStepIdea,
    mode: 'all',
    resolver: yupResolver(schema) as any
  })

  useEffect(() => {
    if (!isEmpty(data?.data ?? {})) {
      form.reset(data?.data, { keepDefaultValues: false })
    } else {
      // form.reset(defaultValuesStepIdea, { keepDefaultValues: false })
    }
  }, [data?.data])

  return <FormProvider {...form}>{complete.includes(STEP.STEP_ONE) ? <Step_01_View /> : <Step_01_Edit />}</FormProvider>
}
export default Step1Idea
