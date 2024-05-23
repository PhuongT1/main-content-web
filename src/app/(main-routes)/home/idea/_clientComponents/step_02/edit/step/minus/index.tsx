import MinusIdeaIcon from '@/assets/icons/idea/minus'
import { modeCalculationIdeaSelector } from '@/atoms/home/idea'
import SectionTitle from '@/components/home/section-title'
import TipItem from '@/components/home/tip-item'
import { MAX_IDEAS_COUNT, Method } from '@/constants/idea.constant'
import ErrorMessage from '@/form/ErrorMessage'
import { CaculationModeEnum, TCreateIdea, TItemKeyword } from '@/types/idea.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import ChipIdea from '../../../../_components/chip'
import InputKeyword from '../../../../_components/input-keyword'
import { useHandleKeyWords } from '../../../../use-idea'
import CardIdeaItem, { EmptyCardIdea } from '../../cards-idea/card-item'
import PreviewMinusIdea from '../../preview/minus'
import TextAreaIdea from '../../text-area'
import { useLanguage } from '@/hooks/use-language'

function StepMinus() {
  const { dict } = useLanguage()
  const {
    palette: { sub, home }
  } = useTheme()

  const [currentMode, setActiveMode] = useRecoilState(modeCalculationIdeaSelector)
  const form = useFormContext<TCreateIdea>()
  const { list, handleAddManualIdea, handleClickChip } = useHandleKeyWords({
    name: 'minus.keywords',
    fieldsErrors: ['minus']
  })

  const {
    formState: { errors }
  } = form

  if (currentMode.minus === CaculationModeEnum.PREVIEW) {
    return <PreviewMinusIdea />
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
        <MinusIdeaIcon svgProps={{ width: 48, height: 48 }} pathProps={{ fill: home.gray50 }} />
        <EmptyCardIdea
          title={dict.idea_remove_title}
          subTitle={dict.idea_remove_sub_title}
          content={
            <Stack justifyContent={'center'} maxWidth={444} flexWrap={'wrap'} useFlexGap direction={'row'} gap={'10px'}>
              {list?.map((chip: TItemKeyword) => {
                return (
                  <ChipIdea
                    chipColor={sub.orange500}
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
      <ErrorMessage name='minus.keywords' errors={errors} message={errors?.minus?.keywords?.message} />
      {list.length > 0 && (
        <>
          <Box component={'div'} display={'flex'} gap={'20px'} flexDirection={'column'}>
            <SectionTitle
              mt={remConvert('40px')}
              mb={0}
              title={dict.idea_minus_title}
              subtitle={dict.idea_plus_sub_title}
            />
            <ErrorMessage name='minus.content' errors={errors} message={errors?.minus?.content?.message} />
            <TextAreaIdea name={'minus.content'} method={Method.minus} />
          </Box>
          <TipItem
            containerSx={{
              borderRadius: convertToRem(8),
              padding: '16px 20px'
            }}
            content={dict.idea_minus_tip}
          />
        </>
      )}
    </Box>
  )
}

export default StepMinus
