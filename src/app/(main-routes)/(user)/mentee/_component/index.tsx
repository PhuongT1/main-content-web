'use client'
import { getMenteeActivity } from '@/actions/apis/mentoring.action'
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import QuestionIcon from '@/assets/icons/question'
import { chatServiceAtom } from '@/atoms/user'
import { PaginationList, SortTab, SortTabItem } from '@/components'
import ProceedCard from '@/components/cards/proceed.card'
import MentorMenteeReviewDialog from '@/components/dialog/mentor-mentee-review'
import { APPLICATION_PROGRESS, MANAGE_TYPE, MENTEE_PROGRESS_LIST_TABS, status } from '@/constants/mentor.constant'
import { IconButton, SecondaryButton, Typography } from '@/elements'
import { SecondaryOutlinedChip } from '@/elements/v2/chip'
import SearchInput from '@/elements/v2/input/search-input'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { IMenteeRequest, Mentee } from '@/types/mentoring/mentee.type'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  CircularProgress,
  Stack,
  Tooltip,
  TooltipProps,
  styled,
  tabsClasses,
  tooltipClasses,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export const ArrowTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.main_grey.gray700,
    left: 'unset !important',
    transform: 'none !important',
    right: '1.5em',
    width: '1.3em',
    height: '1em',
    marginTop: '-1em !important',
    ['&::before']: {
      border: '1px solid' + theme.palette.main_grey.gray500
    }
  },
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: convertToRem(544),
    marginTop: '0 !important',
    [theme.breakpoints.down('md')]: {
      maxWidth: convertToRem(164),
      marginTop: '1em !important'
    },
    padding: convertToRem(16),
    backgroundColor: theme.palette.main_grey.gray700,
    border: '1px solid' + theme.palette.main_grey.gray500,
    borderRadius: 8
  }
}))

const tooltipContent = `멘토링 취소는 ‘신청' 상태에서만 가능합니다.
‘신청' 상태에서 취소 신청 시 결제 금액이 100% 환불되며, 이외의 상태에서 취소를 원하실
경우 고객센터에 문의해주세요.`

export const monthFilter = [
  {
    label: '3개월',
    value: 3
  },
  {
    label: '6개월',
    value: 6
  },
  {
    label: '12개월',
    value: 12
  }
]

const MenteeActivity = () => {
  const router = useRouter()
  const theme = useTheme()
  const mdDown = useMediaQuery('(max-width: 768px)')
  const queryData = useSearchParams()
  const pathName = usePathname()
  const query = useQueryClient()

  const [dateRange, setDateRange] = useState<DateRange>({ startDate: undefined, endDate: undefined })
  const [searchKeyword, setSearchKeyword] = useState<string>(queryData.get('name') || '')
  const [mentoringProgressFilter, setMentoringProgressFilter] = useState<APPLICATION_PROGRESS>(APPLICATION_PROGRESS.ALL)
  const [applyMonth, setApplyMonth] = useState<number>()
  const [page, setPage] = useState<number>(1)

  const [openReview, setOpenReview] = useState<boolean>(false)
  const [viewReview, setViewReview] = useState<boolean>(false)
  const [menteeRequest, setMenteeRequest] = useState<IMenteeRequest>({
    page: 1,
    limit: 10,
    status: status.join(',')
  })
  const [review, setReview] = useState<Mentee>()
  const chatUser = useRecoilValue(chatServiceAtom)

  const { data: menteeList, isFetching } = useQuery({
    queryKey: ['mentee-activity', { ...menteeRequest }],
    queryFn: async () => await getMenteeActivity(menteeRequest),
    select: (data) => {
      return data.data
    },
    meta: {
      offLoading: true
    }
  })

  const handleChangeDate = (dateRange: DateRange) => {
    setDateRange(dateRange)
    setApplyMonth(0)
  }

  const handleMonthFilter = (month: number) => {
    setApplyMonth(month)
    setDateRange({
      startDate: moment().subtract(month, 'month').toDate(),
      endDate: moment().toDate()
    })
  }

  const handlePageChange = (newValue: number) => {
    setPage(newValue)
  }

  const searchMentee = () => {
    setSearchKeyword(searchKeyword.trim())
  }

  const handleChangeFilter = (newValue: APPLICATION_PROGRESS) => {
    let newQuery = new URLSearchParams(queryData)
    if (newValue !== APPLICATION_PROGRESS.ALL) {
      newQuery.set('status', newValue)
      setMenteeRequest({ ...menteeRequest, status: newValue })
    } else {
      if (!!newQuery.get('status')) {
        newQuery.delete('status')
        setMenteeRequest({ ...menteeRequest, status: status.join(',') })
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

  const applyFilter = () => {
    let newQuery = new URLSearchParams(queryData)
    if (!!applyMonth && applyMonth > 0) {
      newQuery.set('fromDate', moment().subtract(applyMonth, 'month').format('YYYY-MM-DD'))
      newQuery.set('toDate', moment().format('YYYY-MM-DD'))
    }
    if (!!dateRange.endDate && !!dateRange.startDate) {
      newQuery.set('fromDate', moment(dateRange.startDate).format('YYYY-MM-DD'))
      newQuery.set('toDate', moment(dateRange.endDate).format('YYYY-MM-DD'))
      setMenteeRequest({
        ...menteeRequest,
        fromDate: moment(dateRange.startDate).format('YYYY-MM-DD'),
        toDate: moment(dateRange.endDate).format('YYYY-MM-DD')
      })
    } else {
      if (!!newQuery.get('fromDate') || !!newQuery.get('toDate')) {
        newQuery.delete('fromDate')
        newQuery.delete('toDate')
        const { fromDate, toDate, ...rest } = menteeRequest
        setMenteeRequest(rest)
      }
    }
    if (page !== 1) {
      newQuery.set('page', page + '')
      setMenteeRequest({
        ...menteeRequest,
        page: page
      })
    } else {
      if (!!newQuery.get('page')) {
        newQuery.delete('page')
        const { page, ...rest } = menteeRequest
        setMenteeRequest(rest)
      }
    }
    if (!!searchKeyword) {
      newQuery.set('name', searchKeyword.trim())
      setMenteeRequest({
        ...menteeRequest,
        keySearch: 'mentorName',
        keyword: searchKeyword
      })
    } else {
      if (!!newQuery.get('name')) {
        newQuery.delete('name')
        const { keySearch, keyword, ...rest } = menteeRequest
        setMenteeRequest(rest)
      }
    }
    router.push(`${pathName}?${newQuery}`)
  }

  const setMenteeStatus = (mentee: Mentee) => {
    switch (mentee.status) {
      case APPLICATION_PROGRESS.COMPLETE:
        if (mentee.menteeWroteReviewAt != null) {
          return APPLICATION_PROGRESS.REVIEW
        } else {
          return mentee.status as APPLICATION_PROGRESS
        }
      default:
        return mentee.status as APPLICATION_PROGRESS
    }
  }

  useEffect(() => {
    setDateRange({
      startDate: queryData.get('fromDate') ? moment(queryData.get('fromDate')).toDate() : undefined,
      endDate: queryData.get('toDate') ? moment(queryData.get('toDate')).toDate() : undefined
    })
    setSearchKeyword(queryData.get('name') || '')
    setMentoringProgressFilter((queryData.get('status') as APPLICATION_PROGRESS) || APPLICATION_PROGRESS.ALL)
    setPage(Number(queryData.get('page')) || 1)
  }, [queryData])

  return (
    <>
      <Stack direction='column' mt={{ md: 6, sm: 3 }} gap={{ md: 6, sm: 3 }}>
        <Stack
          alignItems={{ md: 'center', sm: 'flex-start' }}
          justifyContent='flex-start'
          direction={{ md: 'row', sm: 'column' }}
          gap={{ md: 3, sm: 1.5 }}
          width={'100%'}
          flexWrap={'wrap'}
        >
          <Typography
            cate='sub_title_40'
            sx={{
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            조회일자
          </Typography>
          <RangeDatepicker
            showIcon
            value={dateRange}
            onChange={handleChangeDate}
            containerSx={{
              width: { md: convertToRem(280), sm: '100%' },
              flexShrink: 0
            }}
            inputProps={{
              style: {
                height: convertToRem(44)
              }
            }}
            placeholder='YYYY.MM.DD ~ YYYY.MM.DD'
          />
          <Stack direction={'row'} alignItems={'center'} gap={1} width={{ md: 'auto', sm: '100%' }}>
            {monthFilter.map(({ label, value }, idx) => (
              <SecondaryOutlinedChip
                key={`month-${idx}`}
                chipHeight={44}
                sx={{
                  minWidth: convertToRem(87),
                  width: { sm: '100%' },
                  borderRadius: convertToRem(8)
                }}
                clickable
                active={applyMonth === value}
                label={
                  <Typography plainColor='main.white' cate='button_20'>
                    {label}
                  </Typography>
                }
                onClick={() => handleMonthFilter(value)}
              />
            ))}
          </Stack>
          <Stack direction={'row'} gap={1} width={{ md: 'unset', sm: '100%' }}>
            <SearchInput
              placeholder='멘토 이름 검색'
              fullWidth={!mdDown ? false : true}
              sx={{
                width: { md: convertToRem(320), sm: '100%' }
              }}
              value={searchKeyword}
              onClear={() => setSearchKeyword('')}
              onChange={(e) => {
                setSearchKeyword(e.target.value)
              }}
              onSearch={searchMentee}
            />
            <SecondaryButton
              btnSize={'xs'}
              sx={{ width: convertToRem(73), borderRadius: convertToRem(1000) }}
              onClick={applyFilter}
            >
              <Typography cate='button_20'>조회</Typography>
            </SecondaryButton>
          </Stack>
        </Stack>
        <Stack
          direction={{ md: 'row', sm: 'column-reverse' }}
          justifyContent={{ md: 'space-between' }}
          gap={{ md: 0, sm: 2.5 }}
          width={'100%'}
        >
          <SortTab
            scrollButtons={mdDown ? false : true}
            variant='scrollable'
            TabIndicatorProps={{
              sx: {
                bgcolor: 'unset'
              }
            }}
            sx={{
              [`& .${tabsClasses.flexContainer}`]: {
                gap: 1
              }
            }}
            value={mentoringProgressFilter}
            handleChange={(_e: any, value: APPLICATION_PROGRESS) => {
              handleChangeFilter(value)
            }}
            ScrollButtonComponent={(props) => {
              if (props.direction === 'left' && !props.disabled) {
                return (
                  <IconButton {...props}>
                    <ChevronLeftIcon
                      pathProps={{
                        stroke: theme.palette.main_grey.gray100
                      }}
                    />
                  </IconButton>
                )
              } else if (props.direction === 'right' && !props.disabled) {
                return (
                  <IconButton {...props}>
                    <ChevronRightIcon svgProps={{ stroke: theme.palette.main_grey.gray100 }} />
                  </IconButton>
                )
              } else {
                return null
              }
            }}
          >
            {MENTEE_PROGRESS_LIST_TABS.map(({ label, value, ...rest }, idx) => [
              <SortTabItem
                sx={{
                  padding: 0,
                  minWidth: convertToRem(73)
                }}
                label={
                  <SecondaryOutlinedChip
                    chipHeight={44}
                    sx={{
                      paddingX: convertToRem(24)
                    }}
                    clickable
                    active={mentoringProgressFilter === value}
                    label={
                      <Typography plainColor='main.white' cate='button_20'>
                        {label}
                      </Typography>
                    }
                  />
                }
                key={`tab-${idx}`}
                value={value}
                {...rest}
              />
            ])}
          </SortTab>
          <Stack direction={'row'} justifyContent={'flex-end'} width={{ md: 'auto', sm: '100%' }}>
            <ArrowTooltip
              title={
                <Typography cate='body_20' component={'span'}>
                  {tooltipContent}
                </Typography>
              }
              placement='bottom-end'
            >
              <Stack direction={'row'} gap={0.75} alignItems={'center'}>
                <QuestionIcon
                  pathProps={{
                    stroke: theme.palette.main.white
                  }}
                />
                <Typography
                  cate='body_30'
                  sx={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  멘토링 취소 안내
                </Typography>
              </Stack>
            </ArrowTooltip>
          </Stack>
        </Stack>
        {isFetching && !menteeList ? (
          <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress color='primary' />
          </Stack>
        ) : (
          menteeList && (
            <PaginationList
              itemWidth={696}
              gap={24}
              sx={{ mt: !mdDown ? -3 : 0 }}
              responsiveListProps={{ minBreakpoints: { lg: [200, 24], md: [320, 24] } }}
              curPage={page}
              totalPage={menteeList.metaData.totalPages}
              onPageChange={handlePageChange}
              emptyTxt={!!searchKeyword ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.' : `데이터 없습니다.`}
              isEmpty={menteeList.result.length === 0}
            >
              {menteeList.result.map((item, idx) => (
                <ProceedCard
                  key={item.uuid + idx}
                  type={MANAGE_TYPE.MENTEE}
                  stage={setMenteeStatus(item)}
                  data={item}
                  mentoringID={item.mentoringId}
                  product={item.productContent}
                  createAt={item.createdAt}
                  onReview={() => {
                    setReview(item)
                    setOpenReview(true)
                  }}
                  onViewReview={() => {
                    setReview(item)
                    setViewReview(true)
                    setOpenReview(true)
                  }}
                  onChat={() => {
                    chatUser?.onOpen(item.mentor.uuid)
                  }}
                />
              ))}
            </PaginationList>
          )
        )}
      </Stack>
      {review && (
        <MentorMenteeReviewDialog
          open={openReview}
          viewReview={viewReview}
          title={'멘토링 리뷰 작성하기'}
          description={'멘토링을 받은 멘토에게 리뷰를 남겨주세요.'}
          onCancel={() => {
            setOpenReview(false)
            setTimeout(() => {
              setViewReview(false)
              query.removeQueries({ queryKey: ['mentee-review', review.mentoringId], exact: true })
            }, 500)
          }}
          review={review}
        />
      )}
    </>
  )
}

export default MenteeActivity
