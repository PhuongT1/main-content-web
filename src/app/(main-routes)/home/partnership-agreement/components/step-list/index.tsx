import { completeStepSelector } from '@/atoms/home/stepper'
import StepItem, { StepList } from '@/components/home/step'
import { STEP } from '@/constants/common.constant'
import { getStep } from '@/services/step.service'
import { Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DECK_ID, PROJECT_ID } from './constant'
import BussinessContractPageEdit from './step-01/business-contract-edit/index'
import BusinessContractViewPage from './step-01/business-contract-view/index'
import AdditionalContractTermsEditPage from './step-02/additional-contract-terms-edit/index'
import { IDataStep01 } from '@/types/partnership-agreement'
import { projectIdPartnershipAgreement } from '@/atoms/home/partnership-agreement'

interface IStepListPartnershipContract {
  projectId: number
}

const StepListPartnershipContract = ({ projectId }: IStepListPartnershipContract) => {
  const { data: dataStepBusinessContract, isLoading: isLoadingDataStep } = useQuery({
    queryKey: [`partnership-contract-step-01`],
    queryFn: () => getStep({ projectId: projectId, deckId: DECK_ID, stepId: 1 }),
    staleTime: 0,
    meta: {
      offLoading: true
    }
  })
  const completeStep = useRecoilValue(completeStepSelector)
  const [, setProjectId] = useRecoilState(projectIdPartnershipAgreement)

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '기본 정보',
      description: !completeStep.includes(STEP.STEP_ONE) ? (
        <BussinessContractPageEdit dataStep1={dataStepBusinessContract?.data?.data as unknown as IDataStep01} />
      ) : (
        <BusinessContractViewPage dataStep1={dataStepBusinessContract?.data?.data as unknown as IDataStep01} />
      )
    },
    {
      title: 'Step 2',
      subtTitle: '동업계약서',
      description: <AdditionalContractTermsEditPage />
    }
  ]

  useEffect(() => {
    projectId && setProjectId(Number(projectId))
  }, [projectId])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StepItem stepList={steps} />
      </Grid>
    </Grid>
  )
}

export default memo(StepListPartnershipContract)
