import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Stack, Grid, Divider, useTheme } from '@mui/material'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import useToggle from '@/hooks/use-toggle'
import { useLanguage } from '@/hooks/use-language'
import { Typography } from '@/elements'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { IFormValuesProfitGenerationStructure } from '@/types/profit-structure.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionTruncateOneLine } from '@/utils/styles'
import { useProfitStructureData } from '../../use-profit-structure'
import styles from './../../style.module.scss'

function Step_01_View() {
  const { palette } = useTheme()
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const form = useFormContext<IFormValuesProfitGenerationStructure>()
  const { reset, watch } = form
  const { dict } = useLanguage()

  const { data } = useProfitStructureData<IFormValuesProfitGenerationStructure>(
    STEP.STEP_ONE,
    'data-profit-generation-structures'
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
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', borderColor: palette.home.gray200 }} />

      <SectionTitle title={dict.profit_step1_title2} />
      <Box borderRadius={convertToRem(10)} height={convertToRem(70)} sx={{ bgcolor: palette.home.gray300 }}>
        <Typography
          fontWeight={600}
          cate={'body_1'}
          display={'flex'}
          gap={convertToRem(20)}
          justifyContent={'space-between'}
          sx={{ padding: convertToRem(20), color: palette.home.gray50 }}
        >
          <Box component={'span'} color={palette.home.mint500}>
            “
          </Box>
          <Box
            component={'span'}
            display={'flex'}
            alignItems={'center'}
            gap={convertToRem(20)}
            sx={{ flex: 1, ...optionTruncateOneLine() }}
          >
            <Box component={'span'}>{data?.data?.brand}</Box>
            <Box
              component={'span'}
              display={'inline-flex'}
              sx={{ width: '1px', height: convertToRem(17), background: palette.home.gray200 }}
            />
            <Box component={'span'} sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {data?.data?.idea}
            </Box>
          </Box>
          <Box component={'span'} color={palette.home.mint500}>
            ”
          </Box>
        </Typography>
      </Box>

      <SectionTitle title={dict.profit_step1_title3} />
      <Grid container display='flex' wrap='wrap' spacing={convertToRem(12)} alignItems='stretch'>
        {data?.data?.profitStructureList?.map((item, index) => (
          <Grid item xs={12} md={4} key={index} alignItems='stretch' sx={{ pointerEvents: 'none' }}>
            <CardMarketingGoal
              isView={true}
              item={item}
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

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>

      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step_01_View
