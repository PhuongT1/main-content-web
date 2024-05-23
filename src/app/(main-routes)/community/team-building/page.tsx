'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { getCategories } from '@/actions/apis/category.action'
import { loadingAtom } from '@/atoms/loading'
import { userAtom } from '@/atoms/user'
import { Banner, PaginationList } from '@/components'
import { InfoAlert } from '@/components/dialog'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { SUB_CATEGORY } from '@/constants/common.constant'
import Button from '@/elements/button'
import CardCommunityTeamBuilding from '@/elements/card-community-team-building'
import SearchInput from '@/elements/search-input'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import Typography from '@/elements/typography'
import { getTeamBuildingList } from '@/services/team-building.service'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { ITeamBuilding } from '@/types/team-building.type'
import { Category } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const TeamBuilding = () => {
  const theme = useTheme()
  const setLoading = useSetRecoilState(loadingAtom)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([{ id: '', name: '전체' }])
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()

  const user = useRecoilValue(userAtom)
  const [keyword, setKeyword] = useState<string>((queryData?.get('searchKeyword') as string) || '')
  const [searchKeyword, setSearchKeyword] = useState<string>((queryData?.get('searchKeyword') as string) || '')
  const [page, setPage] = useState(Number(queryData?.get('page')) || 1)
  const [category, setCategory] = useState((queryData?.get('category') as string) || '')
  const mdUp = useMediaQuery('(min-width: 768px)')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    let newQuery = new URLSearchParams(Array.from<any>(queryData?.entries() as any))
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
    let newQuery = new URLSearchParams(Array.from<any>(queryData?.entries() as any))
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
    data: teamBuildingsList,
    refetch: refetchTeamBuilding,
    isFetching,
    isLoading: isLoadingTeamBuildings
  } = useQuery({
    queryKey: ['teamBuildings-list', page, category, searchKeyword],
    queryFn: () =>
      getTeamBuildingList({
        page: page,
        limit: 16,
        hasRecruit: 2,
        category: !!category ? category : undefined,
        keyword: !!searchKeyword ? searchKeyword : undefined,
        keySearch: !!searchKeyword ? 'nameAndSlogan' : undefined
      })
  })
  const resData = teamBuildingsList?.data || null

  const searchTeamBuildings = () => {
    let newQuery = new URLSearchParams(Array.from<any>(queryData?.entries() as any))
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

  const { data: teamBuildingCategories, status: teamBuildingCategoriesStatus } = useQuery({
    queryKey: ['team-building-categories'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.TB_RECRUIT })
  })

  const teamBuildingBookmarkMutate = useMutation({
    mutationFn: updateBookmark
  })

  const handleBookmark = async (id: number) => {
    const { data, error } = await teamBuildingBookmarkMutate.mutateAsync({
      id: Number(id),
      type: BOOKMARK_TYPE.TEAM_BUILDING
    })
    if (!error) {
      await refetchTeamBuilding()
    }
  }

  useEffect(() => {
    const category = queryData?.get('category')
    const searchKeyword = queryData?.get('searchKeyword')
    const page = queryData?.get('page')

    setPage(!!page ? Number(page) : 1)
    setCategory(!!category ? (category as string) : '')
    setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setKeyword(!!searchKeyword ? (searchKeyword as string) : '')
  }, [queryData])

  useEffect(() => {
    if (teamBuildingCategoriesStatus === 'success') {
      setCategories([
        { id: '', name: '전체' },
        ...teamBuildingCategories?.data.map((i: Category) => ({ ...i, id: i.id + '' }))
      ])
    }
  }, [teamBuildingCategories])

  return (
    <Box display={'flex'} flexDirection={'column'}>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='large_title' mt={mdUp ? 5 : 3} mb={mdUp ? 6 : 3}>
        팀빌딩
      </Typography>
      <Banner
        type={BANNER_TYPE.TEAM_BUILDING}
        subType={BANNER_SUBTYPE.TEAM_BUILDING_TOP}
        sx={{
          my: convertToRem(24)
        }}
      />
      <Box display={'flex'} flexDirection={'column'}>
        <Box
          component='div'
          display={'flex'}
          justifyContent='space-between'
          alignItems={mdUp ? 'center' : 'flex-start'}
          flexDirection={mdUp ? 'row' : 'column'}
        >
          <SearchInput
            placeholder='검색어를 입력하세요.'
            fullWidth={mdUp ? false : true}
            value={keyword}
            onRemove={() => {
              let newQuery = new URLSearchParams(Array.from<any>(queryData?.entries() as any))
              newQuery.delete('searchKeyword')
              const search = newQuery.toString()
              const query = search ? `?${search}` : ''
              router.push(`${pathName}${query}`)
            }}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
            onSearch={searchTeamBuildings}
          />
          <Box
            display={'flex'}
            gap={1}
            alignItems={mdUp ? 'center' : 'flex-end'}
            justifyContent={!mdUp ? 'flex-end' : 'unset'}
            mb={0}
            mt={mdUp ? 0 : 2}
            width={mdUp ? 'auto' : '100%'}
          >
            <Button
              cate={'outlined'}
              customType={'active'}
              title='모집글 작성하기'
              sx={{
                width: mdUp ? '10rem' : '100%',
                color: theme.palette.main_grey.gray100
              }}
              onClick={() => {
                if (!user?.teamBuildingId) {
                  setShowError(true)
                } else {
                  router.push(`/team-building/${user?.teamBuildingId}/recruitment`)
                }
              }}
            />
          </Box>
        </Box>
        <Tabs
          value={category}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          sx={{ marginTop: 3 }}
          aria-label='scrollable force tabs example'
        >
          {categories.map((i) => (
            <Tab label={i.name} value={i.id} key={i.id} />
          ))}
        </Tabs>
      </Box>
      <PaginationList
        itemWidth={336}
        gap={24}
        responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
        curPage={page}
        totalPage={resData?.metaData?.totalPages || 0}
        onPageChange={handlePageChange}
        emptyTxt={!!searchKeyword ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.' : `등록된 모집공고가 없습니다.`}
        isEmpty={resData?.result.length === 0 && !isLoadingTeamBuildings && !isFetching}
      >
        {resData?.result?.map((x: ITeamBuilding, index: number) => {
          return (
            <CardCommunityTeamBuilding
              key={index}
              item={x}
              onClick={() => {
                router.push('/community/team-building/' + x.id)
              }}
              onBookmark={() => {
                handleBookmark(x.id || 0)
              }}
            />
          )
        })}
      </PaginationList>
      <InfoAlert
        onSubmit={(event) => {
          event.stopPropagation()
          setShowError(false)
          router.push('/team-building/team-register')
        }}
        submitTxt={'확인'}
        cancelTxt={'닫기'}
        hideCancelBtn
        title={'팀프로필 등록되지 않았습니다.'}
        description={'팀프로필 등록 후 모집글 등록해 주세요.'}
        open={showError}
        onCancel={(event) => {
          event.stopPropagation()
          setShowError(false)
        }}
      />
    </Box>
  )
}

export default TeamBuilding
