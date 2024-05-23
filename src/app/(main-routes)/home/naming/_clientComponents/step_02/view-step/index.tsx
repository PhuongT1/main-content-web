'use client'
import Box from '@mui/material/Box'
import React from 'react'
import { Typography } from '@/elements'
import { Grid, Stack, useTheme } from '@mui/material'
import styles from './view.module.scss'
import { NamingCandidates } from '@/types/naming.type'
import { EditButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useRecoilState } from 'recoil'
import { remConvert } from '@/utils/convert-to-rem'
import { STEP } from '@/constants/common.constant'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import { QUERY_KEY_CANDIDATES } from '@/constants/naming.constant'
import { useNamingData } from '../../../hooks/use-naming'
import SectionTitle from '@/components/home/section-title'
import { useLanguage } from '@/hooks/use-language'
import Divider from '@/elements/divider'

const Step2View = () => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const [showDialog, toggleShowDialog] = useToggle()

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)

  const { data } = useNamingData<NamingCandidates>(STEP.STEP_TWO, QUERY_KEY_CANDIDATES)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_TWO)
  }

  return (
    <Box component={'form'}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px'), borderColor: home.gray200 }} />
      <SectionTitle title={dict?.naming_step_2_title} />
      <Box component={'div'} bgcolor={home.gray300} className={styles.business_idea}>
        <Grid container flexDirection={'row'} wrap='wrap' className={styles.category} spacing={remConvert('12px')}>
          {data?.data?.selectedItem?.map((item, index) => (
            <Grid item xs={3} md={3} key={index}>
              <Box component={'div'} bgcolor={home.gray_bg_200} className={styles.item_buton}>
                <Box component={'div'} display={'flex'} flexWrap={'wrap'} columnGap={remConvert('12px')}>
                  <Typography color={home.gray0}>{item.name} </Typography>
                  <Typography color={home.blue500} className={styles.font_style_text}>
                    {item.affectTitle}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step2View
