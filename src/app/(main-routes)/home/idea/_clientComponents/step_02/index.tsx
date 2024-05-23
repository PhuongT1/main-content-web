import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CaculationModeEnum, TCreateIdea } from '@/types/idea.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { useIdeaData } from '../use-idea'
import { useEffect } from 'react'
import Step_02_Edit from './edit'
import { MAX_IDEAS_COUNT, MIN_IDEAS_COUNT, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import Step_02_View from './view'
import { modeCalculationIdeaSelector, modeWriteIdeaSelector } from '@/atoms/home/idea'
import { isEmpty } from '@/utils/object'
import { useLanguage } from '@/hooks/use-language'

export const defaultValuesStepIdea: TCreateIdea = {
  completed: [],
  manualInput: '',
  plus: {
    industrial: {
      id: 0,
      nameEn: '',
      nameKr: ''
    },
    content: '',
    path: null
  },
  minus: {
    keywords: [],
    content: ''
  },
  division: {
    keywords: [],
    content: ''
  },
  multiplication: {
    industrial: {
      id: 0,
      nameEn: '',
      nameKr: ''
    },
    content: '',
    path: null
  }
}

const Step2Idea = () => {
  const  { dict } = useLanguage()
  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)
  const [, setCaculationMode] = useRecoilState(modeCalculationIdeaSelector)
  const [mode, setActiveMode] = useRecoilState(modeWriteIdeaSelector)

  const schema = yup.object({
    completed: yup.array().of(yup.string().required(' ')),
    manualInput: yup.string(),
    division: yup.object({}).when(['completed'], {
      is: (completed: string[]) => {
        return !completed.length
      },
      then: (schema) => {
        return yup.object({
          content: yup.string().required(' ').trim(),
          keywords: yup
            .array()
            .of(
              yup.object({
                isSelected: yup.boolean(),
                content: yup.string(),
                id: yup.string()
              })
            )
            .min(MIN_IDEAS_COUNT, dict.idea_min_count_msg)
            .max(MAX_IDEAS_COUNT)
        })
      }
    }),
    minus: yup.object({}).when(['completed'], {
      is: (completed: string[]) => {
        return !completed.length
      },
      then: (schema) => {
        return yup.object({
          content: yup.string().required(' ').trim(),

          keywords: yup
            .array()
            .of(
              yup.object({
                isSelected: yup.boolean(),
                content: yup.string(),
                id: yup.string()
              })
            )
            .min(MIN_IDEAS_COUNT, dict.idea_min_count_msg)
            .max(MAX_IDEAS_COUNT)
        })
      }
    }),
    multiplication: yup.object().when(['completed'], {
      is: (completed: string[]) => {
        return !completed.length
      },
      then: (schema) => {
        return yup.object({
          industrial: yup.object({
            id: yup.number(),
            nameEn: yup.string(),
            nameKr: yup.string()
          }),
          content: yup.string().when(['industrial'], {
            is: (industrial: object) => !isEmpty(industrial ?? {}),
            then: (schema) => yup.string().required().trim()
          })
          // path: yup.string().when(['industrial'], {
          //   is: (industrial: object) => !isEmpty(industrial ?? {}),
          //   then: (schema) => yup.string().required()
          // })
        })
      }
    }),
    plus: yup.object().when(['completed'], {
      is: (completed: string[]) => {
        return !completed.length
      },
      then: (schema) => {
        return yup.object({
          industrial: yup.object({
            id: yup.number(),
            nameEn: yup.string(),
            nameKr: yup.string()
          }),
          content: yup.string().when(['industrial'], {
            is: (industrial: any) => {
              return !!industrial?.id
            },
            then: (schema) => yup.string().required().trim()
          })
          // path: yup.string().when(['industrial'], {
          //   is: (industrial: any) => {
          //     return !!industrial?.id
          //   },
          //   then: (schema) => yup.mixed().required()
          // })
        })
      }
    })
  })

  const complete = useRecoilValue(completeStepSelector)

  const form = useForm<TCreateIdea>({
    defaultValues: defaultValuesStepIdea,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema) as any
  })

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data, { keepDefaultValues: true })

      if (data?.data.completed.length > 0) {
        data?.data.completed.forEach((method: any) => {
          if (mode === 'none') {
            setActiveMode(method)
          }
          setCaculationMode((prev) => ({ ...prev, [method]: CaculationModeEnum.PREVIEW }))
        })
      }
    } else {
      form.reset(defaultValuesStepIdea, { keepDefaultValues: true })
      setCaculationMode({
        minus: CaculationModeEnum.EDIT,
        multiplication: CaculationModeEnum.EDIT,
        plus: CaculationModeEnum.EDIT,
        division: CaculationModeEnum.EDIT
      })
      setActiveMode('none')
    }
  }, [data?.data])

  return <FormProvider {...form}>{complete.includes(STEP.STEP_TWO) ? <Step_02_View /> : <Step_02_Edit />}</FormProvider>
}
export default Step2Idea
