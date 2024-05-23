'use client'
import { EducationalEventCard, ObserverBox } from '@/components'
import { RES_MESSAGE } from '@/constants/common.constant'
import { EVENT_STATUS_RECRUITMENT } from '@/constants/community/educational-event.constant'
import { EmptyText } from '@/elements'
import { useArray } from '@/hooks/use-array'
import { getActiveEducationalEvents } from '@/services/educational-event.service'
import { TEvent } from '@/types/community/educational-event.type'
import { ResponseMessage } from '@/types/types.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

const EventSideList = ({ id }: { id: number }) => {
  const { array, merge, update } = useArray<TEvent>([])
  const [page, setPage] = useState(1)

  const { data: events } = useQuery({
    queryKey: [`active-events`, page],
    queryFn: () => {
      return getActiveEducationalEvents({
        page: page,
        limit: 5,
        statusRecruitment: EVENT_STATUS_RECRUITMENT.PROGRESS
      })
    },
    meta: {
      offLoading: true
    }
  })

  const handleBookmarkSuccessfully = (id: number, data?: ResponseMessage) => {
    if (data?.data?.data?.message === RES_MESSAGE.SUCCESS) {
      const idx = array.findIndex((i) => i.id === id)
      const newData = { ...array[idx], isBookmark: !array[0].isBookmark }
      update(idx, newData)
    }
  }

  const memoEvents = useMemo(() => {
    return array.filter((i) => i.id !== id)
  }, [array])

  useEffect(() => {
    if (events && events.data.result.length > 0) {
      merge(events.data.result)
    }
  }, [events])

  return (
    <Box
      display={'flex'}
      maxWidth={{
        xl: 366,
        xs: '100%'
      }}
      width={'100%'}
      flexDirection={'column'}
      gap={3}
      height={1637}
      overflow={'auto'}
      borderRadius={2}
    >
      {memoEvents.length > 0 ? (
        <>
          {memoEvents.map((i) => {
            return <EducationalEventCard key={i.id} refetch={handleBookmarkSuccessfully} item={i} />
          })}
        </>
      ) : (
        <Box flexGrow={1} display={'flex'} justifyContent={'center'} height={'100%'}>
          <EmptyText>{'등록된 교육행사가 없습니다.'}</EmptyText>
        </Box>
      )}
      <ObserverBox
        haveNextPage={events?.data?.metaData?.totalPages !== page}
        fetchNext={() => setPage((pre) => pre + 1)}
      />
    </Box>
  )
}

export default EventSideList
