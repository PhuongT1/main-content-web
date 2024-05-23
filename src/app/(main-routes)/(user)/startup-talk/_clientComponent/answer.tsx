'use client'
import { userAtom } from '@/atoms/user'
import { PaginationList, SortTabStack } from '@/components'
import CardAnswer from '@/components/cards/card-answer'
import { CATEGORY } from '@/constants/common.constant'
import { Typography } from '@/elements'
import { deleteStartupTalkCommentById, getStartUpTalkCommentList } from '@/services/startup-talk-my-page.service'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { Box, useMediaQuery } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const DATA_SORT = [
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

const Answer = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    listType: DATA_SORT[0].value
  })
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const user = useRecoilValue(userAtom) as any
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery('(max-width: 600px)')

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['startup-talk-answer', searchParams, queryData, user],
    queryFn: () =>
      getStartUpTalkCommentList({
        listType: searchParams.listType,
        userId: user?.id,
        type: CATEGORY.STARTUP_TALK,
        page: searchParams.page,
        limit: 16
      })
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

  const deleteStartupTalkAction = useMutation({
    mutationFn: deleteStartupTalkCommentById,
    onSuccess: (res: any) => {
      const { data, error } = res || {}
      if (error) {
        throw error
      } else if (data) {
        queryClient.invalidateQueries({ queryKey: ['startup-talk-answer'] })
      }
    },
    onError: (err: any) => {
      enqueueSnackbar(err.message, {
        variant: 'error'
      })
      console.error(err)
    }
  })

  const handleDeleteStartupTalkById = (id: number) => {
    deleteStartupTalkAction.mutateAsync(id)
  }

  useEffect(() => {
    setSearchParams((p: any) => ({
      ...p,
      listType: queryData.get('listType') || DATA_SORT[0].value,
      page: parseInt(queryData.get('page') || '1')
    }))
  }, [queryData])

  const { metaData, result } = data?.data || {}

  return (
    <Box>
      <Typography cate={isMobile ? 'title_50' : 'title_70'} plainColor='main.grayf7'>
        나의 답변
      </Typography>
      <Box my={3}>
        <SortTabStack
          data={DATA_SORT}
          value={searchParams.listType}
          handleChange={(_e, value: string) => {
            handleChange(value, 'listType')
          }}
        />
      </Box>
      {!result?.length && !isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isMobile ? 200 : 300 }}>
          <Typography cate={isMobile ? 'body_20' : 'body_40'} plainColor='main.gray30'>
            작성한 답변이 없습니다.
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
            const { createdAt, startupTalk, comment, id } = item || {}
            return (
              <CardAnswer
                key={index}
                title={startupTalk?.category?.name}
                subTitle={startupTalk?.title}
                content={startupTalk?.content}
                dateText={displayTimeDiff(startupTalk?.createdAt) || ''}
                likeCount={startupTalk?.totalView}
                handleDelete={() => handleDeleteStartupTalkById(id)}
                avatar={startupTalk?.user?.avatar?.url || '/images/blank-user.png'}
                dateAnswer={displayTimeDiff(createdAt) || ''}
                name={startupTalk?.user?.nickname}
                subContent={comment}
                url={`${baseUrl}/community/startup-talks/${startupTalk?.id}`}
                handleEdit={() => router.push(`/community/startup-talks/${startupTalk?.id}`)}
                onClickCard={() => router.push(`/community/startup-talks/${startupTalk?.id}`)}
              />
            )
          })}
        </PaginationList>
      )}
    </Box>
  )
}

export default Answer
