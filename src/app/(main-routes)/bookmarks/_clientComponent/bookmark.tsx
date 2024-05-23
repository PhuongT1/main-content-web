'use client'

import { getAllBookmarks } from '@/actions/apis/bookmark.action'
import { PageTitle } from '@/components'
import { BOOKMARK_TYPE, THUMBNAIL_TYPE } from '@/constants/bookmark.constant'
import { ResponsiveList } from '@/elements'
import { Box, useMediaQuery } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import BookmarkGroupBox from '../_components/bookmark-group-box'

const URL = '/bookmarks'
const CATEGORY = [
  {
    id: BOOKMARK_TYPE.CONTENT_BLOG,
    title: '콘텐츠 블로그',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.EVENT,
    title: '교육행사 & 지원사업',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.PORTFOLIO,
    title: '인재풀',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.TEAM_BUILDING,
    title: '팀빌딩',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.MENTORING,
    title: '전문가 멘토링',
    type: THUMBNAIL_TYPE.CIRCLE
  },
  {
    id: BOOKMARK_TYPE.OUTSOURCING_COMPANY,
    title: '외주기업',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.REFERENCE_ROOM,
    title: '자료실',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.CROWDFUNDING,
    title: '모의 크라우드 펀딩',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.QUALIFICATION_TEST,
    title: '자격시험',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.STARTUP_TALK,
    title: '스타트업 토크',
    type: THUMBNAIL_TYPE.SQUARE
  },
  {
    id: BOOKMARK_TYPE.COURSE,
    title: '자격시험',
    type: THUMBNAIL_TYPE.SQUARE
  }
]
const Bookmarks = () => {
  const router = useRouter()
  const smDown = useMediaQuery('(max-width: 576px)')

  const { data: allBookmarksData, refetch } = useQuery({
    queryKey: ['all-bookmarks'],
    queryFn: getAllBookmarks,
    retry: true,
    enabled: true
  })

  return (
    <Box>
      <PageTitle subTitle='북마크를 통해 원하는 콘텐츠를 빠르게 확인하세요.'>북마크</PageTitle>
      <ResponsiveList
        mt={6}
        justifyContent={smDown ? 'center' : 'flex-start'}
        minGap={[336, 32]}
        minBreakpoints={{ sm: [320, 32] }}
      >
        {CATEGORY.map(({ id, type, title }) => {
          return (
            <Box
              onClick={() => {
                if (allBookmarksData?.data[id]?.total > 0) {
                  router.push(`${URL}/${id.toLowerCase()}`)
                }
              }}
              key={id}
              sx={{ cursor: 'pointer' }}
            >
              <BookmarkGroupBox
                type={type}
                key={id}
                title={title}
                length={allBookmarksData?.data[id]?.total}
                bookmarks={allBookmarksData?.data[id]?.data}
              />
            </Box>
          )
        })}
      </ResponsiveList>
    </Box>
  )
}

export default Bookmarks
