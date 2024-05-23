import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Stack, Grid, Divider } from '@mui/material'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import IMarketingStrategiesSelectView from '@/components/cards/marketing-strategies-select-view'
import useToggle from '@/hooks/use-toggle'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import {
  IFormValuesMarketingChannels,
  IFormValuesMarketingGoals,
  IFormValuesMarketingStrategies
} from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import styles from './../../style.module.scss'

function Step_03_View() {
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const form = useFormContext<IFormValuesMarketingChannels>()
  const { reset } = form

  const { data: dataGoals } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )
  const { data: dataStrategies } = useAdvertisementMarketingData<IFormValuesMarketingStrategies>(
    STEP.STEP_TWO,
    'data-advertisement-marketing-strategies'
  )
  const { data: dataChannels } = useAdvertisementMarketingData<IFormValuesMarketingChannels>(
    STEP.STEP_THREE,
    'data-advertisement-marketing-channels'
  )

  // =====
  useEffect(() => {
    dataChannels?.data && reset(dataChannels.data)
  }, [dataChannels])

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setActiveStep(STEP.STEP_THREE)
  }

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          홍보 채널
        </Box>
        <Grid spacing={2} container sx={{ padding: convertToRem(2) }}>
          {(dataGoals?.data?.selectedGoals || [])?.map((goal, index) => (
            <Grid item xs={4} key={index}>
              <IMarketingStrategiesSelectView
                url={goal?.url}
                name={goal?.name}
                subTitle={'홍보 채널'}
                item={
                  dataChannels?.data?.data?.[index]?.channels
                    ?.filter(Boolean)
                    ?.map((item) => item?.name ?? '') as string[]
                }
                prevDataList={[
                  {
                    title: '마케팅 전략',
                    data:
                      dataStrategies?.data?.data?.[index]?.strategies
                        ?.filter(Boolean)
                        ?.map((strategy) => strategy?.name) ?? []
                  }
                ]}
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

export default Step_03_View
