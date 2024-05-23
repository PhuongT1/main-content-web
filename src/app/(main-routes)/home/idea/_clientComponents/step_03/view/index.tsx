import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { Box, Divider, Grid, Stack, useTheme } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useIdeaData } from '../../use-idea'
import { TWriteIdea } from '@/types/idea.type'
import { Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { DivisionCard, MinusCard, MultiplicationCard, PlusCard } from '../components/method'
import { remConvert } from '@/utils/convert-to-rem'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { Typography } from '@/elements'
import CardItem from '@/components/home/card-item'
import ProgressBarItem from '@/components/home/progress-bar'
import { useLanguage } from '@/hooks/use-language'

const Step_03_View = () => {
  const { dict, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)

  const { data } = useIdeaData<TWriteIdea>(STEP.STEP_THREE, QUERY_KEY_IDEA.WRITE_IDEA)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setActiveStep(STEP.STEP_THREE)
  }

  const renderCardMethod = () => {
    switch (data?.data?.selectedMethod?.type) {
      case Method.plus:
        return <PlusCard isEditView={false} />
      case Method.minus:
        return <MinusCard isEditView={false} />
      case Method.multiplication:
        return <MultiplicationCard isEditView={false} />
      case Method.division:
        return <DivisionCard isEditView={false} />
      default:
        return
    }
  }

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} gap={'40px'}>
      <Divider flexItem sx={{ mt: remConvert('24px'), bgcolor: home.gray200, borderColor: home.gray200 }} />
      <Box component={'div'} width={1}>
        <Typography mb={remConvert('20px')} cate='title_60' color={home.gray50}>
          {dict.idea_final}
        </Typography>
        {renderCardMethod()}
      </Box>
      <Box>
        <Typography mb={remConvert('20px')} cate='title_60' color={home.gray50}>
          {dict.idea_expectation_title}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} gap={remConvert('20px')}>
          <Grid container spacing={'20px'}>
            {data?.data?.benefit?.map((benefit) => (
              <Grid key={benefit.title} item xs={12} lg={4}>
                <CardItem
                  sxCard={{
                    minHeight: remConvert('200px'),
                    maxHeight: remConvert('200px'),
                    backgroundColor: home.gray300,
                    borderRadius: '10px'
                  }}
                  sxCardAction={{
                    minHeight: remConvert('200px'),
                    maxHeight: remConvert('200px'),
                    height: '100%',
                    backgroundColor: home.gray300,
                    '&.MuiButtonBase-root:hover': {
                      backgroundColor: 'inherit'
                    }
                  }}
                  sxContent={{
                    backgroundColor: home.gray300
                  }}
                  cardItem={{
                    title: (
                      <Box component={'div'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography noWrap cate='title_50' color={home.gray50}>
                          {getValueLanguage(benefit, 'title')}
                        </Typography>
                      </Box>
                    ),
                    subTitle: (
                      <TooltipTitle
                        sxBox={{
                          color: home.gray100,
                          WebkitLineClamp: 9,
                          lineHeight: '150%',
                          wordBreak: 'break-word',
                          fontSize: remConvert('16px'),
                          fontWeight: 600
                        }}
                        title={getValueLanguage(benefit, 'content')}
                      />
                    )
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Stack display={'flex'} justifyContent={'center'} mt={'40px'} textAlign={'center'} flexDirection={'row'}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_03_View
