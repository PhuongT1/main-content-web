'use client'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import Analyzing from '@/components/home/analyzing'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { QUERY_KEY_ANALYZING } from '@/constants/naming.constant'
import { NamingAnalyzing } from '@/types/naming.type'
import { remConvert } from '@/utils/convert-to-rem'
import { nanum_pen } from '@/utils/font'
import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useRecoilState } from 'recoil'
import { useNamingData } from '../../../hooks/use-naming'
import styles from './view.module.scss'
import { useLanguage } from '@/hooks/use-language'
import SectionTitle from '@/components/home/section-title'
import Divider from '@/elements/divider'
import { useRowTable } from '../card_data'

const Step3View = () => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const { data } = useNamingData<NamingAnalyzing>(STEP.STEP_THREE, QUERY_KEY_ANALYZING)
  const { rowItem } = useRowTable(data?.data?.cardActiveList)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setActiveStep(STEP.STEP_THREE)
  }

  const indexActive = data?.data?.cardActiveList?.findIndex((item) => item.isActive)

  return (
    <Box component={'form'} className={nanum_pen.variable}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px'), borderColor: home.gray200 }} />
      <SectionTitle title={dict?.naming_step_3_analysis_title} />
      <Analyzing
        bgColorColumn={home.gray300}
        textFinalSelected={'최종 선택'}
        isDisable
        rows={rowItem}
        tableAnalyzing={data?.data?.cardActiveList?.map((item) => item.point || []) || []}
        indexActive={data?.data?.cardActiveList?.findIndex((item) => item.isActive)}
        sliderProps={{
          min: 1,
          max: 5,
          step: 1
        }}
      />
      <SectionTitle title={dict?.naming_step_3_final_naming} />
      <Box
        component={'div'}
        sx={{
          backgroundColor: home.gray300
        }}
        className={[styles.content_view, nanum_pen.variable].join(' ')}
      >
        <Box component={'span'} color={home.mint500}>
          “
        </Box>
        <Box component={'span'} className={styles.item_label} color={home.gray0}>
          &nbsp;
          {data?.data?.cardActiveList && data?.data?.cardActiveList[indexActive || 0]?.name}
          &nbsp;
        </Box>
        <Box component={'span'} color={home.blue300} className={styles.item_label}>
          {data?.data?.cardActiveList && data?.data?.cardActiveList[indexActive || 0]?.affectTitle}
        </Box>
        &nbsp;
        <Box component={'span'} color={home.mint500}>
          “
        </Box>
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step3View
