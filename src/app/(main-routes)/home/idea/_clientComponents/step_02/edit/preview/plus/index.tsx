import { Box, useTheme } from '@mui/material'

import PlusIdeaIcon from '@/assets/icons/idea/plus'
import { Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { TCreateIdea } from '@/types/idea.type'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import MethodPreview from '../preview'
import { Typography } from '@/elements'
import ErrorMethod from '../error'
import { useMemo } from 'react'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import CardIdeaItem from '../../cards-idea/card-item'

function PreviewPLusIdea() {
  const {
    palette: { home }
  } = useTheme()

  const { watch } = useFormContext<TCreateIdea>()
  const plusData = watch('plus')

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

  const keywords = currentIndustrial?.hashTag?.split(',') ?? []

  return (
    <Box width={1} component={'div'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <MethodPreview
        sectionTitle='더하기'
        icon={<PlusIdeaIcon pathProps={{ fill: home.gray50 }} />}
        method={Method.plus}
        title={
          <Typography color={home.blue500} cate='body_3_semibold'>
            {plusData.industrial.nameKr}
          </Typography>
        }
        description={plusData.content}
        duplicateNode={
          <CardIdeaItem
            data={{
              url: plusData.path,
              keywords,
              description: currentIndustrial?.description ?? ''
            }}
            positionButton='none'
          />
        }
      />
      <ErrorMethod />
    </Box>
  )
}

export default PreviewPLusIdea
