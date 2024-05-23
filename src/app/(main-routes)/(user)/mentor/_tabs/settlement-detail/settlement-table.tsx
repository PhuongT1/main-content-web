import { Pagination } from '@/components'
import { SecondaryButton, Typography } from '@/elements'
import { OutlinedIconButton } from '@/elements/v2/icon-button'
import { useDialog } from '@/hooks/use-dialog'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { color_gray } from '@/themes/system-palette'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import InfoPopup from './_components/info-popup/info-popup'
import { IMentorRevenue } from '@/types/mentoring.type'
import { formatCurrency } from '@/utils/format-currency'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { monthFilter } from '../../../mentee/_component'
import { SecondaryOutlinedChip } from '@/elements/v2/chip'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getMentorSettlementTransaction, getMentoringNoticeDetail } from '@/services/mentoring.service'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { IMentorTransaction } from '@/types/community/mentoring.type'
import { MENTOR_PRODUCT_TYPE, MENTOR_TRANSACTION_STATUS } from '@/constants/mentor.constant'
import { IBank, getBankList } from '@/services/common.service'

const SettlementTable = ({ totalSalesPrice }: IMentorRevenue) => {
  const theme = useTheme()
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const mdUp = useMediaQuery('(min-width: 992px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const userData = useRecoilValue(userAtom)
  const [selectedTransaction, setSelectedTransaction] = useState<IMentorTransaction | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: undefined, endDate: undefined })
  const [applyMonth, setApplyMonth] = useState<number | null>(null)
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const handleChangeDate = (dateRange: DateRange) => {
    let newQuery = new URLSearchParams(queryData)
    newQuery.set('fromDate', moment(dateRange.startDate).format('YYYY-MM-DD'))
    newQuery.set('toDate', moment(dateRange.endDate).format('YYYY-MM-DD'))
    router.push(`${pathName}?${newQuery}`)
    setApplyMonth(0)
  }

  const handleMonthFilter = (month: number) => {
    let newQuery = new URLSearchParams(queryData)
    if (applyMonth === month) {
      newQuery.delete('fromDate')
      newQuery.delete('toDate')
      router.push(`${pathName}?${newQuery}`)
      setApplyMonth(null)
    } else {
      newQuery.set('fromDate', moment().subtract(applyMonth, 'month').format('YYYY-MM-DD'))
      newQuery.set('toDate', moment().format('YYYY-MM-DD'))
      router.push(`${pathName}?${newQuery}`)
      setApplyMonth(month)
    }
  }
  const {
    data: responseDetail,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['mentoring-settlement-transaction', dateRange],
    queryFn: () =>
      getMentorSettlementTransaction({
        id: userData?.mentoringId || 0,
        fromDate: dateRange.startDate ? moment(dateRange.startDate).format('YYYY-MM-DD') : undefined,
        toDate: dateRange.endDate ? moment(dateRange.endDate).format('YYYY-MM-DD') : undefined,
        page: page,
        limit: 16,
        status: 'COMPLETE,PENDING,CANCELED,IN_PROCESS',
        mentoringTransactionStatus: 'PENDING,COMPLETE,CANCELED'
      }),
    retry: false,
    staleTime: 0,
    gcTime: 0,
    enabled: Boolean(userData?.mentoringId)
  })

  const { data: listBankAccounts } = useQuery({
    queryKey: ['list-bank'],
    queryFn: () => getBankList()
  })

  const listBank = listBankAccounts?.data?.banks || []

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
  const resData = responseDetail?.data || null

  useEffect(() => {
    setDateRange({
      startDate: queryData.get('fromDate') ? moment(queryData.get('fromDate')).toDate() : undefined,
      endDate: queryData.get('toDate') ? moment(queryData.get('toDate')).toDate() : undefined
    })
    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  const { open: infoDialogOpen, onClose: onCloseInfoDialog, onOpen: onOpenInfoDialog } = useDialog()
  return (
    <>
      <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={lgUp ? 3 : 2}>
        <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={2}>
          <Typography cate={'title_60'} textAlign={'left'}>
            세부내역
          </Typography>
          <Box
            display={'flex'}
            flexDirection={xlUp ? 'row' : 'column-reverse'}
            alignItems={xlUp ? 'center' : 'flex-start'}
            justifyContent={'space-between'}
            gap={lgUp ? 0 : 3}
          >
            <Typography cate={'sub_title_40'}>
              총{' '}
              {!!responseDetail?.data?.metaData?.totalRecords
                ? formatCurrency(responseDetail?.data?.metaData?.totalRecords)
                : 0}
              건 / 총 {!!totalSalesPrice ? formatCurrency(totalSalesPrice) : 0}원
            </Typography>
            <Box
              display={'flex'}
              alignItems={xlUp ? 'center' : 'flex-start'}
              gap={2}
              flexDirection={xlUp ? 'row' : 'column'}
              width={lgUp ? 'unset' : '100%'}
            >
              <Typography cate={'sub_title_40'}>조회일자</Typography>
              <RangeDatepicker
                showIcon
                value={dateRange}
                onChange={handleChangeDate}
                containerSx={{
                  width: lgUp ? convertToRem(260) : '100%'
                }}
                inputProps={{
                  style: {
                    height: convertToRem(44)
                  }
                }}
                placeholder={`${moment().format('YYYY.MM.DD')} ~ ${moment().format('YYYY.MM.DD')}`}
              />

              <Stack direction={'row'} alignItems={'center'} gap={1} width={lgUp ? 'unset' : '100%'}>
                {monthFilter.map(({ label, value }, idx) => (
                  <SecondaryOutlinedChip
                    key={`month-${idx}`}
                    chipHeight={44}
                    sx={{
                      minWidth: convertToRem(87),
                      flex: lgUp ? 'unset' : 1,
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
            </Box>
          </Box>
        </Box>
        {!(!!resData?.result && resData?.result.length > 0) ? (
          <Typography
            cate={lgUp ? 'body_40' : 'body_20'}
            sx={{ width: '100%' }}
            my={lgUp ? 20 : 17.5}
            textAlign={'center'}
            color={color_gray[300]}
          >
            조회 결과가 없습니다
          </Typography>
        ) : (
          <>
            <Box display='flex' flexDirection={'column'}>
              <Grid
                container
                bgcolor={theme.palette.main_grey.gray700}
                sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              >
                {mdUp ? (
                  <>
                    <Grid item xs={1.5} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        신청일시
                      </Typography>
                    </Grid>
                    <Grid item xs={1.5} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        완료일시
                      </Typography>
                    </Grid>
                    <Grid item xs={1} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        이체은행
                      </Typography>
                    </Grid>
                    <Grid item xs={4} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        내용
                      </Typography>
                    </Grid>
                    <Grid item xs={1.5} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        판매 금액
                      </Typography>
                    </Grid>
                    <Grid item xs={1} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        지급상태
                      </Typography>
                    </Grid>
                    <Grid item xs={1.5} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        정산 금액
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={8} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        내용
                      </Typography>
                    </Grid>
                    <Grid item xs={4} p={2}>
                      <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                        상세보기
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>

              {resData?.result.map((i: IMentorTransaction) => {
                return (
                  <Grid
                    key={i.id}
                    container
                    py={2}
                    sx={{
                      borderBottom: '1px solid ' + theme.palette.main_grey.gray600
                    }}
                    alignItems={'center'}
                  >
                    {mdUp ? (
                      <>
                        <Grid item xs={1.5} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {moment(i.createdAt).format('YYYY.MM.DD - HH:mm')}
                          </Typography>
                        </Grid>
                        <Grid item xs={1.5} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {!!i.completedAt ? moment(i.completedAt).format('YYYY.MM.DD - HH:mm') : '-'}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {listBank?.find((item: IBank) => item.code == i.bankName)?.name || '-'}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {`멘토링-${
                              i.productContent.product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
                                ? '20분 영상 멘토링'
                                : i.productContent.product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
                                ? '40분 영상 멘토링'
                                : '1시간 대면 멘토링'
                            }-${i.user.nickname}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={1.5} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {formatCurrency(i.order.totalAmount)}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {i.mentoringTransactionStatus === MENTOR_TRANSACTION_STATUS.PENDING
                              ? '대기'
                              : i.mentoringTransactionStatus === MENTOR_TRANSACTION_STATUS.COMPLETE
                              ? '지급'
                              : i.mentoringTransactionStatus === MENTOR_TRANSACTION_STATUS.CANCELED
                              ? '취소'
                              : '-'}
                          </Typography>
                        </Grid>
                        <Grid item xs={1.5} display='flex' alignItems={'center'}>
                          <Typography cate='body_20' width={'100%'} textAlign={'center'}>
                            {formatCurrency(i.order.feeAmount)}
                          </Typography>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={8}>
                          <Typography cate='sub_title_20' width={'100%'} textAlign={'left'}>
                            {`멘토링 - ${
                              i.productContent.product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
                                ? '20분 영상'
                                : i.productContent.product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
                                ? '40분 영상'
                                : '1시간 대면'
                            } - ${i.user.nickname}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                          <OutlinedIconButton
                            sx={{ p: 1.5, borderColor: theme.palette.main_grey.gray500 }}
                            onClick={() => {
                              setSelectedTransaction(i)
                              onOpenInfoDialog()
                            }}
                          >
                            <Typography cate='button_10' width={'100%'} textAlign={'center'} color={color_gray[200]}>
                              세부내역
                            </Typography>
                          </OutlinedIconButton>
                        </Grid>
                      </>
                    )}
                  </Grid>
                )
              })}
            </Box>
            {!!resData?.result && resData?.result.length > 0 && (
              <Pagination action={handlePageChange} page={page} count={resData?.metaData?.totalPages || 0} />
            )}
          </>
        )}
        <Box
          width={'100%'}
          py={3}
          px={2}
          border={'1px solid ' + color_gray[600]}
          borderRadius={1}
          gap={2}
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography cate='sub_title_30'>안내사항</Typography>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography color={color_gray[200]} cate='body_20'>
              • 판매 금액에서 1) 서비스 이용료를 제외한 금액의 90%를 정산해드리며 2) 부가세를 제한 금액 중 소득세(3%),
              주민세(0.3%)를 원천징수한 후 지급해드립니다.
            </Typography>
            <Typography color={color_gray[200]} cate='body_20'>
              • 매달 1일부터 말일까지 기간 내에서 이루어진 판매 금액이 정산됩니다.
            </Typography>
            <Typography color={color_gray[200]} cate='body_20'>
              • 정산 신청 이후 슘페터에 세금계산서 발급은 [마이페이지 - 결제관리]에서 확인할 수 있어요.{' '}
            </Typography>
            <Typography color={color_gray[200]} cate='body_20'>
              • 멘토님의 귀책사유로 문제가 발생할 경우, 해당 금액을 제한 후 지급할 수 있습니다. 또한, 허위 등록 또는
              허위거래 여부가 의심되는 거래의 내역을 확인하기 위해 최대 60일까지 정산 금액의 지급을 보류할 수 있습니다.
            </Typography>
          </Box>
        </Box>
        <InfoPopup
          open={infoDialogOpen}
          onCancel={onCloseInfoDialog}
          {...selectedTransaction}
          bankName={listBank?.find((item: IBank) => item.code == selectedTransaction?.bankName)?.name || '-'}
          id={undefined as never}
        />
      </Box>
    </>
  )
}

export default SettlementTable
