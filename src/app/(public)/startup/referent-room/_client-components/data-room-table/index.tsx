'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { getCategories } from '@/actions/apis/category.action'
import { getReferenceRoomList } from '@/actions/apis/startup-toolkit.action'
import DataRoomCard from '@/components/cards/data-room.card'
import Pagination from '@/components/pagination'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { ResponsiveList, Typography } from '@/elements'
import { Category } from '@/types/types.type'
import { Box, CircularProgress, Stack } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FilterBar from '../../_components/filter-bar'
import TotalContent from '../../_components/total-content'

enum SORT_TYPE {
  POPULARY = 'POPULARY',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST'
}

export enum CONTENT_TYPE {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

const DataRoomTable = () => {
  const path = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const keywordQuery = searchParams.get('keyword') || ''
  const categoryQuery = Number(searchParams.get('categoryId')) || 0
  const listTypeQuery = (searchParams.get('listType') as SORT_TYPE) || SORT_TYPE.POPULARY
  const pageQuery = Number(searchParams.get('page')) || 1
  const typeQuery = (searchParams.get('type') as CONTENT_TYPE) || null

  const [keyword, setKeyword] = useState<string>(keywordQuery)
  const [categoryValue, setCategoryValue] = useState<number>(categoryQuery)
  const [listType, setListType] = useState<SORT_TYPE>(listTypeQuery)
  const [page, setPage] = useState<number>(pageQuery)
  const [type, setType] = useState<CONTENT_TYPE | null>(typeQuery)

  const { data: referenceCate, isFetching: cateFetching } = useQuery({
    queryKey: ['reference-category'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.REFERENCE_ROOM }),
    select(data) {
      return { data: [{ id: 0, name: '전체' } as Category, ...data.data] }
    },
    meta: {
      offLoading: true
    }
  })

  const {
    data: referenceList,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['reference-room-list', page, categoryValue, keyword, listType, type],
    queryFn: async () =>
      await getReferenceRoomList({
        page,
        limit: 12,
        categoryId: categoryValue > 0 ? categoryValue : null,
        listType: listType,
        keyword: !!keyword ? keyword : null,
        type
      }),
    placeholderData: keepPreviousData,
    meta: {
      offLoading: true
    }
  })

  const referenceRoomBookmarkMutate = useMutation({
    mutationFn: updateBookmark
  })

  const bookmarkAction = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async () => {
      await refetch()
    }
  })

  const handleBookmark = (id: number) => {
    bookmarkAction.mutate({
      id: Number(id),
      type: BOOKMARK_TYPE.REFERENCE_ROOM
    })
  }

  const referenceDetail = (id: number) => {
    router.push(`${path}/${id}`)
  }

  useEffect(() => {
    const categoryValue = searchParams.get('categoryId')
    const keyword = searchParams.get('keyword')
    const listTypeValue = searchParams.get('listType')
    const page = searchParams.get('page')
    const type = searchParams.get('type')

    setCategoryValue(!!categoryValue ? Number(categoryValue) : 0)
    setKeyword(!!keyword ? keyword : '')
    setListType(!!listTypeValue ? (listTypeValue as SORT_TYPE) : SORT_TYPE.POPULARY)
    setPage(!!page ? Number(page) : 1)
    setType(!!type ? (type as CONTENT_TYPE) : null)
  }, [searchParams])

  return (
    <Stack gap={{ md: 6, sm: 3 }}>
      {referenceCate && referenceCate.data && !cateFetching ? (
        <FilterBar sort={listType} seletedCate={categoryValue} cate={referenceCate?.data} keyword={keyword} />
      ) : null}
      <Stack gap={3}>
        {referenceList?.data && referenceList?.data.metaData ? (
          <TotalContent count={referenceList?.data.metaData.totalRecords} />
        ) : null}
        {referenceList && referenceList.data?.result && !isFetching ? (
          <Box>
            {referenceList.data?.result.length > 0 ? (
              <ResponsiveList minGap={[332, 29]} minBreakpoints={{ md: [390, 16] }}>
                {referenceList?.data.result.map((i, idx) => (
                  <DataRoomCard
                    key={idx}
                    item={i}
                    onClick={() => referenceDetail(i.id)}
                    onBookmark={() => {
                      handleBookmark(i.id || 0)
                    }}
                  />
                ))}
              </ResponsiveList>
            ) : (
              <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
                <Typography>등록된 자료가 없습니다.</Typography>
              </Stack>
            )}
            {referenceList.data?.metaData && referenceList.data?.metaData.totalPages > 1 ? (
              <Pagination
                sx={{ mt: 6 }}
                count={referenceList.data?.metaData.totalPages}
                action={(page) => {
                  setPage(page)
                }}
              />
            ) : null}
          </Box>
        ) : (
          <Stack direction={'row'} justifyContent={'center'}>
            <CircularProgress color='primary' />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default DataRoomTable
