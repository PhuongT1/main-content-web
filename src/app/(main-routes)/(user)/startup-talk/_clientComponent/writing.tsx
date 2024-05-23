'use client'
import { userAtom } from '@/atoms/user'
import { CardWriting, PaginationList, SortTabStack } from '@/components'
import { FilledTabStack, FillTabItem } from '@/components/tabs'
import { CATEGORY } from '@/constants/common.constant'
import { Typography } from '@/elements'
import { deleteStartupTalkById, getStartUpTalkActiveList } from '@/services/startup-talk-my-page.service'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { Box, useMediaQuery } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getActiveCategories } from '@/actions/apis/category.action'

const DATA_SORT = [
  { label: '인기순', value: 'POPULARY' },
  { label: '최신순', value: 'NEWEST' },
  { label: '오래된순', value: 'OLDEST' }
]

const baseUrl =
  typeof window !== 'undefined'
    ? window?.location?.protocol +
      '//' +
      window?.location?.hostname +
      (window?.location?.port ? ':' + window?.location?.port : '')
    : ''

const Writing = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    listType: DATA_SORT[0].value,
    categoryId: 0
  })
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const user = useRecoilValue(userAtom) as any
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery('(max-width: 600px)')

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories', user],
    queryFn: () => getActiveCategories({ type: CATEGORY.STARTUP_TALK, userId: user?.id })
  })

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['startup-talk-writing', queryData, searchParams, user],
    queryFn: () =>
      getStartUpTalkActiveList({
        categoryId: searchParams.categoryId,
        listType: searchParams.listType,
        userId: user?.id,
        page: searchParams.page,
        limit: 16
      })
  })

  const { metaData, result } = data?.data || {}

  const deleteStartupTalkAction = useMutation({
    mutationFn: deleteStartupTalkById,
    onSuccess: async (res: any) => {
      const { data, error } = res || {}
      if (error) {
        throw error
      } else if (data) {
        await queryClient.invalidateQueries({ queryKey: ['startup-talk-writing'] })
      }
    },
    onError: (err: any) => {
      enqueueSnackbar(err.message, {
        variant: 'error'
      })
      console.error(err)
    }
  })

  const handleChange = (newValue: number | string, key: string) => {
    if (key !== 'page') {
      setSearchParams((p) => ({ ...p, [key]: newValue, page: 1 }))
    }
    setSearchParams((p) => ({ ...p, [key]: newValue }))
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue) {
      key !== 'page' && newQuery.set('page', '1')
      newQuery.set(key, newValue + '')
    } else {
      newQuery.delete(key)
    }

    router.push(`${pathName}?${newQuery}`)
  }

  const categoriesMap = useMemo(() => {
    const mapData =
      categories?.data?.map((x: any) => ({
        label: `${x?.name} ${x?.totalItems}`,
        value: x?.id
      })) || []
    const allCount = categories?.data?.reduce((a: any, p: any) => a + p?.totalItems, 0)
    return [{ label: `전체 ${allCount}`, value: '' }, ...mapData]
  }, [categories])

  const handleDeleteStartupTalkById = (id: number) => {
    deleteStartupTalkAction.mutateAsync(id)
  }

  useEffect(() => {
    setSearchParams((p: any) => ({
      ...p,
      listType: queryData.get('listType') || DATA_SORT[0].value,
      categoryId: parseInt(queryData.get('categoryId') || '0') || categoriesMap?.[0]?.value,
      page: parseInt(queryData.get('page') || '1')
    }))
  }, [categories, queryData])

  return (
    <Box>
      <Typography cate={isMobile ? 'title_50' : 'title_70'} plainColor='main.grayf7'>
        나의 작성 글
      </Typography>
      <Box my={3}>
        <SortTabStack
          data={DATA_SORT}
          value={searchParams.listType}
          handleChange={(_e, value: string) => handleChange(value, 'listType')}
        />
      </Box>
      {!isLoadingCategories && (
        <Box mb={isMobile ? 3 : 6}>
          <FilledTabStack
            value={searchParams.categoryId}
            onChange={(_e, tab) => handleChange(tab, 'categoryId')}
            variant='scrollable'
            aria-label='scrollable force tabs example'
          >
            {categoriesMap?.map((item: any) => (
              <FillTabItem key={item.value} value={item.value} label={item.label} />
            ))}
          </FilledTabStack>
        </Box>
      )}
      {!result?.length && !isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isMobile ? 200 : 300 }}>
          <Typography cate={isMobile ? 'body_20' : 'body_40'} plainColor='main.gray30'>
            작성한 글이 없습니다.
          </Typography>
        </Box>
      ) : (
        <PaginationList
          itemWidth={696}
          gap={24}
          responsiveListProps={{ minBreakpoints: { md: [292, 24] } }}
          curPage={searchParams.page}
          totalPage={metaData?.totalPages}
          onPageChange={(page) => handleChange(page, 'page')}
          emptyTxt='신청한 모집 공고가 없습니다.'
        >
          {result?.map((item: any, index: number) => {
            const { category, title, content, createdAt, totalView, id } = item || {}
            return (
              <CardWriting
                key={index}
                title={category?.name}
                subTitle={title}
                content={content}
                dateText={displayTimeDiff(createdAt) || ''}
                likeCount={totalView}
                handleDelete={() => handleDeleteStartupTalkById(id)}
                handleEdit={() => router.push(`/community/startup-talks/${id}`)}
                url={`${baseUrl}/community/startup-talks/${id}`}
                onClickCard={() => router.push(`/community/startup-talks/${id}`)}
              />
            )
          })}
        </PaginationList>
      )}
    </Box>
  )
}

export default Writing
