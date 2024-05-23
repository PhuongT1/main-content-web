'use client'
import ChevronLeftIcon from '@/assets/icons/chevrons/chevron-left.ico'
import ChevronRightIcon from '@/assets/icons/chevrons/chevron-right.ico'
import QuestionIcon from '@/assets/icons/question'
import { chatServiceAtom, userAtom } from '@/atoms/user'
import { PaginationList } from '@/components'
import { SortTab, SortTabItem } from '@/components/tabs'
import { APPLICATION_PROGRESS, MENTORING_PROGRESS_LIST_TABS } from '@/constants/mentor.constant'
import { IconButton, Typography } from '@/elements'
import SearchInput from '@/elements/search-input'
import { GhostBorderButton } from '@/elements/v2/button'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { getMenteeListOfMentor, mentorWriteReview, updateMenteeRequestStatus } from '@/services/mentoring.service'
import { color_gray } from '@/themes/system-palette'
import { IMentee, IReviewMentor } from '@/types/mentoring.type'
import { convertToRem } from '@/utils/convert-to-rem'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ArrowTooltip } from '../../../mentee/_component'
import CardMentoring from '../../_components/CardMentoring'
import MentorHandleDialog from '../../_components/MentorHandleDialog'
import WriteReportDialog from '../../_components/WriteReportDialog'
import MenteeReviewDialog from '../envaluate-management/_components/mentee-review-dialog'
import ReportPopup from '../envaluate-management/_components/report-popup'

const MentoringActive = ({ moveToReviewTab }: { moveToReviewTab: Function }) => {
  const chatUser = useRecoilValue(chatServiceAtom)
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 1120px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const [key, setKey] = useState(Math.random().toString())
  const userData = useRecoilValue(userAtom)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const [keyword, setKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [mentoringProgressFilter, setMentoringProgressFilter] = useState<APPLICATION_PROGRESS>(
    (queryData.get('filter') as APPLICATION_PROGRESS) || APPLICATION_PROGRESS.ALL
  )
  const [selectedItem, setSelectedItem] = useState<any>()
  const { open: openReview, onClose: onCloseReviewDialog, onOpen: onOpenReviewDialog } = useDialog()
  const { open: mentorDialogOpen, onClose: onCloseMentorDialog, onOpen: onOpenMentorDialog } = useDialog()
  const { open: reportOpen, onClose: onCloseReportDialog, onOpen: onOpenReportDialog } = useDialog()
  const {
    open: mentorReportDialogOpen,
    onClose: onCloseMentorReportDialog,
    onOpen: onOpenMentorReportDialog
  } = useDialog()
  const [searchKeyword, setSearchKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: undefined, endDate: undefined })
  const [selectedReview, setSelectedReview] = useState<IReviewMentor | null>(null)
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const [hydrate, setHydrate] = useState(false)
  const [isViewReport, setIsViewReport] = useState<boolean>(false)
  const [selectedMentee, setSelectedMentee] = useState<IMentee | null>(null)
  const pathname = getCurrentUrl()
  const {} = useHydrate()

  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  const {
    data: menteeList,
    refetch,
    isFetching,
    isLoading: isLoadingOutsourceCompanys
  } = useQuery({
    queryKey: ['mentoring-mentee-list', page, mentoringProgressFilter, searchKeyword, dateRange],
    queryFn: () =>
      getMenteeListOfMentor({
        page: page,
        limit: 16,
        status:
          mentoringProgressFilter === APPLICATION_PROGRESS.ALL || !mentoringProgressFilter
            ? 'PENDING,APPROVAL,COMPLETE,IN_PROCESS,CANCELED,WRITE_REPORT'
            : mentoringProgressFilter,
        keyword: !!searchKeyword ? searchKeyword : undefined,
        keySearch: !!searchKeyword ? 'menteeName' : undefined,
        fromDate: !!dateRange.startDate ? moment(dateRange.startDate).format('YYYY-MM-DD') : undefined,
        toDate: !!dateRange.endDate ? moment(dateRange.endDate).format('YYYY-MM-DD') : undefined
      }),
    staleTime: 0,
    gcTime: 0
  })

  const resData = menteeList?.data || null

  const handleChangeDate = (dateRange: DateRange) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (!!dateRange.endDate && !!dateRange.startDate) {
      newQuery.set('fromDate', moment(dateRange.startDate).format('YYYY-MM-DD'))
      newQuery.set('toDate', moment(dateRange.endDate).format('YYYY-MM-DD'))
    } else {
      if (!!newQuery.get('fromDate') || !!newQuery.get('toDate')) {
        newQuery.delete('fromDate')
        newQuery.delete('toDate')
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

  const handleChangeFilter = (newValue: APPLICATION_PROGRESS) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== APPLICATION_PROGRESS.ALL) {
      newQuery.set('filter', newValue)
    } else {
      if (!!newQuery.get('filter')) {
        newQuery.delete('filter')
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

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

  const updateMenteeRequestStatusMutate = useMutation({
    mutationFn: updateMenteeRequestStatus,
    onSuccess: () => {
      refetch()
    }
  })

  const handleUpdateStatus = async (id: number, type: APPLICATION_PROGRESS) => {
    updateMenteeRequestStatusMutate.mutate({
      mentoringId: userData?.mentoringId || 0,
      mentoringApplicationId: id,
      status: type
    })
  }

  const writeReviewMutate = useMutation({
    mutationFn: mentorWriteReview,
    onSuccess: () => {
      setSelectedItem(null)
      onCloseMentorReportDialog()
      refetch()
    }
  })

  const handleWriteReview = async (id: number, report: string) => {
    writeReviewMutate.mutate({
      id: userData?.mentoringId || 0,
      applicationId: id,
      mentorReport: report
    })
  }

  useEffect(() => {
    const searchKeyword = queryData.get('searchKeyword')
    const page = queryData.get('page')
    const fromDate = queryData.get('fromDate')
    const toDate = queryData.get('toDate')
    const filter = queryData.get('filter')

    setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setDateRange({
      startDate: fromDate ? moment(fromDate).toDate() : undefined,
      endDate: toDate ? moment(toDate).toDate() : undefined
    })
    setKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setPage(!!page ? Number(page) : 1)
    setMentoringProgressFilter((filter as APPLICATION_PROGRESS) || APPLICATION_PROGRESS.ALL)
  }, [queryData])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])
  return (
    <Box display='flex' flexDirection='column' key={key}>
      <Box
        display='flex'
        alignItems={'center'}
        justifyContent={'flex-start'}
        flexDirection={mdUp ? 'row' : 'column'}
        gap={2}
      >
        <Typography
          cate='sub_title_40'
          sx={{ width: { md: 'auto', sm: '100%', xs: '100%' }, flexShrink: 0, whiteSpace: 'pre-line' }}
          textAlign={'left'}
        >
          조회일자
        </Typography>
        {/* <RangeDatepicker value={dateRange} onChange={handleChangeDate} /> */}
        <RangeDatepicker
          showIcon
          value={dateRange}
          onChange={handleChangeDate}
          containerSx={{
            width: { md: convertToRem(260), sm: '100%', xs: '100%' }
          }}
          inputProps={{
            style: {
              height: convertToRem(44)
            }
          }}
          placeholder='2023.02.15 ~ 2023.02.15'
        />
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={{ md: 2, sm: 1, xs: 1 }}
          width={{ md: 'unset', sm: '100%' }}
        >
          <SearchInput
            placeholder='Search'
            fullWidth={mdUp ? false : true}
            sx={
              {
                // minWidth: { md: convertToRem(320), sm: '100%' }
              }
            }
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
          <GhostBorderButton
            active
            btnSize={'xs'}
            sx={{ width: lgUp ? convertToRem(85) : convertToRem(74), borderRadius: 5000, flexShrink: 0 }}
            onClick={searchOutsourceCompanys}
          >
            <Typography cate='button_30'>조회</Typography>
          </GhostBorderButton>
        </Stack>
      </Box>
      <Box
        sx={{
          marginY: convertToRem(lgUp ? 48 : 24),
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: lgUp ? 'row' : 'column-reverse',
          gap: lgUp ? 'unset' : convertToRem(20)
        }}
      >
        <SortTab
          scrollButtons
          variant='scrollable'
          allowScrollButtonsMobile
          TabIndicatorProps={{
            sx: {
              bgcolor: 'unset'
            }
          }}
          sx={{
            '.MuiTabs-flexContainer': {
              gap: 1.5
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
          {MENTORING_PROGRESS_LIST_TABS.map(({ label = '', value: tabValue, ...rest }, idx) => [
            <SortTabItem
              sx={{
                padding: 0,
                borderRadius: convertToRem(1000),
                width: 'fit-content',
                minWidth: 0
              }}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: convertToRem(1000),
                    border: `1px solid ${
                      mentoringProgressFilter === tabValue
                        ? theme.palette.main.primary_light
                        : theme.palette.main_grey.gray500
                    }`,
                    padding: '13px 24px',
                    width: 'auto',
                    height: convertToRem(44)
                  }}
                >
                  <Typography color={mentoringProgressFilter === tabValue ? '#fff' : color_gray[200]} cate='button_30'>
                    {label}
                  </Typography>
                </Box>
              }
              key={`tab-${idx}`}
              value={tabValue}
              {...rest}
            />
          ])}
        </SortTab>
        <ArrowTooltip
          title={
            <Typography cate='body_20' component={'span'} whiteSpace={'pre-line'}>
              {`멘토링 취소는 ‘신청' 상태에서만 가능합니다.
              ‘신청' 상태에서 취소 신청 시 결제 금액이 100% 환불되며, 이외의 상태에서 취소를 원하실
              경우 고객센터에 문의해주세요.`}
            </Typography>
          }
          sx={{ marginTop: '-15px !important' }}
          placement='bottom-end'
        >
          <Stack direction={'row'} gap={0.75} alignItems={'center'} justifyContent={'flex-end'}>
            <QuestionIcon
              pathProps={{
                stroke: theme.palette.main.white
              }}
            />
            <Typography cate='body_30'>멘토링 취소 안내</Typography>
          </Stack>
        </ArrowTooltip>
      </Box>
      <PaginationList
        itemWidth={696}
        gap={24}
        sx={{ mt: mdUp ? -3 : 0 }}
        responsiveListProps={{ minBreakpoints: { lg: [200, 24], md: [320, 24] } }}
        curPage={page}
        totalPage={menteeList?.metaData?.totalPages || 0}
        onPageChange={handlePageChange}
        emptyTxt={
          !!searchKeyword
            ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.'
            : `검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.`
        }
        showPagination={
          !(resData?.result.length === 0 && !isLoadingOutsourceCompanys && !isFetching) &&
          !(resData?.metaData?.totalPages === 1)
        }
        isEmpty={resData?.result.length === 0 && !isLoadingOutsourceCompanys && !isFetching}
        // isEmpty={false}
      >
        {resData?.result?.map((x: IMentee) => {
          return (
            <CardMentoring
              onDelete={undefined}
              key={x.id}
              onUpdateStatus={async (type: APPLICATION_PROGRESS) => {
                await handleUpdateStatus(x.id, type)
              }}
              onChatting={() => {
                chatUser?.onOpen(x.user.uuid)
              }}
              onWatchReview={() => {
                setSelectedMentee(x)
                onOpenMentorReportDialog()
                setIsViewReport(true)
              }}
              onWriteReview={() => {
                setSelectedMentee(x)
                onOpenMentorReportDialog()
                setIsViewReport(false)
              }}
              onMoveToMenteeReview={() => {
                onOpenReviewDialog()
                setSelectedReview(x?.review)
                // moveToReviewTab()
              }}
              onShowMenteeInquiry={() => {
                setSelectedMentee(x)
                onOpenMentorDialog()
              }}
              {...x} // item={i}
            />
          )
        })}
      </PaginationList>
      <MentorHandleDialog
        open={mentorDialogOpen}
        onCancel={() => {
          setSelectedMentee(null)
          onCloseMentorDialog()
        }}
        {...selectedMentee}
        id={undefined}
      />
      <MenteeReviewDialog
        open={openReview}
        title={'리뷰 상세'}
        onCancel={() => {
          setSelectedReview(null)
          onCloseReviewDialog()
        }}
        onSubmit={() => {
          setSelectedReview(null)
          refetch()
          onCloseReviewDialog()
        }}
        onReport={() => {
          onCloseReviewDialog()
          onOpenReportDialog()
        }}
        {...selectedReview}
        id={undefined}
        reviewId={Number(selectedReview?.id) || 0}
      />
      <WriteReportDialog
        open={mentorReportDialogOpen}
        onCancel={() => {
          setSelectedMentee(null)
          onCloseMentorReportDialog()
        }}
        onWriteReport={(report: string) => {
          handleWriteReview(selectedMentee?.id || 0, report)
        }}
        isViewMode={isViewReport}
        {...selectedMentee}
        id={undefined}
      />
      <ReportPopup
        open={reportOpen}
        mentoringReviewId={selectedReview?.id || 0}
        onCancel={() => {
          setSelectedReview(null)
          refetch()
          onCloseReportDialog()
        }}
      />
    </Box>
  )
}

export default MentoringActive
