'use client'

import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { Box, Divider, Grid, Stack, useTheme } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'

import styles from './view.module.scss'
import InfoPersonItem from '../../../_components/info-person-item'
import { STEP } from '@/constants/common.constant'
import { TFormValue } from '@/types/teambuilding/index.type'
import { isEmpty } from '@/utils/object'
import { useRemoveCompletedStep, useTeambuildingData } from '../../../use-teambuilding'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import { useLanguage } from '@/hooks/use-language'

type TStep02ViewProps = {}

function Step_02_View({}: TStep02ViewProps) {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const { handleRemoveCompleteStep } = useRemoveCompletedStep(STEP.STEP_TWO)

  const { data } = useTeambuildingData<TFormValue[]>(STEP.STEP_TWO, TEAMBUILDING_QUERY_KEY.GET_DATA_S2)

  return (
    <Box component={'form'}>
      <Box component={'div'}>
        <Divider flexItem sx={{ width: '100%', height: '1px', marginBottom: '40px', marginTop: '20px', bgcolor: home.gray200, borderColor: home.gray200 }} />
        <Grid container spacing={'40px'}>
          {!isEmpty(data?.data ?? {}) &&
            data?.data?.map((item, index) => (
              <Grid key={item.name} item xs={12}>
                <InfoPersonItem markTitle={dict.teambuilding_members} index={index} item={item} />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_02_View
