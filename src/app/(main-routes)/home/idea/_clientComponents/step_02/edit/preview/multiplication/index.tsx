import { Box, useTheme } from '@mui/material'

import MultiplicationIdeaIcon from '@/assets/icons/idea/multiplication'
import { Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { TCreateIdea } from '@/types/idea.type'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import MethodPreview from '../preview'
import { Typography } from '@/elements'
import ErrorMethod from '../error'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { useMemo } from 'react'
import CardIdeaItem from '../../cards-idea/card-item'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

function PreviewMultiplicationIdea() {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home, sub }
  } = useTheme()

  const { watch } = useFormContext<TCreateIdea>()
  const multiplicationData = watch('multiplication')

  const { data: dataIndustry } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })

  const currentIndustrial = useMemo(() => {
    return dataIndustry?.find((industry) => industry.nameKr === multiplicationData.industrial?.nameKr!)
  }, [multiplicationData.industrial?.nameKr!, dataIndustry])

  const keywords = (lang === LANG.EN ? currentIndustrial?.hashTagEn : currentIndustrial?.hashTag)?.split(',') ?? []

  return (
    <Box width={1} component={'div'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <MethodPreview
        icon={<MultiplicationIdeaIcon />}
        method={Method.multiplication}
        title={
          <Typography color={home.yellow} cate='body_3_semibold'>
            {multiplicationData?.industrial ? getValueLanguage(multiplicationData.industrial) : ''}
          </Typography>
        }
        description={multiplicationData.content}
        sectionTitle={dict.common_multiply}
        duplicateNode={
          <CardIdeaItem
            data={{
              url: multiplicationData.path,
              keywords,
              description: (getValueLanguage(currentIndustrial, 'description') as string) || ''
            }}
            positionButton='none'
          />
        }
      />
      <ErrorMethod />
    </Box>
  )
}

export default PreviewMultiplicationIdea
