'use client'
import { useState, SyntheticEvent, useMemo, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Box, Divider, useTheme } from '@mui/material'
import {
  IMarketingStrategiesRequest,
  IFormValuesMarketingStrategies,
  IMarketingStrategiesResponse
} from '@/types/advertisement-marketing.type'
import { getMarketingStrategies, getMarketingStrategiesCategories } from '@/services/advertisement-marketing.service'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { BoxLayout } from '@/components/home/box/box-custom'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import ErrorMessage from '@/form/ErrorMessage'
import CardMarketingStrategiesWrapper from '../../_components/card_strategies_wrapper'

const defaultFilter: IMarketingStrategiesRequest = { page: 1, limit: 20, order: 'ASC' }
type MarketingStrategiesItemProps = {
  form: UseFormReturn<IFormValuesMarketingStrategies>
  indexCard: number
  indexInput: number
  setActiveInput: (index: number) => void
}
function MarketingStrategiesItem({
  form: { watch, setValue, getValues },
  indexCard = 0,
  indexInput = -1,
  setActiveInput
}: MarketingStrategiesItemProps) {
  const {
    palette: { home }
  } = useTheme()
  const [messageAlert, setMessageAlert] = useState('')
  const [tabValueCate, setTabValueCate] = useState<number | undefined>(0)
  const selectedStrategies = watch(`data.${indexCard}.strategies`)?.filter(Boolean)

  const { data: dataStrategiesCategories = [] } = useQuery({
    queryKey: [`data-marketing-strategies-categories`],
    queryFn: () => getMarketingStrategiesCategories(),
    meta: { offLoading: true }
  })

  const {
    hasNextPage,
    fetchNextPage,
    data: dataMarketingStrategies,
    isFetching: isFetchingMarketingStrategies,
    isLoading: isLoadingMarketingStrategies
  } = useInfiniteQuery({
    queryKey: ['data-marketing-strategies', tabValueCate],
    queryFn: ({ pageParam }) =>
      getMarketingStrategies({
        ...defaultFilter,
        categoryId: tabValueCate || undefined,
        page: pageParam?.page || pageParam
      }),
    initialPageParam: defaultFilter,
    getNextPageParam: (lastPage: any) => {
      const { totalPages, currentPage } = lastPage?.metaData || {}
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    meta: { offLoading: true }
  })

  // =============
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageAlert('')
    })
  }, [])

  const dataMarketingStrategiesList = useMemo(() => {
    return dataMarketingStrategies?.pages?.reduce(
      (acc, page) => {
        const newItems = page?.result || []
        return {
          totalRecords: page?.metaData?.totalRecords || acc.totalRecords,
          list: [...acc.list, ...newItems]
        }
      },
      { totalRecords: 0, list: [] }
    )
  }, [dataMarketingStrategies?.pages, tabValueCate])

  const handleChangeTabCate = (_: SyntheticEvent, newValue: number) => {
    setTabValueCate(newValue)
  }

  const handleClickCardItem = (item: IMarketingStrategiesResponse | undefined) => {
    if (!item || !item.id) return
    setActiveInput(-1)
    const setItem = (index: number) => setValue(`data.${indexCard}.strategies.${index}`, item)
    const removeItem = () =>
      setValue(
        `data.${indexCard}.strategies`,
        selectedStrategies?.filter((strategy) => strategy.id !== item.id)
      )

    if (selectedStrategies?.some((strategy) => strategy.id === item.id)) {
      removeItem()
      return
    }
    if (indexInput > -1 && !getValues(`data.${indexCard}.strategies.${indexInput}`)) {
      setItem(indexInput)
      return
    }

    if (selectedStrategies?.length >= 3) {
      setMessageAlert(`마케팅 전략은 목표별 3개씩 선택 가능합니다.`)
      return
    } else setMessageAlert('')
    for (let i = 0; i < 3; i++) {
      if (!getValues(`data.${indexCard}.strategies.${i}`)) {
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
              height: convertToRem(64) + '!important',
              backgroundColor: home.gray300,
              color: home.gray50,
              padding: `${convertToRem(12)} ${convertToRem(24)}`,
              '.MuiButtonBase-root': {
                '&.Mui-selected': { backgroundColor: home.blue500 + '!important' },
                '&:not(.MuiIconButton-root)': { backgroundColor: home.gray200 },
                height: convertToRem(40)
              },
              '.MuiTabs-flexContainer': { gap: convertToRem(12) },
              '.MuiTabs-indicator': { backgroundColor: home.blue500 }
            }}
            variant='scrollable'
            aria-label='scrollable force tabs example'
          >
            {[{ id: 0, name: '전체' }, ...dataStrategiesCategories]?.map(({ id, name }) => {
              return <FillTabItem label={name} value={id} key={id} sx={{ padding: convertToRem('6px 20px') }} />
            })}
          </FilledTabStack>
          <Divider sx={{ my: convertToRem(20), width: '100%', bgcolor: 'main_grey.gray800' }} />

          <CardMarketingStrategiesWrapper
            data={(dataMarketingStrategiesList?.list || []) as IMarketingStrategiesResponse[]}
            handleClickCardItem={handleClickCardItem as any}
            selectedData={selectedStrategies}
            fetchNextPage={!isFetchingMarketingStrategies && hasNextPage ? fetchNextPage : undefined}
            isLoading={isLoadingMarketingStrategies}
          />
        </BoxLayout>

        {messageAlert && (
          <Box component={'div'} sx={{ mt: convertToRem('20px') }}>
            <ErrorMessage message={messageAlert} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default MarketingStrategiesItem
