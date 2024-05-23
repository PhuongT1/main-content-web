import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Stack, Divider, Grid } from '@mui/material'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import useToggle from '@/hooks/use-toggle'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import { IFormValuesMarketingStrategies, IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import IMarketingStrategiesSelectView from '@/components/cards/marketing-strategies-select-view'
import styles from './../../style.module.scss'

function Step_02_View() {
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const form = useFormContext<IFormValuesMarketingStrategies>()
  const { reset } = form

  const { data: dataGoals } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )
  const { data: dataStrategies } = useAdvertisementMarketingData<IFormValuesMarketingStrategies>(
    STEP.STEP_TWO,
    'data-advertisement-marketing-strategies'
  )

  // =====
  useEffect(() => {
    dataStrategies?.data && reset(dataStrategies.data)
  }, [dataStrategies])

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setActiveStep(STEP.STEP_TWO)
  }

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box marginBottom={convertToRem(60)}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          마케팅 전략
        </Box>
        <Grid spacing={2} container sx={{ padding: convertToRem(2) }}>
          {(dataGoals?.data?.selectedGoals || [])?.map((goal, index) => (
            <Grid item xs={4} key={index}>
              <IMarketingStrategiesSelectView
                url={goal?.url}
                name={goal?.name}
                item={
                  dataStrategies?.data?.data?.[index]?.strategies
                    ?.filter(Boolean)
                    ?.map((item) => item?.name ?? '') as string[]
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>

      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step_02_View
