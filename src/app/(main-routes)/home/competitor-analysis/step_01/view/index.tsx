import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Grid, Stack, Divider, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import InputItem from '@/form/input'
import { ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import useToggle from '@/hooks/use-toggle'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import { BoxLayout } from '@/components/home/box/box-custom'
import { CardItemData } from '@/components/cards/competitor-card'
import { STEP } from '@/constants/common.constant'
import { IFormValuesStepOne } from '@/types/competitor-analysis.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionAutoFillItems } from '@/utils/styles'
import styles from './../../style.module.scss'

function Step_01_View() {
  const {
    palette: { home }
  } = useTheme()
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const form = useFormContext<IFormValuesStepOne>()
  const { watch } = form
  const selectedCompetitors = watch('selectedCompetitors')

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_ONE)
  }

  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          사업 아이디어
        </Box>
        <Grid container spacing={2} sx={{ opacity: '.75', pointerEvents: 'none' }}>
          <Grid item xs={12} lg={3}>
            <InputItem name='industry' label='브랜드명' />
          </Grid>
          <Grid item xs={12} lg={9}>
            <InputItem name='idea' label='아이디어' />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: convertToRem(60) }}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          경쟁사 선택
        </Box>
        <BoxLayout flexDirection={'column'}>
          <Box
            display='flex'
            justifyContent='start'
            alignItems='center'
            gap={1}
            width='100%'
            marginBottom={convertToRem(16)}
          >
            <Typography cate='title_50'>선택한 항목</Typography>
            {selectedCompetitors?.length > 0 && (
              <Typography sx={{ color: home.mint500, fontWeight: 600 }}>{selectedCompetitors?.length}개</Typography>
            )}
          </Box>
          <Box width={'100%'} sx={{ ...optionAutoFillItems({}) }}>
            {selectedCompetitors?.map((item: ICompetitiveCompaniesResponse, index) => (
              <Box key={index} sx={{ pointerEvents: 'none' }}>
                <CardItemData item={item} isView={true} sxCard={{ backgroundColor: home.gray200 }} />
              </Box>
            ))}
          </Box>
        </BoxLayout>
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>

      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step_01_View
