import DirectPlusIcon from '@/assets/icons/idea/direct-plus'
import DivisionIdeaIcon from '@/assets/icons/idea/division'
import { modeCalculationIdeaSelector } from '@/atoms/home/idea'
import SectionTitle from '@/components/home/section-title'
import TipItem from '@/components/home/tip-item'
import { MAX_IDEAS_COUNT, Method } from '@/constants/idea.constant'
import ErrorMessage from '@/form/ErrorMessage'
import { CaculationModeEnum, TCreateIdea, TItemKeyword } from '@/types/idea.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import ChipIdea from '../../../../_components/chip'
import { useHandleKeyWords } from '../../../../use-idea'
import CardIdeaItem, { EmptyCardIdea } from '../../cards-idea/card-item'
import TextAreaIdea from '../../text-area'
import PreviewDivisionIdea from '../../preview/division'
import InputKeyword from '../../../../_components/input-keyword'
import { useLanguage } from '@/hooks/use-language'

function StepDivision() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<TCreateIdea>()
  const {
    formState: { errors }
  } = form

  const currentMode = useRecoilValue(modeCalculationIdeaSelector)

  const { list, handleAddManualIdea, handleClickChip } = useHandleKeyWords({
    name: 'division.keywords',
    fieldsErrors: ['division']
  })

  if (currentMode.division === CaculationModeEnum.PREVIEW) {
    return <PreviewDivisionIdea />
  }
  return (
    <Box width={1} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <Box
        width={1}
        alignItems={'center'}
        component={'div'}
        display={'flex'}
        justifyContent={'space-between'}
        gap={'40px'}
      >
        <CardIdeaItem />
        <DivisionIdeaIcon svgProps={{ width: 48, height: 48 }} lineProps={{ stroke: home.gray50 }} circleProps={{ fill: home.gray50, stroke: home.gray50 }} />
        <EmptyCardIdea
          content={
            <Stack justifyContent={'center'} maxWidth={444} flexWrap={'wrap'} useFlexGap direction={'row'} gap={'10px'}>
              {list?.map((chip: TItemKeyword) => {
                return (
                  <ChipIdea
                    isDashed={false}
                    chipColor={home.mint500}
                    isSelected={chip.isSelected}
                    onClick={() => handleClickChip(chip)}
                    key={chip.id}
                    label={chip.content}
                  />
                )
              })}
              <InputKeyword
                name='manualInput'
                handleAddManualIdea={handleAddManualIdea}
                disabled={list?.length === MAX_IDEAS_COUNT}
              />
            </Stack>
          }
        />
      </Box>

      <ErrorMessage name='division.keywords' errors={errors} message={errors?.division?.keywords?.message} />

      {list?.length > 0 && (
        <>
          <Box component={'div'} display={'flex'} gap={'20px'} flexDirection={'column'}>
            <SectionTitle
              mt={remConvert('40px')}
              mb={0}
              title={dict.idea_divide_title}
              subtitle={dict.idea_plus_sub_title}
            />
            <ErrorMessage name='division.content' errors={errors} message={errors?.division?.content?.message} />
            <TextAreaIdea name={'division.content'} method={Method.division} />
          </Box>
          <TipItem
            containerSx={{
              borderRadius: convertToRem(8),
              padding: '16px 20px'
            }}
            content={dict.idea_divide_tip}
          />
        </>
      )}
    </Box>
  )
}

export default StepDivision
