'use client'
import { PaginationList, SupportProjectCard } from '@/components'
import { DATE_FORMAT } from '@/constants/common.constant'
import { Typography } from '@/elements'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { getSupportEvent } from '@/services/educational-event.service'
import { formatDateTime } from '@/utils/date'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const SupportProject = () => {
  const [searchDate, setSearchDate] = useState<DateRange>({ startDate: new Date(), endDate: new Date() })
  const [page, setPage] = useState(1)

  const { data: events } = useQuery({
    queryKey: [`support-events`, page, searchDate],
    queryFn: () => {
      return getSupportEvent({
        page: page,
        limit: 16,
        formDate: formatDateTime(searchDate.startDate, DATE_FORMAT.DASH_REV),
        toDate: formatDateTime(searchDate.endDate, DATE_FORMAT.DASH_REV)
      })
    }
  })

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        sx={{
          flexDirection: {
            lg: 'row',
            xs: 'column'
          },
          alignItems: {
            lg: 'center',
            xs: 'flex-start'
          },
          gap: 2
        }}
      >
        <Typography cate='title_70' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray100'>
          지원 사업
        </Typography>
        <Box
          display={'flex'}
          gap={2}
          alignItems={'center'}
          sx={{
            flexDirection: {
              lg: 'row',
              xs: 'column'
            },
            alignItems: {
              lg: 'center',
              xs: 'flex-start'
            },
            width: {
              lg: 'auto',
              xs: '100%'
            },
            gap: 1
          }}
        >
          <Typography width={120} cate='body_40' plainColor='main_grey.gray100'>
            신청일 조회
          </Typography>
          <RangeDatepicker
            showIcon
            inputProps={{
              inputSize: 'md',
              sx: {
                input: {
                  color: 'main_grey.gray200'
                }
              }
            }}
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e)
            }}
            disablePast
            placeholder='모집 기간을 선택해 주세요.'
          />
        </Box>
      </Box>
      <PaginationList
        containerSx={{
          mt: 3
        }}
        itemWidth={696}
        gap={24}
        isEmpty={(events?.data?.result?.length || 0) === 0}
        responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
        curPage={page}
        scrollTop={false}
        totalPage={events?.data?.metaData?.totalPages || 0}
        onPageChange={(page) => {
          setPage(page)
        }}
        emptyTxt='등록된 교육행사가 없습니다.'
      >
        {(events?.data?.result || []).map((i) => {
          return (
            <SupportProjectCard
              target={i.posttarget}
              targetAge={i.posttargetage}
              targetComAge={i.posttargetcomage}
              category={i.supporttype}
              organizationName={i.organizationname}
              title={i.title}
              startTime={i.startdate}
              endTime={i.enddate}
              deadline={i.deadlineDate}
              url={i.detailurl}
              key={i.postsn}
            />
          )
        })}
      </PaginationList>
    </Box>
  )
}

export default SupportProject
