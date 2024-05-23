'use client'
import { Box, Divider, Grid, MenuItem, Stack, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import SelectItem from '@/form/select'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import InputItem from '@/form/input'
import SearchIcon from '@/assets/icons/search'
import React, { memo, useEffect, useState } from 'react'
import CardMultiple from '../../../../_components/card-multiple'
import {
  ChildCategory,
  NamingLocation,
  NamingTab,
  Namingkeyword,
  SearchTab,
  TabCategory,
  TabProp
} from '@/types/naming.type'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getChildCategory, getNamingData, getParentCategory } from '@/services/naming.service'
import { PARENT_CATEGORY } from '@/constants/naming.constant'
import Loading from '@/elements/loading'
import { useLanguage } from '@/hooks/use-language'

const LocationTab = ({ type, index, fieldArray, placeholder, overQuantity }: TabProp) => {
  const { dict, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [cardList, setCardList] = useState<NamingTab[]>([])
  const [paramSearch, setParamSearch] = useState<ChildCategory>({ type })
  const [locationSearch, setLocationSearch] = useState<SearchTab>({
    page: 1,
    limit: 10,
    type: PARENT_CATEGORY[type],
    order: 'DESC'
  })

  const { control, watch } = useFormContext<Namingkeyword>()
  const parentCategoryId = watch(`tabSearch.${index}.parentCategoryId`)
  const childCategoryId = watch(`tabSearch.${index}.childCategoryId`)
  const keyword = watch(`tabSearch.${index}.keyword`)

  const { fields, append, remove } = fieldArray

  const { data: parentList } = useQuery({
    queryKey: [`naming-category`, type],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, TabCategory] }) => getParentCategory(param),
    enabled: !!type,
    meta: {
      offLoading: true
    }
  })

  const { data } = useQuery({
    queryKey: ['location-child-category', paramSearch],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, ChildCategory] }) => getChildCategory(param),
    meta: {
      offLoading: true
    }
  })

  const {
    fetchNextPage,
    isFetching,
    hasNextPage,
    data: dataTab
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [`category-tab-list-${type}`, locationSearch],
    queryFn: ({ pageParam }) =>
      getNamingData({
        ...locationSearch,
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
    enabled: !!locationSearch.parentCategoryId && !!locationSearch.childCategoryId,
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    if (!dataTab) return
    const page = dataTab.pages
    const commentsDataRes: NamingTab[] = []
    page.forEach((page) =>
      page?.data.result?.forEach((x) => {
        commentsDataRes.push(x)
      })
    )
    setCardList(commentsDataRes)
  }, [dataTab])

  useEffect(() => {
    if (parentCategoryId) {
      setParamSearch({ type, parentCategoryId })
    }
  }, [parentCategoryId])

  useEffect(() => {
    if (!parentCategoryId) return
    const timeOut = setTimeout(() => {
      setLocationSearch({ ...locationSearch, parentCategoryId, childCategoryId, keyword })
    }, 300)

    return () => {
      clearTimeout(timeOut)
    }
  }, [parentCategoryId, childCategoryId, keyword])

  return (
    <Box>
      <Box component={'div'}>
        <Stack direction={{ md: 'row', sm: 'column' }} gap={3}>
          <Grid container display='flex' gap={3} justifyContent={'space-between'}>
            <Grid item gap={convertToRem(12)} display={'flex'}>
              <SelectItem
                textFieldProps={{ placeholder: placeholder && placeholder[0] }}
                control={control}
                name={`tabSearch.${index}.parentCategoryId`}
                sxBox={{ width: remConvert('200px') }}
              >
                {parentList?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {getValueLanguage(item, 'name')}
                  </MenuItem>
                ))}
              </SelectItem>
              <SelectItem
                sxBox={{ width: remConvert('200px') }}
                textFieldProps={{ placeholder: placeholder && placeholder[1] }}
                control={control}
                name={`tabSearch.${index}.childCategoryId`}
              >
                {data?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {getValueLanguage(item, 'name')}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>

            <Grid>
              <InputItem
                control={control}
                name={`tabSearch.${index}.keyword`}
                maxLength={20}
                textFieldProps={{
                  placeholder: dict.naming_step_1_search_placeholder,
                  InputProps: {
                    startAdornment: <SearchIcon pathProps={{ stroke: home.gray100 }} />
                  }
                }}
              ></InputItem>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Divider sx={{ margin: remConvert('20px -24px'), borderColor: home.gray200 }} />
      <Loading isLoading={isFetching}>
        <CardMultiple
          indexKr='nameKr'
          indexEn='nameEn'
          dataList={cardList}
          cardActiveList={fields}
          maxSelected={10}
          overQuantity={() => overQuantity && overQuantity()}
          onRemoveCard={(index) => remove(index)}
          onAddCard={(card) => append(card)}
          fetchNextPage={() => {
            hasNextPage && fetchNextPage()
          }}
        />
      </Loading>
    </Box>
  )
}

export default LocationTab
