import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { TCreateIdea } from '@/types/idea.type'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import MethodPreview from '../view'
import CardIdeaItem from '../../edit/cards-idea/card-item'
import PlusIdeaIcon from '@/assets/icons/idea/plus'
import { Typography } from '@/elements'
import { useTheme } from '@mui/material'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

function PlusView() {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { getValues } = useFormContext<TCreateIdea>()

  const plusData = getValues('plus')

  const { data: dataIndustry } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })

  const currentIndustrial = useMemo(() => {
    return dataIndustry?.find((industry) => industry.nameKr === plusData.industrial?.nameKr!!)
  }, [plusData.industrial?.nameKr!!, dataIndustry])

  const keywords = (lang === LANG.EN ? currentIndustrial?.hashTagEn : currentIndustrial?.hashTag)?.split(',') ?? []

  return (
    <MethodPreview
      duplicateNode={
        <CardIdeaItem
          data={{
            url: plusData.path,
            keywords,
            description: (getValueLanguage(currentIndustrial, 'description') as string) || ''
          }}
          positionButton='none'
        />
      }
      icon={<PlusIdeaIcon pathProps={{ fill: home.gray50 }} />}
      title={
        <Typography color={home.blue500} cate='body_3_semibold'>
          {plusData?.industrial ? getValueLanguage(plusData.industrial) : ''}
        </Typography>
      }
      sectionTitle={dict.common_plus}
      description={plusData.content}
    />
  )
}

export default PlusView
