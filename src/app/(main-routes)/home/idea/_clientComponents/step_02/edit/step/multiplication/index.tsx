import MultiplicationIdeaIcon from '@/assets/icons/idea/multiplication'
import { modeCalculationIdeaSelector } from '@/atoms/home/idea'
import SectionTitle from '@/components/home/section-title'
import TipItem from '@/components/home/tip-item'
import { Method } from '@/constants/idea.constant'
import ErrorMessage from '@/form/ErrorMessage'
import { CaculationModeEnum, TCreateIdea } from '@/types/idea.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { useIndustrialField } from '../../../../use-idea'
import CardIdeaItem, { CardIdeaItemClone, EmptyCardIdea } from '../../cards-idea/card-item'
import TabList from '../../tabs'
import TextAreaIdea from '../../text-area'
import PreviewMultiplicationIdea from '../../preview/multiplication'
import { useLanguage } from '@/hooks/use-language'

function StepMultiplication() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const {
    formState: { errors }
  } = useFormContext<TCreateIdea>()

  const [currentMode, setActiveMode] = useRecoilState(modeCalculationIdeaSelector)

  const { filterFourIdea } = useIndustrialField()

  if (currentMode.multiplication === CaculationModeEnum.PREVIEW) {
    return <PreviewMultiplicationIdea />
  }

  return (
    <Box width={1} component={'div'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <TabList namePath={'multiplication.path'} name={'multiplication.industrial'} />
      <Box
        width={1}
        alignItems={'center'}
        component={'div'}
        display={'flex'}
        justifyContent={'space-between'}
        gap={'40px'}
      >
        <CardIdeaItem />
        <MultiplicationIdeaIcon svgProps={{ width: 48, height: 48 }} pathProps={{ fill: home.gray50 }} />
        {filterFourIdea.industrialField ? (
          <CardIdeaItemClone name={'multiplication.path'} />
        ) : (
          <EmptyCardIdea title={dict.idea_empty_industry_card_title} subTitle={dict.idea_empty_industry_card_sub_title} />
        )}
      </Box>
      {filterFourIdea.industrialField ? (
        <>
          {/* <LogisticDistribution name={'multiplication.path'} /> */}
          <Box component={'div'} display={'flex'} gap={'20px'} flexDirection={'column'}>
            <SectionTitle
              mb={0}
              mt={remConvert('40px')}
              title={dict.idea_multiply_title}
              subtitle={dict.idea_plus_sub_title}
            />
            {errors.multiplication?.content ? <ErrorMessage message={dict.idea_required} /> : null}

            <TextAreaIdea name={'multiplication.content'} method={Method.multiplication} />
          </Box>
          <TipItem
            containerSx={{
              borderRadius: convertToRem(8),
              padding: '16px 20px'
            }}
            content={dict.idea_multiply_tip}
          />
        </>
      ) : null}
    </Box>
  )
}

export default StepMultiplication
