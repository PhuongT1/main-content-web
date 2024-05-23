'use client'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

import styles from './idea-keyword.module.scss'
import SectionTitle from '@/components/home/section-title'
import { useFormContext, useWatch } from 'react-hook-form'
import IdeaKeyWordList from './idea-keyword-list'
import { useQuery } from '@tanstack/react-query'
import { getIdeaViaAI } from '@/services/idea.service'
import { QueryIdeaAI, TIdiaFormValues } from '@/types/idea.type'
import { filterFourIdeaSelector } from '@/atoms/home/idea'
import { useRecoilValue } from 'recoil'
import EmptyAI from '@/components/home/empty-ai'
import { useLanguage } from '@/hooks/use-language'

const LIMIT_ITEM_EACH_CALL = 10

function IdeaKeyword() {
  const { dict } = useLanguage()
  const { control, setValue } = useFormContext<TIdiaFormValues>()

  const ideas = useWatch({ control, name: 'writeIdeas.idea' })
  const dataAIForm = useWatch({ control, name: 'writeIdeas.ideasDataAI' })
  const targetCustomer = useWatch({ control, name: 'writeIdeas.target_customer' })
  const productServiceName = useWatch({ control, name: 'writeIdeas.service_name' })
  const solution = useWatch({ control, name: 'writeIdeas.resolution' })
  const inconvenienceElements = useWatch({ control, name: 'writeIdeas.inconvenience_factor' })

  const filterFourIdea = useRecoilValue(filterFourIdeaSelector)

  const isNotAllowCallAPI =
    !ideas ||
    !filterFourIdea.industrialField ||
    !solution ||
    !productServiceName ||
    !inconvenienceElements ||
    !targetCustomer

  const [filter, setFilter] = useState<QueryIdeaAI>()

  useEffect(() => {
    if (isNotAllowCallAPI) return

    const timeOut = setTimeout(() => {
      setFilter({
        ideas,
        targetCustomer,
        solution,
        inconvenienceElements,
        productServiceName,
        industrialField: filterFourIdea.industrialField
      })
    }, 300)

    return () => clearTimeout(timeOut)
  }, [targetCustomer, productServiceName, solution, inconvenienceElements, ideas])

  const { data, isRefetching, isFetching, refetch } = useQuery({
    queryKey: ['openai-idea-step01', filter],
    queryFn: () => getIdeaViaAI(filter as QueryIdeaAI),
    staleTime: 0,
    meta: {
      offLoading: true
    },
    enabled: false
  })

  useEffect(() => {
    if (data && data?.data.length > 0) {
      const newListTmp = [...dataAIForm]

      const newDataAI = data?.data[1].kr
      newDataAI.forEach((k: string, index) => {
        const isCheckCanAddNewData =
          !newListTmp.some((x) => x.id === k) && newListTmp.length - dataAIForm.length <= LIMIT_ITEM_EACH_CALL - 1
        if (isCheckCanAddNewData) {
          newListTmp.push({ id: k, content: k, contentEn: data?.data[0]?.en[index] })
        }
      })
      
      setValue('writeIdeas.ideasDataAI', newListTmp)
    }
  }, [data])

  if (isNotAllowCallAPI && dataAIForm.length === 0) return null

  return (
    <Box component={'div'} className={styles.container}>
      <SectionTitle
        mb={'20px'}
        title={dict.idea_keyword_title}
        subtitle={dict.idea_keyword_sub_title}
      />
      {dataAIForm.length === 0 ? (
        <EmptyAI
          title={dict.idea_empty_ai_title}
          description={dict.idea_empty_ai_sub_title}
          isLoading={isFetching}
          onCreateData={refetch}
        />
      ) : (
        <IdeaKeyWordList isLoadMore={isNotAllowCallAPI} isLoading={isRefetching} onLoadMore={refetch} />
      )}
    </Box>
  )
}

export default IdeaKeyword
