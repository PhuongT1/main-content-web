import PlusIdeaIcon from '@/assets/icons/idea/plus'
import { modeCalculationIdeaSelector } from '@/atoms/home/idea'
import SectionTitle from '@/components/home/section-title'
import TipItem from '@/components/home/tip-item'
import { Method } from '@/constants/idea.constant'
import ErrorMessage from '@/form/ErrorMessage'
import { CaculationModeEnum, TCreateIdea } from '@/types/idea.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { useIndustrialField } from '../../../../use-idea'
import CardIdeaItem, { CardIdeaItemClone, EmptyCardIdea } from '../../cards-idea/card-item'
import TabList from '../../tabs'
import TextAreaIdea from '../../text-area'
import PreviewPLusIdea from '../../preview/plus'
import { useLanguage } from '@/hooks/use-language'

function StepPLus() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const {
    formState: { errors }
  } = useFormContext<TCreateIdea>()

  const { filterFourIdea } = useIndustrialField()

  const currentMode = useRecoilValue(modeCalculationIdeaSelector)

  if (currentMode.plus === CaculationModeEnum.PREVIEW) {
    return <PreviewPLusIdea />
  }

  return (
    <Box width={1} component={'div'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <TabList namePath={'plus.path'} name={'plus.industrial'} />
      <Box
        width={1}
        alignItems={'center'}
        component={'div'}
        display={'flex'}
        justifyContent={'space-between'}
        gap={'40px'}
        sx={{
          borderRadius: remConvert('10px')
        }}
      >
        <CardIdeaItem />
        <PlusIdeaIcon svgProps={{ width: 48, height: 48 }} pathProps={{ fill: home.gray50 }} />
        {filterFourIdea.industrialField ? (
          <CardIdeaItemClone name={'plus.path'} />
        ) : (
          <EmptyCardIdea title={dict.idea_empty_industry_card_title} subTitle={dict.idea_empty_industry_card_sub_title} />
        )}
      </Box>
      {filterFourIdea.industrialField ? (
        <>
          {/* <LogisticDistribution name='plus.path' /> */}
          <SectionTitle
            mb={0}
            mt={remConvert('40px')}
            title={dict.idea_plus_title}
            subtitle={dict.idea_plus_sub_title}
          />
          <Box component={'div'} display={'flex'} gap={'20px'} flexDirection={'column'}>
            {errors.plus?.content ? <ErrorMessage message={dict.idea_required} /> : null}
            <TextAreaIdea name={'plus.content'} method={Method.plus} />
          </Box>
          <TipItem
            containerSx={{
              borderRadius: convertToRem(8),
              padding: '16px 20px'
            }}
            content={dict.idea_plus_tip}
          />
        </>
      ) : null}
    </Box>
  )
}

export default StepPLus
