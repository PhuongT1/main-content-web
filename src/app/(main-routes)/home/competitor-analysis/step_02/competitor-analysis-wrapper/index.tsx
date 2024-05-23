'use client'
import { useState, SyntheticEvent, useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Box, Divider, useTheme } from '@mui/material'
import {
  IFormValuesStepTwo,
  ICompetitiveCharacteristicsRequest,
  ICompetitiveCharacteristicsResponse
} from '@/types/competitor-analysis.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { BoxLayout } from '@/components/home/box/box-custom'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import {
  getCompetitiveAnalysisCategory,
  getCompetitiveAnalysisCharacteristics
} from '@/services/competitor-analysis.service'
import ErrorMessage from '@/form/ErrorMessage'
import { MAXLENGTH_INPUT } from '../../_components/utils'
import CardCharacteristicsWrapper from './../../_components/card_characteristics_wrapper'

const defaultFilter: ICompetitiveCharacteristicsRequest = {
  page: 1,
  limit: 20,
  order: 'ASC',
  competitorAnalysisCategoryId: false
}

type CompetitorSelectionProps = {
  form: UseFormReturn<IFormValuesStepTwo>
  indexCard: number
  indexInput: number
  setActiveInput: (index: number) => void
}
function CompetitorSelection({
  form: { watch, setValue, getValues },
  indexCard = 0,
  indexInput = -1,
  setActiveInput
}: CompetitorSelectionProps) {
  const {
    palette: { home }
  } = useTheme()
  const [messageAlert, setMessageAlert] = useState('')
  const [tabValueCate, setTabValueCate] = useState<number>(0)
  const selectedCompetitors = watch(`data.${indexCard}.differentCharacteristics`)?.filter(Boolean)

  const { data: dataCompetitiveAnalysisCate } = useQuery({
    queryKey: [`competitor-analysis-category`],
    queryFn: () => getCompetitiveAnalysisCategory(),
    meta: { offLoading: true }
  })

  const {
    hasNextPage,
    fetchNextPage,
    data: dataCompetitiveAnalysisCharacteristics,
    isFetching: isFetchingCompetitiveAnalysisCharacteristics
  } = useInfiniteQuery({
    queryKey: ['competitor-analysis-characteristics', tabValueCate],
    queryFn: ({ pageParam }) =>
      getCompetitiveAnalysisCharacteristics({
        ...defaultFilter,
        competitorAnalysisCategoryId: tabValueCate as number,
        page: pageParam?.page ?? pageParam
      }),
    initialPageParam: defaultFilter,
    getNextPageParam: (lastPage: any) => {
      const { totalPages, currentPage } = lastPage?.metaData || {}
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    meta: { offLoading: true }
  })

  // =============
  const dataCompetitiveAnalysisCharacteristicsList = useMemo(() => {
    return dataCompetitiveAnalysisCharacteristics?.pages?.reduce(
      (acc, page) => {
        const newItems = page?.result || []
        return {
          totalRecords: page?.metaData?.totalRecords || acc.totalRecords,
          list: [...acc.list, ...newItems]
        }
      },
      { totalRecords: 0, list: [] }
    )
  }, [dataCompetitiveAnalysisCharacteristics?.pages, tabValueCate])

  const handleChangeTabCate = (_: SyntheticEvent, newValue: number) => {
    setTabValueCate(newValue)
  }

  const handleClickCardItem = (item: ICompetitiveCharacteristicsResponse | undefined) => {
    if (!item || !item.id) return
    setActiveInput(-1)

    const setItem = (index: number) => setValue(`data.${indexCard}.differentCharacteristics.${index}`, item)
    const removeItem = () =>
      setValue(
        `data.${indexCard}.differentCharacteristics`,
        selectedCompetitors?.filter((com) => com.id !== item.id)
      )

    if (selectedCompetitors?.some((com) => com.id === item.id)) {
      removeItem()
      return
    }
    if (indexInput > -1 && !getValues(`data.${indexCard}.differentCharacteristics.${indexInput}`)) {
      setItem(indexInput)
      return
    }

    if (selectedCompetitors?.length >= MAXLENGTH_INPUT.SELECTED_CHARACTERISTICS) {
      setMessageAlert(`차별화특성은 ${MAXLENGTH_INPUT.SELECTED_CHARACTERISTICS}개까지 선택 가능합니다.`)
      return
    } else setMessageAlert('')
    for (let i = 0; i < MAXLENGTH_INPUT.SELECTED_CHARACTERISTICS; i++) {
      if (!getValues(`data.${indexCard}.differentCharacteristics.${i}`)) {
        setItem(i)
        break
      }
    }
  }

  // ==============
  return (
    <>
      <Box sx={{ marginTop: convertToRem(20), width: '100%' }}>
        <BoxLayout
          flexDirection={'column'}
          alignItems={'flex-start'}
          sx={{
            backgroundColor: (theme) => theme.palette.home.gray400
          }}
        >
          <FilledTabStack
            value={tabValueCate}
            onChange={handleChangeTabCate}
            sx={{
              width: '100%',
              height: convertToRem(56) + '!important',
              backgroundColor: home.gray300,
              color: home.gray50,
              padding: `${convertToRem(12)} ${convertToRem(24)}`,
              '.MuiButtonBase-root': {
                '&.Mui-selected': { backgroundColor: home.blue500 + '!important' },
                '&:not(.MuiIconButton-root)': { backgroundColor: home.gray200 },
                maxHeight: convertToRem(40)
              },
              '.MuiTabs-flexContainer': { gap: convertToRem(12) },
              '.MuiTabs-indicator': { backgroundColor: home.blue500 }
            }}
            variant='scrollable'
            aria-label='scrollable force tabs example'
          >
            {[{ id: 0, nameKr: '전체' }, ...(dataCompetitiveAnalysisCate || [])].map(({ nameKr, id }) => {
              const activeTab = Boolean(tabValueCate === id)
              const label = `${nameKr} ${
                activeTab ? dataCompetitiveAnalysisCharacteristicsList?.totalRecords || '' : ''
              }`
              return <FillTabItem label={label} value={id} key={id} sx={{ padding: remConvert('6px 20px') }} />
            })}
          </FilledTabStack>
          <Divider sx={{ my: convertToRem(20), width: '100%', bgcolor: 'main_grey.gray800' }} />

          <CardCharacteristicsWrapper
            data={(dataCompetitiveAnalysisCharacteristicsList?.list || []) as ICompetitiveCharacteristicsResponse[]}
            handleClickCardItem={handleClickCardItem as any}
            selectedCompetitors={selectedCompetitors}
            fetchNextPage={
              tabValueCate >= 0 && !isFetchingCompetitiveAnalysisCharacteristics && hasNextPage
                ? fetchNextPage
                : undefined
            }
          />
        </BoxLayout>

        {messageAlert && (
          <Box component={'div'} sx={{ mt: remConvert('20px') }}>
            <ErrorMessage message={messageAlert} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default CompetitorSelection
