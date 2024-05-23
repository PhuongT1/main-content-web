'use client'
import { Box, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { useEffect, useState } from 'react'
import CardMultiple from '../../../../_components/card-multiple'
import { useInfiniteQuery } from '@tanstack/react-query'
import Loading from '@/elements/loading'
import { getBrandData } from '@/services/customer.service'
import { CustomerPurchasing, LiftStyle, SearchPurchasing } from '@/types/customer-service.type'
import Divider from '@/elements/divider'
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form'

export interface BrandTabProps {
  type: string
  fieldArray: UseFieldArrayReturn<CustomerPurchasing, 'selectedItem'>
  overQuantity: () => void
}

const BrandTab = ({ type, fieldArray, overQuantity }: BrandTabProps) => {
  const [cardList, setCardList] = useState<LiftStyle[]>([])
  const [brandSearch, setBrandSearch] = useState<SearchPurchasing>({
    page: 1,
    limit: 25,
    type,
    order: 'DESC'
  })

  const {
    palette: { home }
  } = useTheme()

  const { watch, setValue } = useFormContext<CustomerPurchasing>()
  const name = watch('name')

  const { fields, append, remove } = fieldArray

  const {
    fetchNextPage,
    isFetching,
    hasNextPage,
    data: dataTab
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [`category-tab-list-${type}`, brandSearch],
    queryFn: ({ pageParam }) =>
      getBrandData({
        ...brandSearch,
        page: pageParam
      }),
    getNextPageParam: (dataReponse) => {
      if (!dataReponse) return
      const {
        data: {
          metaData: { currentPage, lastPage, nextPage }
        }
      } = dataReponse

      return currentPage < lastPage ? nextPage : undefined
    },
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    if (!dataTab) return
    const page = dataTab.pages
    const data: LiftStyle[] = []
    page.forEach((page) =>
      page?.data.result?.forEach((x) => {
        data.push(x)
      })
    )
    setCardList(data)
    setValue('lengthItemTab', data.length)
  }, [dataTab])

  useEffect(() => {
    const searchInput = setTimeout(() => {
      setBrandSearch((pre) => ({ ...pre, name }))
    }, 300)

    return () => clearTimeout(searchInput)
  }, [name])

  return (
    <Box>
      <Divider customStyle={{ backgroundColor: home.gray200, margin: remConvert('20px 0') }} />
      <Loading isLoading={isFetching}>
        <CardMultiple
          dataList={cardList}
          cardActiveList={fields}
          maxSelected={5}
          isHiddenIconDelete
          overQuantity={() => overQuantity && overQuantity()}
          onRemoveCard={(index) => remove(index)}
          onAddCard={(card) => append(card)}
          fetchNextPage={() => hasNextPage && fetchNextPage()}
        />
      </Loading>
    </Box>
  )
}

export default BrandTab
