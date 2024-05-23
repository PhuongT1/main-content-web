'use client'
import { getBookmarkByType, updateBookmark } from '@/actions/apis/bookmark.action'
import { ChevronLeftIcon } from '@/assets/icons'
import { userAtom } from '@/atoms/user'
import { CardSlide, EducationalEventCard, ExpertMentoringCard, PageTitle, PaginationList } from '@/components'
import DataRoomCard from '@/components/cards/data-room.card'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { Divider, SecondaryButton, Typography } from '@/elements'
import CardCommunityOutsourceCompany from '@/elements/card-community-outsource-company'
import CardCommunityStartup from '@/elements/card-community-startup'
import CardCommunityTalent from '@/elements/card-community-talent'
import CardCommunityTeamBuilding from '@/elements/card-community-team-building'
import { deleteStartupTalkById } from '@/services/startup-talk.service'
import { ContentBookmark } from '@/types/bookmark.type'
import { PageParams } from '@/types/types.type'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CertificateCard from '../../startup/certification-exam/[id]/_component/certification-card'

function BookMarkList({ params: { id } }: PageParams<{ id: string }>) {
  const router = useRouter()
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const queryData = useSearchParams()
  const pathName = usePathname()
  const user = useRecoilValue(userAtom)
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const onBack = async () => {
    router.back()
  }
  const upperCaseId: BOOKMARK_TYPE = id.toUpperCase() as BOOKMARK_TYPE

  const { mutate: bookmarkMutate } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async () => {
      await refetchBookmark()
    }
  })

  const {
    data: bookmarksList,
    refetch: refetchBookmark,
    isFetching,
    isLoading: isLoadingOutsourceCompany
  } = useQuery({
    queryKey: [`bookmark-${id}-list`, page],
    queryFn: (pageParam: any) =>
      getBookmarkByType({
        page: page,
        limit: 16,
        type: upperCaseId
      })
  })

  const resData = bookmarksList?.data || null
  console.log(resData)

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

  const getItemMaxWidth = () => {
    switch (upperCaseId) {
      case BOOKMARK_TYPE.PORTFOLIO || BOOKMARK_TYPE.STARTUP_TALK:
        return 696
      default:
        return 336
    }
  }

  const getItemMinWidth = () => {
    switch (upperCaseId) {
      default:
        return 320
    }
  }

  const itemMinWidth = 320
  const deleteTalkMutate = useMutation({
    mutationFn: deleteStartupTalkById
  })

  const handleDeleteStartUpTalk = async (id: number) => {
    const { data, error } = await deleteTalkMutate.mutateAsync(id)
    if (!error) {
      await refetchBookmark()
    }
  }

  useEffect(() => {
    const page = queryData.get('page')

    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  console.log(resData, bookmarksList)

  return (
    <Box>
      <PageTitle subTitle={mdMatches ? '' : '북마크를 통해 원하는 콘텐츠를 빠르게 확인하세요.'}>
        북마크 - {upperCaseId === BOOKMARK_TYPE.CONTENT_BLOG ? '콘텐츠 블로그' : '교육행사 & 지원사업'}
      </PageTitle>
      {!mdMatches && (
        <Box mt={6}>
          <SecondaryButton btnSize='sm' action={onBack} sx={{ borderRadius: '99px !important', width: 121 }}>
            <ChevronLeftIcon
              svgProps={{
                width: 16,
                height: 16
              }}
              pathProps={{
                stroke: theme.palette.main_grey.gray200
              }}
            />
            <Typography plainColor='main_grey.gray200' cate='button_20'>
              이전으로
            </Typography>
          </SecondaryButton>
        </Box>
      )}
      {!mdMatches && <Divider sx={{ bgcolor: 'main_grey.gray700', my: 6 }} />}
      {/* {!mdMatches && (
			 <Box display={'flex'} height={56} alignItems={'center'} gap={2} flex={'1 0 0'}>
			 <Typography plainColor='main_grey.gray100' cate='title_70'>
			 진행중인 행사
			 </Typography>
			 </Box>
			 )} */}
      <PaginationList
        itemWidth={getItemMaxWidth()}
        gap={24}
        sx={{ mt: 4 }}
        responsiveListProps={{ minBreakpoints: { md: [getItemMinWidth(), 24] } }}
        curPage={page}
        totalPage={resData?.metaData?.totalPages || 0}
        onPageChange={handlePageChange}
        emptyTxt={`검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.`}
        isEmpty={resData?.result.length === 0 && !isLoadingOutsourceCompany && !isFetching}
      >
        {upperCaseId === BOOKMARK_TYPE.REFERENCE_ROOM &&
          resData?.result?.map((i: ContentBookmark, idx: number) => (
            <DataRoomCard
              key={idx}
              item={i.dataRoom}
              onClick={() => router.push('/startup/referent-room/' + i.dataRoomId)}
              onBookmark={() => {
                bookmarkMutate({ id: i.dataRoomId, type: BOOKMARK_TYPE.REFERENCE_ROOM })
              }}
            />
          ))}
        {upperCaseId === BOOKMARK_TYPE.CONTENT_BLOG &&
          resData?.result?.map((i: ContentBookmark, idx: number) => {
            return (
              <CardSlide
                {...i.contentBlog}
                key={idx}
                type={i.contentBlog?.type}
                numberOfImage={i.contentBlog?.images?.length}
                isBookmark={i.isBookmark}
                onClick={() => {
                  router.push('/blogs/' + i.contentBlogId)
                }}
                onBookmark={() => {
                  bookmarkMutate({ id: i.contentBlogId, type: BOOKMARK_TYPE.CONTENT_BLOG })
                }}
              />
            )
          })}
        {upperCaseId === BOOKMARK_TYPE.TEAM_BUILDING &&
          resData?.result?.map((i: ContentBookmark, index: number) => (
            <CardCommunityTeamBuilding
              key={i.id}
              item={{ ...i.teamBuilding, isBookmark: i.isBookmark }}
              onClick={() => {
                router.push('/community/team-building/' + i.teamBuildingId)
              }}
              onBookmark={() => {
                bookmarkMutate({ id: i.teamBuildingId, type: BOOKMARK_TYPE.TEAM_BUILDING })
              }}
            />
          ))}
        {upperCaseId === BOOKMARK_TYPE.OUTSOURCING_COMPANY &&
          resData?.result?.map((i: ContentBookmark) => (
            <CardCommunityOutsourceCompany
              key={i.id}
              {...i.company}
              isBookmark={i.isBookmark}
              onClick={() => {
                router.push('/community/outsource-companies/' + i.id)
              }}
              onBookmark={() => {
                bookmarkMutate({ id: i.companyId, type: BOOKMARK_TYPE.OUTSOURCING_COMPANY })
              }}
            />
          ))}
        {upperCaseId === BOOKMARK_TYPE.PORTFOLIO &&
          resData?.result?.map((i: ContentBookmark) => {
            return (
              <CardCommunityTalent
                key={i.portfolio?.id}
                onClick={() => {
                  router.push(`/community/talents/${i?.portfolio?.userId}`)
                }}
                item={i.portfolio}
              />
            )
          })}
        {upperCaseId === BOOKMARK_TYPE.STARTUP_TALK &&
          resData?.result?.map((i: ContentBookmark) => {
            return (
              <CardCommunityStartup
                refetch={refetchBookmark}
                key={i.startupTalk?.id}
                isOwner={Number(i.startupTalk?.userId) === Number(user?.id || -1)}
                onClick={() => {
                  router.push(`/community/startup-talks/${i.startupTalk?.id}`)
                }}
                {...i.startupTalk}
                isBookmark={i.isBookmark}
                onBookmark={() => {
                  bookmarkMutate({
                    id: i.startupTalkId || -1,
                    type: BOOKMARK_TYPE.STARTUP_TALK
                  })
                }}
                onDelete={async () => {
                  await handleDeleteStartUpTalk(i.startupTalkId || -1)
                }}
              />
            )
          })}
        {upperCaseId === BOOKMARK_TYPE.EVENT &&
          resData?.result?.map((i: ContentBookmark) => {
            return <EducationalEventCard isBookmarkPage key={i.id} refetch={() => refetchBookmark()} item={i.event} />
          })}
        {upperCaseId === BOOKMARK_TYPE.MENTORING &&
          resData?.result?.map((i: ContentBookmark) => (
            <ExpertMentoringCard mentor={i.mentoring!} key={i.mentoring!.id} />
          ))}
        {upperCaseId === BOOKMARK_TYPE.COURSE &&
          resData?.result?.map((i: ContentBookmark, index: number) => (
            <CertificateCard key={index} certificate={i.course} isBookmark={i.isBookmark} refetch={refetchBookmark} />
          ))}
      </PaginationList>
      {/* <Box display={'flex'} alignItems={'center'} alignContent={'center'} gap={3} flexWrap={'wrap'}>
			 {upperCaseId === BOOKMARK_TYPE.CROWDFUNDING && bookmardData.map((i) => <SupportProjectCard key={i} />)}
			 {upperCaseId === BOOKMARK_TYPE.MENTORING && bookmardData.map((i) => <ExpertMentoringCard key={i} />)}
			 {upperCaseId === BOOKMARK_TYPE.REFERENCE_ROOM && bookmardData.map((i) => <BookMarkCard type='rr' key={i} />)}
			 </Box> */}
    </Box>
  )
}

export default BookMarkList
