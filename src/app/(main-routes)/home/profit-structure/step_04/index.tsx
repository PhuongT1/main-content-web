'use client'
import * as yup from 'yup'
import { useRecoilState } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesDiagramProfitStructure } from '@/types/profit-structure.type'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { STEP } from '@/constants/common.constant'
import { completeStepSelector } from '@/atoms/home/stepper'
import Step_04_Edit from './edit'
import Step_04_View from './view'

const Step_04_ProfitStructure = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const schema = yup.object({
    profitStructures: yup.array().min(1).max(MAX_LENGTH.DIAGRAM_PROFIT_STRUCTURE).required(),
    profitDiagram: yup
      .object()
      .shape({
        nodes: yup.array(),
        edges: yup.array(),
        type: yup.object()
      })
      .required()
  })

  const form = useForm<IFormValuesDiagramProfitStructure>({
    // resolver: yupResolver(schema as any),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_FOUR) ? <Step_04_View /> : <Step_04_Edit />}</FormProvider>
  )
}
export default Step_04_ProfitStructure
