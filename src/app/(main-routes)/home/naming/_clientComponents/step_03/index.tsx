import Box from '@mui/material/Box'
import React from 'react'
import Step3Edit from './edit-step'
import Step3View from './view-step'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { NamingAnalyzing } from '@/types/naming.type'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLanguage } from '@/hooks/use-language'
import { Dictionary } from '@/types/types.type'

export const defaultValuesAnalyzing = (dict: Dictionary) => {
  return {
    cardActiveList: [
      { name: dict.naming_step_3_default_table?.replaceAll('{number}', '1'), point: [] },
      { name: dict.naming_step_3_default_table?.replaceAll('{number}', '2'), point: [] }
    ]
  }
}
const Step3Naming = () => {
  const { dict } = useLanguage()
  const completeStep = useRecoilValue(completeStepSelector)
  const schema = yup.object({
    cardActiveList: yup
      .array()
      .required(' ')
      .min(2, ' ')
      .test((value) => !!value.find((item) => item.isActive))
  })

  const form = useForm<NamingAnalyzing>({
    // resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultValuesAnalyzing(dict)
  })

  return (
    <Box>
      <FormProvider {...form}>{!completeStep.includes(2) ? <Step3Edit /> : <Step3View />}</FormProvider>
    </Box>
  )
}
export default Step3Naming
