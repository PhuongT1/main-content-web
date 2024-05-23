'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { getCategories } from '@/actions/apis/category.action'
import { Banner, PaginationList } from '@/components'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { SUB_CATEGORY } from '@/constants/common.constant'
import AlertPopup from '@/elements/alert-popup'
import CardCommunityOutsourceCompany from '@/elements/card-community-outsource-company'
import SearchInput from '@/elements/search-input'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import Typography from '@/elements/typography'
import { getOutsourceCompanyList } from '@/services/outsource-company.service'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { IOutsourceCompany } from '@/types/outsource-company.type'
import { Category } from '@/types/types.type'
import { CircularProgress, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const OutsourceCompany = () => {
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([{ id: '', name: '전체' }])
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()

  const [keyword, setKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [searchKeyword, setSearchKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [category, setCategory] = useState((queryData.get('category') as string) || '')
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const [outsourceCompanysData, setOutsourceCompanysData] = useState<IOutsourceCompany[]>([])
  const mdUp = useMediaQuery('(min-width: 768px)')
  const smDown = useMediaQuery('(max-width: 576px)')
  const { ref, inView } = useInView()
  const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== '') {
      newQuery.set('category', newValue)
    } else {
      if (!!newQuery.get('category')) {
        newQuery.delete('category')
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

  const {
    data: outsourceCompanysList,
    refetch: refetchOutsourceCompany,
    isFetching,
    isLoading: isLoadingOutsourceCompanys
  } = useQuery({
    queryKey: ['outsourceCompanys-list', page, category, searchKeyword],
    queryFn: () =>
      getOutsourceCompanyList({
        page: page,
        limit: 16,
        category: !!category ? category : undefined,
        keyword: !!searchKeyword ? searchKeyword : undefined,
        keySearch: !!searchKeyword ? 'nameAndShortIntroduction' : undefined
      })
  })
  const resData = outsourceCompanysList?.data || null

  const searchOutsourceCompanys = () => {
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
    // setSearchKeyword(keyword)
  }

  const { data: outsourcingCategories, status: outsourcingCategoriesStatus } = useQuery({
    queryKey: ['outsourcing-categories'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.OUTSOURCING })
  })

  const outsourceCompanyBookmarkMutate = useMutation({
    mutationFn: updateBookmark
  })

  const handleBookmark = async (id: number) => {
    const { data, error } = await outsourceCompanyBookmarkMutate.mutateAsync({
      id: Number(id),
      type: BOOKMARK_TYPE.OUTSOURCING_COMPANY
    })
    if (!error) {
      await refetchOutsourceCompany()
    }
  }

  useEffect(() => {
    const category = queryData.get('category')
    const searchKeyword = queryData.get('searchKeyword')
    const page = queryData.get('page')

    setCategory(!!category ? (category as string) : '')
    setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  useEffect(() => {
    if (outsourcingCategoriesStatus === 'success') {
      setCategories([
        { id: '', name: '전체' },
        ...outsourcingCategories?.data.map((i: Category) => ({ ...i, id: i.id + '' }))
      ])
    }
  }, [outsourcingCategories])

  return (
    <Stack gap={3}>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate={mdUp ? 'large_title' : 'title_60'} mt={4.5} mb={3}>
        공식 외주기업
      </Typography>
      <Banner type={BANNER_TYPE.COMPANY} subType={BANNER_SUBTYPE.COMPANY_TOP} />
      <Stack>
        <Stack
          justifyContent='flex-end'
          alignItems={{ md: 'center', sm: 'flex-start' }}
          flexDirection={{ md: 'row', sm: 'column' }}
          mb={{ md: 3, sm: 0 }}
        >
          <SearchInput
            placeholder='Search'
            fullWidth={!mdUp}
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
            onSearch={searchOutsourceCompanys}
          />
        </Stack>
        <Tabs
          value={category}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          sx={{ margin: 0 }}
          allowScrollButtonsMobile
          aria-label='scrollable force tabs example'
        >
          {categories.map((i) => (
            <Tab label={i.name} value={i.id} key={i.id} />
          ))}
        </Tabs>
      </Stack>
      <Stack direction={'row'} alignItems='center' gap={1.25} mb={3}>
        <Typography cate='title_3_bold'>{resData?.metaData?.totalRecords}</Typography>
        <Typography cate='body_3'>개의 외주 기업을 발견했습니다.</Typography>
      </Stack>
      <PaginationList
        itemWidth={336}
        gap={24}
        responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
        curPage={page}
        totalPage={resData?.metaData?.totalPages || 0}
        onPageChange={handlePageChange}
        emptyTxt={!!searchKeyword ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.' : `등록된 외주기업이 없습니다.`}
        isEmpty={resData?.result.length === 0 && !isLoadingOutsourceCompanys && !isFetching}
      >
        {resData?.result?.map((x: IOutsourceCompany, index: number) => {
          return (
            <CardCommunityOutsourceCompany
              key={index}
              {...x}
              onClick={() => {
                router.push('/community/outsource-companies/' + x.id)
              }}
              onBookmark={() => {
                handleBookmark(x.id || 0)
              }}
            />
          )
        })}
      </PaginationList>
      {isFetching && (
        <Stack width='100%' justifyContent={'center'} ref={ref}>
          <CircularProgress color='primary' />
        </Stack>
      )}
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
    </Stack>
  )
}

export default OutsourceCompany
