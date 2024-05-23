'use client'
import { EducationalEventCard, PaginationList } from '@/components'
import { EVENT_STATUS_RECRUITMENT } from '@/constants/community/educational-event.constant'
import { Typography } from '@/elements'
import { getActiveEducationalEvents } from '@/services/educational-event.service'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type EventListProps = {
  status: EVENT_STATUS_RECRUITMENT
}
const EventList = ({ status }: EventListProps) => {
  const [page, setPage] = useState(1)
  const isFinishEvent = status === EVENT_STATUS_RECRUITMENT.FINISH
  const isScrollToTop = !isFinishEvent
  const disabledApplyBtn = isFinishEvent
  const { data: events, refetch } = useQuery({
    queryKey: [`active-events-${status}`, page],
    queryFn: () => {
      return getActiveEducationalEvents({
        page: page,
        limit: 16,
        statusRecruitment: status
      })
    }
  })

  return (
    <Box>
      <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
        {status === EVENT_STATUS_RECRUITMENT.PROGRESS ? '진행중인 행사' : '마감된 행사'}
      </Typography>
      <PaginationList
        containerSx={{ mt: 3 }}
        itemWidth={336}
        gap={24}
        isEmpty={!(events?.data.result && events.data.result.length > 0)}
        responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
        curPage={page}
        scrollTop={isScrollToTop}
        totalPage={events?.data?.metaData?.totalPages || 0}
        onPageChange={(page: number) => setPage(page)}
        emptyTxt='등록된 교육행사가 없습니다.'
      >
        {(events?.data.result || []).map((i) => (
          <EducationalEventCard
            key={i.id}
            disabledApplyBtn={disabledApplyBtn}
            refetch={() => {
              refetch()
            }}
            item={i}
          />
        ))}
      </PaginationList>
    </Box>
  )
}

export default EventList
