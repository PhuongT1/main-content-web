'use client'

import { getBlogList } from '@/actions/apis/blogs.action'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { getCategories } from '@/actions/apis/category.action'
import { loadingAtom } from '@/atoms/loading'
import { Pagination } from '@/components'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { ResponsiveList } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import { CardSlide } from '@/elements/card-course'
import SearchInput from '@/elements/search-input'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import Typography from '@/elements/typography'
import { TextButton } from '@/elements/v2/button'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { IBlog } from '@/types/blog.type'
import { Category } from '@/types/types.type'
import { BLOG_LIST_TYPE, BLOG_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { createFormData } from '@/utils/object'
import { Box, CircularProgress, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import CourseSlide from '../_components/CourseDropdown'

const ContentBlogs = () => {
  // const breadcrumbData = [{ name: '콘텐츠 블로그' }]
  /* Theme section */
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const smDown = useMediaQuery('(max-width: 576px)')

  /* Next hook*/
  const router = useRouter()
  const queryData = useSearchParams()
  const path = usePathname()

  /* State hook*/
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)

  const [videoDataFirst, setVideoDataFirst] = useState<IBlog[]>([])
  const [videoDataSecond, setVideoDataSecond] = useState<IBlog[]>([])
  const [newsData, setNewsData] = useState<IBlog[]>([])

  /* Recoil */
  const setLoading = useSetRecoilState(loadingAtom)

  /* Search params hook */
  const [keyword, setKeyword] = useState(queryData.get('searchKeyword') || '')
  const [searchKeyword, setSearchKeyword] = useState(queryData.get('searchKeyword') || '')
  const [categoryValue, setCategoryValue] = useState(Number(queryData.get('categoryValue')) || 0)
  const [listTypeValue, setListType] = useState(queryData.get('listTypeValue') || BLOG_LIST_TYPE[0].value)
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)

  const handleCategoryChange = (event: SyntheticEvent, newValue: number) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== 0) {
      newQuery.set('categoryValue', newValue.toString())
    } else {
      if (!!newQuery.get('categoryValue')) {
        newQuery.delete('categoryValue')
      }
    }
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${path}${query}`)
  }

  const handleUpdateListType = (type: string) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (type !== BLOG_LIST_TYPE[0].value) {
      newQuery.set('listTypeValue', type)
    } else {
      newQuery.delete('listTypeValue')
    }
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${path}${query}`)
  }

  const { data: blogCategories, status: blogCategoriesStatus } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.CONTENT }),
    select(data) {
      return [{ id: 0, name: '전체' } as Category, ...data.data]
    },
    meta: {
      offLoading: true
    }
  })

  const {
    data: blogsList,
    refetch: refetchBlog,
    isFetching: isFetchingBlogs,
    status: blogQueryStatus
  } = useQuery({
    queryKey: ['blogs-list', { page, searchKeyword, categoryValue, listTypeValue }],
    queryFn: () =>
      getBlogList({
        page: page,
        limit: 16,
        categoryId: categoryValue !== 0 ? categoryValue : undefined,
        listType: listTypeValue,
        keyword: !!searchKeyword ? searchKeyword : undefined,
        type: BLOG_TYPE.VIDEO
      }),
    meta: {
      offLoading: true
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      return data.data
    }
  })

  useEffect(() => {
    if (!isFetchingBlogs && blogQueryStatus === 'success' && blogsList) {
      const result = blogsList.result
      let videoData: IBlog[] = []

      if (result && result.length > 0) {
        result.forEach((val) => {
          videoData.push(val)
        })
      }

      const videoFirstData = videoData.length > 8 ? videoData.slice(0, 8) : videoData
      const videoSecondData = videoData.length > 8 ? videoData.slice(8) : []

      setVideoDataFirst(videoFirstData)
      setVideoDataSecond(videoSecondData)
    }
  }, [isFetchingBlogs, blogsList, blogQueryStatus])

  const {
    data: newsList,
    refetch: refetchNews,
    isFetching: isFetchingNews,
    isFetchingNextPage: isFetchingNextPageNews,
    hasNextPage: newsHasNextPage,
    fetchNextPage: newsFetchNextPage
  } = useInfiniteScroll({
    key: 'news-list',
    depend: [searchKeyword, categoryValue, listTypeValue],
    fn: (pageParam: any) =>
      getBlogList({
        page: pageParam.page,
        limit: 16,
        categoryId: pageParam.categoryId,
        listType: pageParam.listType,
        keyword: pageParam.keyword,
        type: pageParam.type
      }),
    meta: {
      offLoading: true
    },
    initialPageParam: {
      page: 1,
      categoryId: categoryValue !== 0 ? categoryValue : undefined,
      listType: listTypeValue,
      keyword: !!searchKeyword ? searchKeyword : undefined,
      type: BLOG_TYPE.CARD_NEWS
    },

    onSuccess: (data) => {
      const page = data.pages as any[]
      let newsData: IBlog[] = []

      page.forEach((page: any) => {
        page?.data?.result?.forEach((x: IBlog) => {
          newsData.push(x)
        })
      })

      setNewsData(newsData)
    }
  })

  const searchBlogs = () => {
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

    router.push(`${path}${query}`)
  }

  const { mutate: videoBookmark } = useMutation({
    mutationFn: updateBookmark,
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: async () => {
      await refetchBlog()
      setLoading(false)
    }
  })

  const { mutate: cardNewsBookmark } = useMutation({
    mutationFn: updateBookmark,
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: async () => {
      await refetchNews()
      setLoading(false)
    }
  })

  const handleCardNewsBookmark = (id: number) => {
    cardNewsBookmark({ id, type: BOOKMARK_TYPE.CONTENT_BLOG })
  }

  const handlePageChange = (page: number) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (!!page) {
      newQuery.set('page', page.toString())
      setPage(page)
    } else {
      if (!!newQuery.get('page')) {
        newQuery.delete('page')
      }
      setPage(1)
    }
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${path}${query}`)
  }

  /* useEffect section */
  useEffect(() => {
    const categoryValue = queryData.get('categoryValue')
    const searchKeyword = queryData.get('searchKeyword')
    const listTypeValue = queryData.get('listTypeValue')
    const page = queryData.get('page')

    setCategoryValue(!!categoryValue ? Number(categoryValue) : 0)
    setSearchKeyword(!!searchKeyword ? searchKeyword : '')
    setKeyword(!!searchKeyword ? searchKeyword : '')
    setListType(!!listTypeValue ? listTypeValue : BLOG_LIST_TYPE[0].value)
    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  return (
    <>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Stack
        direction={mdUp ? 'row' : 'column'}
        justifyContent='space-between'
        alignItems={mdUp ? 'center' : 'flex-start'}
      >
        <Stack direction={'row'} gap={3} alignItems={'center'} mt={mdUp ? 0 : 4} mb={mdUp ? 0 : 4}>
          <TextButton
            sx={{ width: 'auto', marginLeft: convertToRem(-8) }}
            onClick={() => {
              handleUpdateListType(BLOG_LIST_TYPE[0].value)
            }}
          >
            <Typography
              cate='body_40'
              color={BLOG_LIST_TYPE[0].value === listTypeValue ? theme.palette.main.point : theme.palette.main.white}
            >
              {BLOG_LIST_TYPE[0].title}
            </Typography>
          </TextButton>
          <Divider
            orientation='vertical'
            sx={{
              height: convertToRem(14),
              borderColor: theme.palette.main_grey.gray700
            }}
          />
          <TextButton
            sx={{ width: 'auto' }}
            onClick={() => {
              handleUpdateListType(BLOG_LIST_TYPE[1].value)
            }}
          >
            <Typography
              cate='body_40'
              color={BLOG_LIST_TYPE[1].value === listTypeValue ? theme.palette.main.point : theme.palette.main.white}
            >
              {BLOG_LIST_TYPE[1].title}
            </Typography>
          </TextButton>
        </Stack>
        <SearchInput
          placeholder='Search'
          fullWidth={!mdUp}
          value={keyword}
          onRemove={() => {
            let newQuery = new URLSearchParams(Array.from(queryData.entries()))
            newQuery.delete('searchKeyword')
            const search = newQuery.toString()
            const query = search ? `?${search}` : ''
            router.push(`${path}${query}`)
          }}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          onSearch={searchBlogs}
        />
      </Stack>
      <Tabs value={categoryValue} onChange={handleCategoryChange} variant='scrollable'>
        {blogCategories?.map((item) => (
          <Tab key={item.id} value={item.id} label={item.name} />
        ))}
      </Tabs>
      <Stack gap={3}>
        {isFetchingBlogs ? (
          <Stack direction={'row'} justifyContent={'center'}>
            <CircularProgress color={'primary'} />
          </Stack>
        ) : videoDataFirst.length === 0 && videoDataSecond.length === 0 ? (
          <Stack direction={'row'} justifyContent={'center'} width={'100%'} my={8}>
            <Typography cate='body_3' textAlign={'center'} color={theme.palette.main_grey.gray300}>
              {searchKeyword === '' && categoryValue !== 0
                ? '등록된 콘텐츠가 없습니다.'
                : '검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.'}
            </Typography>
          </Stack>
        ) : (
          // <Grid container spacing={3} justifyContent={smDown ? 'center' : 'flex-start'}>
          //   {videoDataFirst?.map((x: any, index: number) => {
          //     return (
          //       <Grid item key={index} xs={12} md={6} lg={4} xl={3}>

          //       </Grid>
          //     )
          //   })}
          // </Grid>
          <ResponsiveList minGap={[264, 24]} minBreakpoints={{ md: [320, 24] }}>
            {videoDataFirst?.map((x: any, index: number) => {
              return (
                <CardSlide
                  key={`slide-1-${index}`}
                  item={x}
                  onClick={() => {
                    router.push('/blogs/' + x.id)
                  }}
                  onBookmark={() => {
                    videoBookmark({ id: x.id, type: BOOKMARK_TYPE.CONTENT_BLOG })
                  }}
                />
              )
            })}
          </ResponsiveList>
        )}
        {newsData.length > 0 ? (
          <CourseSlide
            data={newsData}
            handleBookmark={handleCardNewsBookmark}
            hasNextPage={newsHasNextPage}
            fetchNextPage={newsFetchNextPage}
            isFetchingNextPage={isFetchingNextPageNews}
          />
        ) : null}
        {videoDataSecond.length > 0 ? (
          <Grid container spacing={3} justifyContent={smDown ? 'center' : 'flex-start'}>
            {videoDataSecond?.map((x: any, index: number) => {
              return (
                <Grid item key={index} xs={12} md={6} lg={4} xl={3}>
                  <CardSlide
                    item={x}
                    onClick={() => {
                      router.push('/blogs/' + x.id)
                    }}
                    onBookmark={() => {
                      videoBookmark({ id: x.id, type: BOOKMARK_TYPE.CONTENT_BLOG })
                    }}
                  />
                </Grid>
              )
            })}
          </Grid>
        ) : null}
        {blogsList && blogsList.metaData?.totalRecords > 16 ? (
          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <Pagination
              page={page}
              count={blogsList.metaData.totalPages}
              nextPage={blogsList.metaData.nextPage}
              action={(page) => handlePageChange(page)}
            />
          </Box>
        ) : null}
      </Stack>
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
    </>
  )
}

export default ContentBlogs
