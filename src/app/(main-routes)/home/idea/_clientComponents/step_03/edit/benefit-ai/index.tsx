import EmptyAI from '@/components/home/empty-ai'
import SectionTitle from '@/components/home/section-title'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BenefitList from './benefit-list'
import { useMutation } from '@tanstack/react-query'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { BenifitAITitleEnum, QueryWriteIdeaAI, TWriteIdea } from '@/types/idea.type'
import { getWriteIdeaViaAI } from '@/services/idea.service'
import { useLanguage } from '@/hooks/use-language'

const BenefitAI = () => {
  const { dict, lang } = useLanguage()
  const { control, watch } = useFormContext<TWriteIdea>()

  const [loading, setLoading] = useState<boolean>(false)

  const { append, fields } = useFieldArray<TWriteIdea>({
    control,
    name: 'benefit'
  })

  const selectedMethod = watch('selectedMethod')

  const { mutateAsync } = useMutation({
    mutationKey: ['openai-write-idea_fetch', selectedMethod, dict],
    meta: { offLoading: true },

    mutationFn: (filter: QueryWriteIdeaAI) => getWriteIdeaViaAI(filter),
    onSuccess(data, variables, context) {
      if (!data) return

      const defaulTitle = [
        {
          en: 'Economic Aspect',
          kr: '경제적 측면'
        },
        {
          en: 'Brand Aspect',
          kr: '브랜드 측면'
        },
        {
          en: 'Competitor Aspect',
          kr: '경쟁사 측면'
        }
      ]
      const newData = data.map((item, index) => {
        return { title: defaulTitle?.[index]?.kr, titleEn: defaulTitle?.[index]?.en, content: item.content.kr, contentEn: item.content.en }
      })
      append(newData)
    }
  })

  const onMutation = async () => {
    if (!selectedMethod.type) return
    setLoading(true)
    await mutateAsync({ finalIdeas: [selectedMethod.description] })
    setLoading(false)
  }

  return (
    <Box width={1} component={'div'}>
      <SectionTitle title={dict.idea_expectation_title} subtitle={dict.idea_expectation_sub_title} />
      {fields.length === 0 ? (
        <EmptyAI
          disabledButton={!selectedMethod.type}
          isLoading={loading}
          onCreateData={onMutation}
          title={dict.naming_step_1_tab_schumpeterAI}
          description={dict.idea_expectation_empty_ai_sub_title}
        />
      ) : (
        <BenefitList />
      )}
    </Box>
  )
}

export default BenefitAI
