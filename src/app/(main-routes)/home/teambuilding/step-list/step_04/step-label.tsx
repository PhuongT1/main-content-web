import { Box, useTheme } from '@mui/material'
import { useEffect } from 'react'

import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { Typography } from '@/elements'
import { sendEvent } from '@/utils/events'
import styles from './step_04.module.scss'
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { dataTeamBuildingSelector, getStep, getStepData, statusTabSelector } from '@/atoms/home/teambuilding'
import { useStepApi } from '@/hooks/use-step-api'
import { TrashAlert as AlertDialog } from '@/components/dialog'

import { TeambuldingEnumId } from '..'
import useToggle from '@/hooks/use-toggle'
import { StatusStep } from '@/types/step.type'
import { isEmpty } from '@/utils/object'
import { useLanguage } from '@/hooks/use-language'

const TABS = [
  {
    id: 1,
    title: 'ON'
  },
  {
    id: 2,
    title: 'OFF'
  }
]

function StepLabel() {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  const [toggleAlert, , setToggleAlert] = useToggle()
  const [activeTab, setActiveTab] = useRecoilState(statusTabSelector)
  const completeStep = useRecoilValue(completeStepSelector)
  const [, setTeambuildingData] = useRecoilStateLoadable(dataTeamBuildingSelector)

  const { mCreate } = useStepApi({})

  const step = useRecoilValue(
    getStep({ position: TeambuldingEnumId.StepPosition.Step04, deckId: TeambuldingEnumId.DeckId })
  )

  const { contents: dataStep04Cached } = useRecoilValueLoadable(
    getStepData({ deckId: TeambuldingEnumId.DeckId, position: STEP.STEP_FOUR, stepId: step?.id, projectId: 4 })
  )

  const checkStepFourComplete = completeStep.includes(STEP.STEP_FOUR)

  useEffect(() => {
    if (!isEmpty(dataStep04Cached)) {
      setActiveTab(0)
    }
  }, [dataStep04Cached])

  const onChange = (index: number) => {
    // handle data when clicked OFF
    if (index === 1 && !isEmpty(dataStep04Cached)) {
      setToggleAlert(true)
    } else {
      setActiveTab(index)
    }
  }

  const handleClearData = async () => {
    const data = await mCreate.mutateAsync({
      data: {},
      playTime: 0,
      status: StatusStep.FINISHED,
      projectId: 4,
      deckId: TeambuldingEnumId.DeckId,
      stepId: step.id,
      currentStep: STEP.STEP_FOUR,
      deletedStepActivitiesIds: [],
      fnCallback: () => {
        setActiveTab(1)
        sendEvent(EventNameTBuidlding.RESET_TBUIDLING_ST4, {})
        setToggleAlert(false)
        setTeambuildingData((prev) => ({ ...prev, step04: {} }))
      }
    })
  }

  return (
    <Box lineHeight={1} width={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Box display='flex' justifyContent='start' alignItems='center' gap={'10px'}>
        {dict.organization_chart}
        <Typography component={'span'} color={home.mint500}>
          ({dict.common_options})
        </Typography>
      </Box>
      {!checkStepFourComplete && (
        <Box
          component={'div'}
          className={styles.switch_tabs}
          sx={{
            backgroundColor: home.gray300,
            border: `1px solid ${home.gray200}`,
            color: home.gray100
          }}
        >
          {TABS.map((item, index) => (
            <Box
              onClick={() => onChange(index)}
              component={'span'}
              className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
              sx={{
                backgroundColor: activeTab === index ? home.blue500 : home.gray300,
                color: activeTab === index ? home.gray300 : home.gray100
              }}
              key={item.id}
            >
              {item.title}
            </Box>
          ))}
        </Box>
      )}
      <AlertDialog
        onSubmit={handleClearData}
        description='OFF 상태로 전환하시겠습니까?'
        title='OFF시, 입력된 데이터가 삭제됩니다.'
        open={toggleAlert}
        sxButtonSubmit={{ backgroundColor: home.red500 }}
        onCancel={() => setToggleAlert(false)}
      />
    </Box>
  )
}

export default StepLabel
