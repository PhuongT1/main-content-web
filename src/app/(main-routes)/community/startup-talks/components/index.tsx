'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { getCategories } from '@/actions/apis/category.action'
import { userAtom } from '@/atoms/user'
import { PaginationList } from '@/components'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { SUB_CATEGORY } from '@/constants/common.constant'
import AlertPopup from '@/elements/alert-popup'
import CardCommunityStartup from '@/elements/card-community-startup'
import SearchInput from '@/elements/search-input'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import Typography from '@/elements/typography'
import { TextButton } from '@/elements/v2/button'
import Divider from '@/elements/v2/divider'
import { deleteStartupTalkById, getStartupTalkList } from '@/services/startup-talk.service'
import { IStartupTalk } from '@/types/startup-talk.type'
import { Category } from '@/types/types.type'
import { STARTUP_TALK_LIST_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { handlePageFilter } from '@/utils/handle-page-filter'
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import QuestionForm from './QuestionForm'

const CommunityTalents = () => {
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const user = useRecoilValue(userAtom)
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([
    {
      id: '',
      name: '전체'
    }
  ])
  const [listType, setListType] = useState((queryData.get('listType') as string) || STARTUP_TALK_LIST_TYPE[0].value)
  const [showError, setShowError] = useState<boolean>(false)
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const [keyword, setKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [searchKeyword, setSearchKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [categoryId, setCategory] = useState((queryData.get('categoryId') as string) || '')
  const mdUp = useMediaQuery('(min-width: 768px)')
  const xlUp = useMediaQuery('(min-width: 1200px)')
  const {
    data: startupTalkList,
    refetch: refetchStartupTalk,
    isFetching,
    isLoading: isLoadingOutsourceCompanys
  } = useQuery({
    queryKey: ['startup-talks-list', page, categoryId, searchKeyword, listType],
    queryFn: () =>
      getStartupTalkList({
        page: page,
        limit: 16,
        categoryId: !!categoryId ? categoryId : undefined,
        keyword: !!searchKeyword ? searchKeyword : undefined,
        listType: !!listType ? listType : STARTUP_TALK_LIST_TYPE[0].value
      }),
    select: (data) => {
      return data.data
    }
  })

  const { data: startupTalkCategories, status: startupTalkCategoriesStatus } = useQuery({
    queryKey: ['startup-talk-categories'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.STARTUP_TALK })
  })

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== '') {
      newQuery.set('categoryId', newValue)
    } else {
      if (!!newQuery.get('categoryId')) {
        newQuery.delete('categoryId')
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

  const handlePageChange = (newValue: number) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== 1) {
      newQuery.set('page', newValue + '')
    } else {
      if (!!newQuery.get('page')) {
        newQuery.delete('page')
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

  const handleUpdateListType = (type: string) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (type !== STARTUP_TALK_LIST_TYPE[0].value) {
      newQuery.set('listType', type)
    } else {
      newQuery.delete('listType')
    }

    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathName}${query}`)

    // setListType(type);
    // setSearchKeyword('');
    // setKeyword('');
    // setCategoryValue(0);
  }

  const searchStartupTalks = () => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (!!keyword) {
      newQuery.set('searchKeyword', keyword.trim())
      setKeyword(keyword.trim())
    } else {
      if (!!newQuery.get('searchKeyword')) {
        newQuery.delete('searchKeyword')
      }
      setKeyword(keyword.trim())
    }
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathName}${query}`)
    // setSearchKeyword(keyword);
  }

  const { mutate: bookmarkTalkExecute } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async () => {
      await refetchStartupTalk()
    }
  })

  const deleteTalkMutate = useMutation({
    mutationFn: deleteStartupTalkById
  })

  const handleBookmark = async (id: number) => {
    bookmarkTalkExecute({
      id: Number(id),
      type: BOOKMARK_TYPE.STARTUP_TALK
    })
  }

  const handleDelete = async (id: number) => {
    const { data, error } = await deleteTalkMutate.mutateAsync(id)
    if (!error) {
      refetchStartupTalk()
    }
  }

  useEffect(() => {
    handlePageFilter({
      router,
      query: {
        categoryId,
        searchKeyword
      },
      pathName
    })
  }, [categoryId, searchKeyword])

  useEffect(() => {
    const categoryId = queryData.get('categoryId')
    const searchKeyword = queryData.get('searchKeyword')
    const listType = queryData.get('listType')
    const page = queryData.get('page')

    setPage(!!page ? Number(page) : 1)
    setCategory(!!categoryId ? (categoryId as string) : '')
    setListType(!!listType ? listType : 'POPULARY')
    setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setKeyword(!!searchKeyword ? (searchKeyword as string) : '')
  }, [queryData])

  useEffect(() => {
    if (startupTalkCategoriesStatus === 'success') {
      setCategories([
        { id: '', name: '전체' },
        ...startupTalkCategories?.data.map((i: Category) => ({ ...i, id: i.id + '' }))
      ])
    }
  }, [startupTalkCategories])

  return (
    <Box display={'flex'} flexDirection={'column'} width='100%' gap={mdUp ? 6 : 3} mt={mdUp ? 5 : 2}>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Tabs
        value={categoryId}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons
        allowScrollButtonsMobile
        aria-label='scrollable force tabs example'
        sx={{ margin: 0 + ' !important' }}
      >
        {categories.map((i) => (
          <Tab label={i.name} value={i.id + ''} key={i.id} />
        ))}
      </Tabs>
      <Box display={'flex'} flexDirection={'column'} width='100%' gap={3}>
        <Box display={'flex'} alignItems={'center'} gap={1.25}>
          <Typography cate='title_60' textAlign={'center'} color={theme.palette.main_grey.gray50}>
            {startupTalkList?.metaData?.totalRecords || 0}
          </Typography>
          <Typography cate='body_30' textAlign={'center'} color={theme.palette.main_grey.gray50}>
            개의 스타트업 토크가 발견되었습니다.
          </Typography>
        </Box>
        <QuestionForm categories={categories} refetch={refetchStartupTalk} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width='100%' gap={2}>
        <Box
          component='div'
          display={'flex'}
          justifyContent='space-between'
          alignItems={xlUp ? 'center' : 'flex-start'}
          flexDirection={xlUp ? 'row' : 'column'}
        >
          <Stack direction={'row'} gap={3} alignItems={'center'} mb={xlUp ? 0 : 3} width={xlUp ? 'auto' : '100%'}>
            <TextButton
              sx={{ width: 'auto', marginLeft: convertToRem(-8) }}
              onClick={() => {
                handleUpdateListType(STARTUP_TALK_LIST_TYPE[0].value)
              }}
            >
              <Typography
                cate='body_40'
                color={
                  STARTUP_TALK_LIST_TYPE[0].value === listType ? theme.palette.main.point : theme.palette.main.white
                }
              >
                {STARTUP_TALK_LIST_TYPE[0].title}
              </Typography>
            </TextButton>
            <Divider
              orientation='vertical'
              sx={{
                height: convertToRem(14),
                borderColor: theme.palette.main.gray70
              }}
            />
            <TextButton
              sx={{ width: 'auto' }}
              onClick={() => {
                handleUpdateListType(STARTUP_TALK_LIST_TYPE[1].value)
              }}
            >
              <Typography
                cate='body_40'
                color={
                  STARTUP_TALK_LIST_TYPE[1].value === listType ? theme.palette.main.point : theme.palette.main.white
                }
              >
                {STARTUP_TALK_LIST_TYPE[1].title}
              </Typography>
            </TextButton>
            <Divider
              orientation='vertical'
              sx={{
                height: convertToRem(14),
                borderColor: theme.palette.main.gray70
              }}
            />
            <TextButton
              sx={{ width: 'auto' }}
              onClick={() => {
                handleUpdateListType(STARTUP_TALK_LIST_TYPE[2].value)
              }}
            >
              <Typography
                cate='body_40'
                color={
                  STARTUP_TALK_LIST_TYPE[2].value === listType ? theme.palette.main.point : theme.palette.main.white
                }
              >
                {STARTUP_TALK_LIST_TYPE[2].title}
              </Typography>
            </TextButton>
          </Stack>
          <SearchInput
            placeholder='Search'
            value={keyword}
            onRemove={() => {
              let newQuery = new URLSearchParams(Array.from(queryData.entries()))
              newQuery.delete('searchKeyword')
              const search = newQuery.toString()
              const query = search ? `?${search}` : ''
              router.push(`${pathName}${query}`)
            }}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
            fullWidth={xlUp ? false : true}
            onSearch={searchStartupTalks}
          />
        </Box>
      </Box>
      <PaginationList
        itemWidth={696}
        gap={24}
        sx={{ mt: mdUp ? -3 : 0 }}
        responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
        curPage={page}
        totalPage={startupTalkList?.metaData?.totalPages || 0}
        onPageChange={handlePageChange}
        emptyTxt={
          !!searchKeyword
            ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.'
            : `검색된 게시글이 없습니다. 다시 시도해주세요.`
        }
        isEmpty={startupTalkList?.result.length === 0 && !isLoadingOutsourceCompanys && !isFetching}
      >
        {startupTalkList?.result?.map((x: IStartupTalk) => {
          return (
            <CardCommunityStartup
              refetch={refetchStartupTalk}
              key={x.id}
              isOwner={Number(x.userId) === Number(user?.id || -1)}
              onClick={() => {
                router.push(`/community/startup-talks/${x.id}`)
              }}
              {...x}
              onBookmark={() => {
                handleBookmark(x.id)
              }}
              onDelete={() => {
                handleDelete(x.id)
              }}
              // item={i}
            />
          )
        })}
      </PaginationList>
      <AlertPopup
        onSubmit={async () => {
          setShowError(false)
          setErrorMessage('')
          setErrorTitle(undefined)
        }}
        submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
        cancelTitle={errorTitle ? '취소' : undefined}
        onCancel={
          errorTitle
            ? () => {
                setShowError(false)
                setErrorMessage('')
                setErrorTitle(undefined)
              }
            : undefined
        }
        title={errorTitle}
        description={errorMessage}
        open={showError}
      />
    </Box>
  )
}

export default CommunityTalents
