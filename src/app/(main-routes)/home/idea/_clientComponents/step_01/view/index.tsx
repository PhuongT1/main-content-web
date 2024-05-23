import { EditButton } from '@/components/home/button'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Divider, Stack, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import { useIdeaData } from '../../use-idea'
import { STEP } from '@/constants/common.constant'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { useRecoilState } from 'recoil'
import { TIdiaFormValues } from '@/types/idea.type'
import useToggle from '@/hooks/use-toggle'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import ChipIdea from '../../_components/chip'
import ImageItem from '@/components/home/image'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { Typography } from '@/elements'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { useLanguage } from '@/hooks/use-language'

function Step_01_View() {
  const {
    palette: { home }
  } = useTheme()
  const { dict, lang, getValueLanguage } = useLanguage()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_ONE)
  }

  const { data: idea } = useIdeaData<TIdiaFormValues>(STEP.STEP_ONE, QUERY_KEY_IDEA.IDEA)
  const { data: dataIndustry, isLoading } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })

  const currentIndustrial = useMemo(() => {
    return dataIndustry?.find((industry) => industry.nameKr === idea?.data?.industrial?.nameKr)
  }, [idea?.data?.industrial?.nameKr, dataIndustry])

  return (
    <Box component={'div'} width={1}>
      <Divider
        flexItem
        sx={{ mb: remConvert('40px'), mt: remConvert('22px'), bgcolor: home.gray200, borderColor: home.gray200 }}
      />
      <Typography mb={remConvert('40px')} cate='title_60' color={home.gray50}>
        {dict.my_idea}
      </Typography>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          padding: convertToRem(20),
          borderRadius: '10px',
          gap: convertToRem(30),
          backgroundColor: home.gray300
        }}
      >
        <Box
          component={'div'}
          sx={{
            width: convertToRem(280),
            height: convertToRem(140),
            borderRadius: convertToRem(10),
            flexShrink: 0
          }}
        >
          <ImageItem
            alt='user'
            isLoading={isLoading}
            src={idea?.data?.path ?? ''}
            quality={100}
            width={280}
            height={140}
          />
        </Box>
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: remConvert('20px')
          }}
        >
          <Typography
            cate='subtitle_1'
            sx={{
              fontWeight: 600,
              lineHeight: 1,
              color: home.gray50
            }}
          >
            {currentIndustrial ? getValueLanguage(currentIndustrial) : ''}
          </Typography>
          <Typography
            cate='subtitle_1'
            sx={{
              fontWeight: 600,
              lineHeight: '150%',
              color: home.gray50
            }}
          >
            {idea?.data?.writeIdeas?.idea}
          </Typography>
          <Stack flexWrap={'wrap'} direction={'row'} gap={remConvert('10px')}>
            {idea?.data?.writeIdeas?.ideas?.map((chip: any) => (
              <ChipIdea key={chip.id} label={getValueLanguage(chip, 'content')} />
            ))}
          </Stack>
        </Box>
      </Box>
      <DeleteDeck
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={handleRemoveCompleteStep}
        submitTxt={dict.common_deck_yes}
      />
      <Stack
        display={'flex'}
        justifyContent={'center'}
        mt={remConvert('40px')}
        textAlign={'center'}
        flexDirection={'row'}
      >
        <EditButton onClick={toggleShowDialog} />
      </Stack>
    </Box>
  )
}

export default Step_01_View
