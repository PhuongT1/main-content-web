import { Typography } from '@/elements'
import { Box, Divider, Stack, useTheme } from '@mui/material'

import { EditButton } from '@/components/home/button'
import { Method } from '@/constants/idea.constant'
import { TCreateIdea } from '@/types/idea.type'
import { useFormContext } from 'react-hook-form'
import DivisionView from './components/division'
import MinusView from './components/minus'
import MultiplicationView from './components/multiplication'
import PlusView from './components/plus'
import styles from './view.module.scss'
import { useRecoilState } from 'recoil'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import { mapOrder } from '../../use-idea'
import { Fragment } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'

const list = [
  {
    key: Method.plus,
    component: <PlusView />
  },
  {
    key: Method.minus,
    component: <MinusView />
  },
  {
    key: Method.multiplication,
    component: <MultiplicationView />
  },
  {
    key: Method.division,
    component: <DivisionView />
  }
]

function Step_02_View() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { getValues } = useFormContext<TCreateIdea>()

  const completedList = getValues('completed')

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setActiveStep(STEP.STEP_TWO)
  }

  const orderedMethodList = mapOrder(completedList, ['plus', 'minus', 'multiplication', 'division'])
  return (
    <Box component={'div'} className={styles.container}>
      <Divider
        flexItem
        sx={{
          mt: remConvert('22px'),
          mb: remConvert('18px'),
          bgcolor: home.gray200,
          borderColor: home.gray200
        }}
      />
      <Typography cate='title_3_semibold' lineHeight={1} color={home.gray50}>
        {dict.idea_thinking}
      </Typography>
      {orderedMethodList.map((key) => {
        const component = list.find((item) => item.key === key)
        return <Fragment key={key}>{component?.component}</Fragment> ?? null
      })}

      <Stack display={'flex'} justifyContent={'center'} mt={'40px'} textAlign={'center'} flexDirection={'row'}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} submitTxt={dict.common_deck_yes} />
    </Box>
  )
}

export default Step_02_View
