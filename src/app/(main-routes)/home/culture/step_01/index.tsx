import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import Tabs from '@/elements/tabs'
import Tab from '@/elements/tab'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { culture_forms, tab } from '@/atoms/culture'
import CultureForms from './culture-forms'
import styles from './step_01.module.scss'
import Templates from '../templates'
import { ButtonItem } from '@/components/home/button'
import DownloadPdfIcon from '@/assets/icons/culture/download-icon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DeckProject } from '@/types/deck.type'
import { getSteps, postStep } from '@/services/step.service'
import { StatusStep } from '@/types/step.type'
import { useLanguage } from '@/hooks/use-language'

const Step01 = ({projectId}: any) => {
  const [cultureForms] = useRecoilState(culture_forms)
  const { dict } = useLanguage()

  const CULTURE_TABS = [
    { tab: dict.culture_tab_about, value: 'ABOUT_US' },
    { tab: dict.culture_tab_direction, value: 'DIRECTION' },
    { tab: dict.culture_tab_culture, value: 'CULTURE' },
    { tab: dict.culture_tab_people, value: 'PEOPLE' },
    { tab: dict.culture_tab_others, value: 'OTHERS' }
  ]

  const [tabActive, setTabActive] = useState<string>('ABOUT_US')
  const [, setTab] = useRecoilState(tab)
  const handleCategoryChange = (event: any, newValue: string) => {
    setTab(newValue as any)
    setTabActive(newValue)
  }
  const {
    palette: { home }
  } = useTheme()

  const { data: stepList }: any = useQuery({
    queryKey: [`step-list-advertisement-marketing`, { deckId: 20 }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: { offLoading: true }
  })

  const submitStep = useMutation({
    mutationFn: postStep<any>,
  })

  useEffect(() => {
    if (stepList?.data.length){
      const payload = {
        deckId: 20,
        projectId: projectId,
        stepId: stepList?.data[0]?.id,
        playTime: 0,
        status: StatusStep.FINISHED,
        currentStep: 1,
        deletedStepActivitiesIds: [2, 3],
        data: {
          ...cultureForms
        }
      }
  
      submitStep.mutateAsync(payload)
    }
  }, [cultureForms])

  return (
    <Box py={convertToRem(60)}>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Box textAlign={'right'} marginBottom={'40px'}>
            <ButtonItem
              disableRipple
              sx={{ color: home.blue500, background: home.alpha_blue_10, border: `1px solid ${home.blue500}`, opacity: '50%' }}
              startIcon={<DownloadPdfIcon />}
            >
              {dict.culture_export_pdf_btn}
            </ButtonItem>
          </Box>

          <Tabs
            className={styles.tabscustom}
            onChange={handleCategoryChange}
            style={{
              backgroundColor: home.gray500,
              margin: '0',
              padding: '0',
              height: 'auto',
              minHeight: '40px',
              maxHeight: '40px',
              gap: '12px'
            }}
            value={tabActive}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='inherit'
          >
            {CULTURE_TABS.map((item: any, index: number) => (
              <Tab key={index} value={item.value} label={item.tab} style={{ height: '40px' }} />
            ))}
          </Tabs>
          <Templates />
        </Grid>
        <Grid item xs={4}>
          <CultureForms key={JSON.stringify(cultureForms)} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step01
