import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIdeaData } from '../../../use-idea'
import { TCreateIdea, TIdiaFormValues } from '@/types/idea.type'
import { LANG, STEP } from '@/constants/common.constant'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import MethodPreview from '../view'
import CardIdeaItem from '../../edit/cards-idea/card-item'
import { Typography } from '@/elements'
import { useTheme } from '@mui/material'
import MultiplicationIdeaIcon from '@/assets/icons/idea/multiplication'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { useLanguage } from '@/hooks/use-language'

function MultiplicationView() {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { getValues } = useFormContext<TCreateIdea>()

  const multiplicationData = getValues('multiplication')

  const { data: dataIndustry } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })

  const currentIndustrial = useMemo(() => {
    return dataIndustry?.find((industry) => industry.nameKr === multiplicationData.industrial?.nameKr!)
  }, [multiplicationData?.industrial?.nameKr!, dataIndustry])

  const keywords = (lang === LANG.EN ? currentIndustrial?.hashTagEn : currentIndustrial?.hashTag)?.split(',') ?? []

  return (
    <MethodPreview
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
      icon={<MultiplicationIdeaIcon />}
      title={
        <Typography color={home.yellow} cate='body_3_semibold'>
          {multiplicationData?.industrial ? getValueLanguage(multiplicationData.industrial) : ''}
        </Typography>
      }
      sectionTitle={dict.common_multiply}
      description={multiplicationData.content}
    />
  )
}

export default MultiplicationView
