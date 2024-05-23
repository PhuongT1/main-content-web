import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, Grid, Divider, useTheme } from '@mui/material'
import { EditButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import { STEP } from '@/constants/common.constant'
import { IFormValuesPricingStrategy } from '@/types/profit-structure.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'
import { useProfitStructureData, useClickButtonEdit } from '../../use-profit-structure'
import styles from './../../style.module.scss'

function Step_02_View() {
  const { palette } = useTheme()
  const { dict } = useLanguage()
  const form = useFormContext<IFormValuesPricingStrategy>()
  const { reset } = form

  const { data } = useProfitStructureData<IFormValuesPricingStrategy>(STEP.STEP_TWO, 'data-profit-pricing-strategy')
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_TWO)

  // =====
  useEffect(() => {
    data?.data && reset(data.data)
  }, [data])

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', borderColor: palette.home.gray200 }} />

      <SectionTitle title={dict.profit_step2_title1} />
      <Grid container display='flex' wrap='wrap' spacing={convertToRem(12)} alignItems='stretch'>
        {data?.data?.strategyList?.map((item, index) => (
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
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}

export default Step_02_View
