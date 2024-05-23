import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Grid, Stack, Divider } from '@mui/material'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import InputItem from '@/form/input'
import useToggle from '@/hooks/use-toggle'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import { IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import styles from './../../style.module.scss'

function Step_01_View() {
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const form = useFormContext<IFormValuesMarketingGoals>()
  const { reset, watch } = form

  const selectedGoals = watch('selectedGoals')
  const { data } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )

  // =====
  useEffect(() => {
    data?.data && reset(data.data)
  }, [data])

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_ONE)
  }

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          사업 아이디어
        </Box>
        <Grid container spacing={2} sx={{ pointerEvents: 'none' }}>
          <Grid item xs={12} lg={3}>
            <InputItem
              name='title'
              label='브랜드명'
              sxInput={{
                '.MuiInputBase-root': { height: convertToRem(56) },
                '.MuiInputBase-input': { padding: convertToRem(10) }
              }}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <InputItem
              name='idea'
              label='아이디어'
              sxInput={{
                '.MuiInputBase-root': { height: convertToRem(56) },
                '.MuiInputBase-input': { padding: convertToRem(10) }
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: convertToRem(60) }}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          마케팅 목표
        </Box>
        <Grid spacing={convertToRem(12)} container display='flex' alignItems='stretch'>
          {(selectedGoals || data?.data?.selectedGoals)?.map((item, index) => (
            <Grid item xs={12} md={6} key={index} alignItems='stretch' sx={{ pointerEvents: 'none' }}>
              <CardMarketingGoal
                item={item}
                isView={true}
                sxCard={{
                  img: { height: `${convertToRem(90)}!important`, width: `${convertToRem(130)}!important` },
                  '.MuiBox-root:nth-child(2)': { marginTop: 0 },
                  'span.MuiBox-root': { paddingRight: 0 },
                  '.MuiButtonBase-root': {
                    gap: convertToRem(12),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row-reverse'
                  }
                }}
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

export default Step_01_View
