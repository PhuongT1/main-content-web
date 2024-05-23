'use client'
import { Pagination } from '@/components'
import { TablePayment } from '@/components/table'
import { DATE_FORMAT } from '@/constants/common.constant'
import { SecondaryButton, Select, Typography } from '@/elements'
import SearchInput from '@/elements/v2/input/search-input'
import MenuItem from '@/elements/v2/menu-item'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { useDialog } from '@/hooks/use-dialog'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { getPaymentHistory } from '@/services/payment/payment.service'
import { PaymentHistory } from '@/types/payment.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { SelectChangeEvent, Stack, useMediaQuery, useTheme } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { COLUMN_PAYMENT_HISTORY } from '../_utils/column'
import { IPaymentHistoryRequest, productCateDropdown } from '../_utils/type'
import PaymentDetailDialog from './_component/payment-detail-dialog'
import PaymentHistoryCard from './_component/payment-history-card'
import PaymentReceiptDialog from './_component/payment-receipt-dialog'
import RefundDialog from './_component/refund-dialog'

const PaymentHistory = () => {
  const queryData = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const mdDown = useMediaQuery('(max-width: 768px)')
  const {
    palette: { main_grey, home }
  } = useTheme()
  const [page, setPage] = useState<number>(1)
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: undefined, endDate: undefined })
  const [searchKeyword, setSearchKeyword] = useState<string>(queryData.get('name') || '')
  const [historyRequest, setHistoryRequest] = useState<IPaymentHistoryRequest>({ page: page, limit: 8 })
  const [detail, setDetail] = useState<PaymentHistory>()
  const [receipt, setRecipt] = useState<string>()

  const { open: openDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDialog()
  const { open: openRefund, onOpen: onOpenRefund, onClose: onCloseRefund } = useDialog()
  const { open: openReceipt, onOpen: onOpenReceipt, onClose: onCloseReceipt } = useDialog()

  const { data: historyData, isFetching } = useQuery({
    queryKey: ['my-payment-history', historyRequest],
    queryFn: () => getPaymentHistory(historyRequest),
    placeholderData: keepPreviousData,
    select: (data) => {
      return data.data
    },
    meta: {
      offLoading: true
    }
  })

  const onChangePage = (page: number) => {
    setPage(page)

    setHistoryRequest({
      ...historyRequest,
      page: page
    })
  }

  const handleChangeDate = (dateRange: DateRange) => {
    setDateRange(dateRange)
  }

  const handleChangeCate = (event: SelectChangeEvent<unknown>) => {
    setSelectedValue(event.target.value as string)
  }

  const openDetailDialog = (id: number) => {
    if (historyData) {
      setDetail(historyData.result.find((val) => val.id === id))
      onOpenDetail()
    }
  }

  const openReceiptDialog = (url: string) => {
    console.log('click')
    setRecipt(url)
    onOpenReceipt()
  }

  const clearFilter = () => {
    setPage(1)
    setHistoryRequest({ page: 1, limit: 10 })
    router.push(pathName + '?type=HISTORY')
  }

  const applyFilter = () => {
    let newQuery = new URLSearchParams(queryData)
    setPage(1)

    if (!!dateRange.endDate && !!dateRange.startDate) {
      const fromDate = moment(dateRange.startDate).format('YYYY-MM-DD')
      const toDate = moment(dateRange.endDate).format('YYYY-MM-DD')
      newQuery.set('fromDate', fromDate)
      newQuery.set('toDate', toDate)
      setHistoryRequest(() => ({
        ...historyRequest,
        fromDate,
        toDate
      }))
    } else {
      if (!!newQuery.get('fromDate') || !!newQuery.get('toDate')) {
        newQuery.delete('fromDate')
        newQuery.delete('toDate')
        const { fromDate, toDate, ...rest } = historyRequest
        setHistoryRequest(rest)
      }
    }

    if (!!searchKeyword) {
      newQuery.set('name', searchKeyword.trim())
      setHistoryRequest({
        ...historyRequest,
        keySearch: 'productName',
        keyword: searchKeyword
      })
    } else {
      if (!!newQuery.get('name')) {
        newQuery.delete('name')
        const { keySearch, keyword, ...rest } = historyRequest
        setHistoryRequest(rest)
      }
    }

    if (selectedValue === '') {
      if (!!newQuery.get('cate')) {
        newQuery.delete('cate')
        const { type, ...rest } = historyRequest
        setHistoryRequest(rest)
      }
    } else {
      newQuery.set('cate', productCateDropdown.find((val) => selectedValue === val.value)?.value || '')
      setHistoryRequest({
        ...historyRequest,
        type: selectedValue
      })
    }

    router.push(`${pathName}?${newQuery}`)
  }

  useEffect(() => {
    setDateRange({
      startDate: queryData.get('fromDate') ? moment(queryData.get('fromDate')).toDate() : undefined,
      endDate: queryData.get('toDate') ? moment(queryData.get('toDate')).toDate() : undefined
    })
    setSelectedValue(queryData.get('cate') || '')
    setSearchKeyword(queryData.get('name') || '')
    setPage(Number(queryData.get('page')) || 1)
  }, [queryData])

  useEffect(() => {
    if (queryData.get('fromDate') && queryData.get('toDate')) {
      setHistoryRequest({
        ...historyRequest,
        fromDate: moment(queryData.get('fromDate')).format(DATE_FORMAT.DASH_REV),
        toDate: moment(queryData.get('toDate')).format(DATE_FORMAT.DASH_REV)
      })
    }

    if (queryData.get('cate')) {
      setHistoryRequest({
        ...historyRequest,
        type: queryData.get('cate') as string
      })
    }

    if (queryData.get('name')) {
      setHistoryRequest({
        ...historyRequest,
        keyword: queryData.get('name') as string,
        keySearch: 'productName'
      })
    }

    if (queryData.get('page')) {
      setHistoryRequest({
        ...historyRequest,
        page: Number(queryData.get('page'))
      })
    }
  }, [])

  return (
    <>
      <Stack gap={3}>
        <Stack direction={{ md: 'row', sm: 'column-reverse' }} justifyContent={'space-between'} width={'100%'} gap={3}>
          <Select
            placeholder='전체'
            displayEmpty
            value={selectedValue}
            sx={{ minWidth: convertToRem(140) }}
            renderValue={(value) => {
              if (value === '') {
                return (
                  <Typography cate='body_3' color={main_grey.gray300}>
                    전체
                  </Typography>
                )
              }
              return (
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography cate='body_3' color={main_grey.gray100} ml={1}>
                    {productCateDropdown.find((item) => item.value === selectedValue)?.label}
                  </Typography>
                </Stack>
              )
            }}
            onChange={(evt) => handleChangeCate(evt)}
          >
            {productCateDropdown.map((item, index) => (
              <MenuItem value={item.value} key={item.value + index}>
                <Typography cate='body_3' color={main_grey.gray100} ml={1}>
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          <Stack
            alignItems={{ md: 'center', sm: 'flex-start' }}
            direction={{ md: 'row', sm: 'column' }}
            gap={{ md: 2, sm: 1.5 }}
            flexWrap={'wrap'}
          >
            <Typography
              cate='sub_title_40'
              sx={{
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              결제일자
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
            <Stack direction={'row'} gap={1}>
              <SearchInput
                placeholder='Search'
                sx={{
                  width: { md: convertToRem(320), sm: '100%' }
                }}
                value={searchKeyword}
                onClear={() => setSearchKeyword('')}
                onChange={(e) => {
                  setSearchKeyword(e.target.value)
                }}
              />
              <SecondaryButton
                btnSize={'xs-np'}
                sx={{ minWidth: convertToRem(73), borderRadius: convertToRem(1000) }}
                onClick={applyFilter}
              >
                <Typography cate='button_20' plainColor='main_grey.gray200'>
                  조회
                </Typography>
              </SecondaryButton>
              <SecondaryButton
                btnSize={'xs-np'}
                sx={{ minWidth: convertToRem(73), borderRadius: convertToRem(1000) }}
                onClick={clearFilter}
              >
                <Typography cate='button_20' plainColor='main_grey.gray200'>
                  초기화
                </Typography>
              </SecondaryButton>
            </Stack>
          </Stack>
        </Stack>
        {historyData && (
          <Stack gap={3}>
            {mdDown ? (
              historyData.result.map((val, index) => (
                <PaymentHistoryCard key={index} data={val} onDetail={() => openDetailDialog(val.id)} />
              ))
            ) : (
              <TablePayment
                columns={COLUMN_PAYMENT_HISTORY({
                  openDetail: (id) => openDetailDialog(id),
                  openReceipt: (url) => openReceiptDialog(url)
                })}
                rows={historyData.result}
                isLoading={isFetching}
              />
            )}
            {historyData.result.length > 0 && historyData.metaData.totalPages > 1 && (
              <Pagination page={page} count={historyData.metaData.totalPages} action={onChangePage} />
            )}
          </Stack>
        )}
      </Stack>

      {/* Dialog section */}
      {detail && (
        <PaymentDetailDialog
          open={openDetail}
          detail={detail}
          onCSubmit={() => {
            onCloseDetail()
            onOpenRefund()
          }}
          onCancel={() => {
            onCloseDetail()
          }}
        />
      )}
      {detail && (
        <RefundDialog
          open={openRefund}
          detail={detail}
          onSubmit={() => {
            onCloseRefund()
          }}
          onCancel={() => {
            onCloseRefund()
          }}
        />
      )}
      <PaymentReceiptDialog
        open={openReceipt}
        receiptUrl={receipt ?? ''}
        onSubmit={() => {
          onCloseReceipt()
        }}
        onCancel={() => {
          onCloseReceipt()
        }}
      />
    </>
  )
}

export default PaymentHistory
