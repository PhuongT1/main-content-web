'use client'

import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'

import styles from './view.module.scss'
import InfoPersonItem from './info-person-item'
import SelectedListView from './selected-list'
import { TFormValues } from '../edit'
import SvgIcon from '@/components/home/svg'
import { TItem } from '@/mock/teambuilding/data'
import { LANG, STEP } from '@/constants/common.constant'
import { isEmpty } from '@/utils/object'
import { useRemoveCompletedStep, useTeambuildingData } from '../../../use-teambuilding'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import { useLanguage } from '@/hooks/use-language'

type TStep03ViewProps = {}

function Step_03_View({ }: TStep03ViewProps) {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { handleRemoveCompleteStep } = useRemoveCompletedStep(STEP.STEP_THREE)

  const { data } = useTeambuildingData<TFormValues>(STEP.STEP_THREE, TEAMBUILDING_QUERY_KEY.GET_DATA_S3)

  return (
    <Box component={'form'}>
      <Box component={'div'}>
        <Divider flexItem sx={{ width: '100%', height: '1px', marginBottom: '40px', marginTop: '20px', bgcolor: home.gray200, borderColor: home.gray200 }} />
        <Grid container gap={'40px'}>
          <Grid item xs={12}>
            <InfoPersonItem
              name={data?.data?.name}
              content={lang === LANG.EN ? data?.data?.contentEn : data?.data?.content}
              date={data?.data?.date}
              path={data?.data?.path}
            />
          </Grid>
          <Grid item xs={12}>
            <Box flexWrap={'wrap'} display='flex' alignItems='center' gap={'20px'} width='100%'>
              <Typography color={home.gray50} id={styles.selected_title}>{dict.organizational_culture}</Typography>
              <SelectedListView
                list={{
                  selectedList: data?.data?.organization,
                  key: 'id',
                  label: lang === LANG.EN ? 'nameEn' : 'name'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box flexWrap={'wrap'} display='flex' alignItems='center' gap={'20px'} width='100%'>
              <Typography color={home.gray50}id={styles.selected_title}>{dict.teambuilding_working_environment}</Typography>
              <SelectedListView
                countItemRow={5}
                list={{
                  selectedList: data?.data?.workingEnv,
                  key: 'id',
                  label: 'title',
                  render: (item: TItem) => {
                    return (
                      <Box component={'div'} display={'flex'} alignItems={'center'} gap={'8px'} width="100%">
                        <SvgIcon svg={item.icon} />
                        <Box
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'inline-block',
                            flex: 1,
                            color: home.gray50
                          }}
                        >
                          {getValueLanguage(item, 'title')}
                        </Box>
                      </Box>
                    )
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box flexWrap={'wrap'} display='flex' alignItems='center' gap={'20px'} width='100%'>
              <Typography color={home.gray50} id={styles.selected_title}>{dict.teambuilding_benefits}</Typography>
              <SelectedListView
                countItemRow={5}
                list={{
                  selectedList: data?.data?.welBenefits,
                  key: 'id',
                  label: 'title',
                  render: (item: TItem) => {
                    return (
                      <Box component={'div'} display={'flex'} alignItems={'center'} gap={'8px'} width="100%">
                        <SvgIcon svg={item.icon} />
                        <Box
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'inline-block',
                            flex: 1,
                            color: home.gray50
                          }}
                        >
                          {getValueLanguage(item, 'title')}
                        </Box>
                      </Box>
                    )
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_03_View
