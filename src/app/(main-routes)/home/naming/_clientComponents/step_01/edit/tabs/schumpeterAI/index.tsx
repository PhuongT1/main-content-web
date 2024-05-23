import { Typography } from '@/elements'
import { Box, Stack, useTheme } from '@mui/material'
import { CreateButton, MoreButton } from '@/components/home/button'
import { getOpenAI } from '@/services/naming.service'
import { NamingTab, Namingkeyword, OpenAISearch, SchumpeterAIProps } from '@/types/naming.type'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import CardMultiple from '../../../../_components/card-multiple'
import { useState, useEffect } from 'react'
import styles from './schumpeterAI.module.scss'
import LoadingAI from '@/elements/loadingAI'
import { remConvert } from '@/utils/convert-to-rem'
import { useGetValue } from '@home/naming/hooks/use-naming'

const SchumpeterAI = ({ fieldArray, overQuantity }: SchumpeterAIProps) => {
  const {
    palette: { home }
  } = useTheme()
  const {
    useLang: { dict },
    getValueConcept
  } = useGetValue()

  const [search, setSearch] = useState<OpenAISearch>()
  const { watch, setValue } = useFormContext<Namingkeyword>()
  const industry = watch('industry')
  const idea = watch('idea')
  const concept = watch('concept')
  const dataAI = watch('dataAI')

  const { fields, append, remove } = fieldArray

  const isAllowCallAPI = () => {
    return !industry || !idea || !getValueConcept(concept)?.title
  }

  useEffect(() => {
    if (isAllowCallAPI()) return

    const timeOut = setTimeout(() => {
      const conceptTitle = getValueConcept(concept)
      setSearch({ industry, idea, concept: [conceptTitle.title, conceptTitle.subTitle].join(' ') })
    }, 300)

    return () => clearTimeout(timeOut)
  }, [industry, idea, concept])

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['openai-keyword', search],
    queryFn: ({ queryKey: [, param] }) => getOpenAI(param as OpenAISearch),
    meta: {
      offLoading: true
    },
    enabled: false
  })

  useEffect(() => {
    if (data && data.length > 0) {
      setValue('dataAI', [...(dataAI || []), ...(data || [])])
    }
  }, [data])

  return (
    <LoadingAI isLoading={isFetching}>
      {!data && (
        <Box className={styles.layer_box}>
          <Typography className={styles.title}>{dict.naming_step_2_AI_title}</Typography>
          <Typography className={styles.sub_title} sx={{ color: home.gray100 }}>
            {dict.naming_step_2_AI_sub_title}
          </Typography>
          <CreateButton disabled={isAllowCallAPI()} onClick={() => refetch()} />
        </Box>
      )}
      {data && (
        <Box>
          <CardMultiple
            indexKr='kr'
            height={374}
            indexEn='en'
            maxSelected={10}
            dataList={dataAI}
            cardActiveList={fields}
            onRemoveCard={(index) => remove(index)}
            onAddCard={(card) => append(card)}
            overQuantity={() => overQuantity && overQuantity()}
          />
          <Stack width={'100%'} textAlign={'center'} display={'inline-block'} paddingTop={remConvert('20px')}>
            <MoreButton
              disabled={dataAI && dataAI.length > 120 ? true : false}
              svgComponentProps={{
                pathProps: {
                  stroke: dataAI && dataAI.length > 120 ? home.gray200 : home.gray50
                }
              }}
              onClick={() => refetch()}
            />
          </Stack>
        </Box>
      )}
    </LoadingAI>
  )
}

export default SchumpeterAI
