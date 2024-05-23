import { SecondaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { convertToRem } from '@/utils/convert-to-rem'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import SectionBox from '../../_components/SectionBox'
import { useQuery } from '@tanstack/react-query'
import { getMyMentorProfile, getMyMentorRevenue } from '@/services/mentoring.service'
import { formatCurrency } from '@/utils/format-currency'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import moment from 'moment'
import { IMentorProfile, IMentorRevenue } from '@/types/mentoring.type'
import UpdateBankAccountPopup from './_components/update-bank-account-popup'
import { formatPhoneNumber } from '@/utils/format-phone-number'
import { IBank, getBankList } from '@/services/common.service'
import { color_gray } from '@/themes/system-palette'

const PaymentStatistic = ({ sumOfAllTime, sumOfMonth, today }: IMentorRevenue) => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const [key, setKey] = useState(Math.random().toString())
  const userData = useRecoilValue(userAtom)
  const { open: bankAccountOpen, onClose: onCloseBankAccountDialog, onOpen: onOpenBankAccountDialog } = useDialog()
  // const [hydrate, setHydrate] = useState(false)
  const pathname = getCurrentUrl()

  const { data: mentorProfile, refetch: refetchProfile } = useQuery({
    queryKey: ['my-mentoring-profile'],
    queryFn: () => getMyMentorProfile()
  })
  const { data: listBankAccounts } = useQuery({
    queryKey: ['list-bank'],
    queryFn: () => getBankList()
  })
  useHydrate()
  // useEffect(() => {
  //   setHydrate(true)
  // }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  return (
    <Box width={'100%'} display={'flex'} flexDirection={lgUp ? 'row' : 'column'} gap={3} marginLeft={0}>
      <Box width={'100%'} paddingLeft={0 + ' !important'}>
        <Typography cate={lgUp ? 'title_60' : 'title_50'} mb={lgUp ? 3 : 2} textAlign={'left'}>
          종합정산
        </Typography>
        <SectionBox
          p={lgUp ? 3 : 2}
          gap={2.5}
          display={'flex'}
          flexDirection='column'
          height={mdUp ? convertToRem(188) : convertToRem(148)}
          justifyContent={'flex-start'}
        >
          <Box display={'flex'} alignItems={'center'} justifyContent='space-between'>
            <Typography cate={lgUp ? 'body_40' : 'body_30'} plainColor='sub.orange600'>
              누적 정산금액
            </Typography>
            <Typography cate={lgUp ? 'title_50' : 'sub_title_40'} plainColor='sub.orange600'>
              {!!sumOfAllTime ? formatCurrency(sumOfAllTime) : 0}원
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'flex-start'} justifyContent='space-between'>
            <Typography cate={lgUp ? 'body_40' : 'body_30'}>이번달 정산 금액</Typography>
            <Box display={'flex'} flexDirection='column' alignItems='flex-end' gap={1}>
              <Typography cate={lgUp ? 'title_50' : 'sub_title_40'}>
                {!!sumOfMonth ? formatCurrency(sumOfMonth) : 0}원
              </Typography>
              <Typography cate={'body_30'} color={color_gray[300]}>
                지급 예정일 {moment(today).format('YYYY.MM.DD')}
              </Typography>
            </Box>
          </Box>
        </SectionBox>
      </Box>
      <Box width={'100%'} paddingLeft={0 + ' !important'}>
        <Typography cate={lgUp ? 'title_60' : 'title_50'} mb={lgUp ? 3 : 2} textAlign={'left'}>
          지급계좌
        </Typography>
        <SectionBox
          px={lgUp ? 3 : 2}
          py={2}
          gap={2.5}
          height={lgUp ? convertToRem(188) : 'auto'}
          display={'flex'}
          flexDirection='column'
          justifyContent={'flex-start'}
        >
          <Box display={'flex'} alignItems={'center'} justifyContent='space-between'>
            <Typography cate={'body_40'}>현재 등록 계좌</Typography>
            <SecondaryButton
              sx={{ borderRadius: 1000, width: 'auto', padding: 1.5 }}
              onClick={() => {
                onOpenBankAccountDialog()
              }}
            >
              <Typography cate={'button_3_semibold'} color={color_gray[200]}>
                {!mentorProfile?.data?.bankAccountName &&
                !mentorProfile?.data?.bankAccountNumber &&
                !mentorProfile?.data?.bankName
                  ? '계좌 등록하기'
                  : '지급 계좌 변경'}
              </Typography>
            </SecondaryButton>
          </Box>
          {!mentorProfile?.data?.bankAccountName &&
          !mentorProfile?.data?.bankAccountNumber &&
          !mentorProfile?.data?.bankName ? (
            <Box display='flex' justifyContent={'center'} height='100%' alignItems='center'>
              <Typography cate='body_20' color={color_gray[300]}>
                계좌를 등록해 주세요
              </Typography>
            </Box>
          ) : (
            <Grid container borderRadius={1} border={'1px solid ' + theme.palette.main_grey.gray700}>
              <Grid
                item
                xs={12}
                lg={4}
                display='flex'
                flexDirection='column'
                borderRight={'1px solid ' + theme.palette.main_grey.gray700}
              >
                <Box
                  py={1.5}
                  sx={{ backgroundColor: theme.palette.main_grey.gray700 }}
                  display='flex'
                  justifyContent={'center'}
                >
                  <Typography cate={'sub_title_20'}>예금주</Typography>
                </Box>
                <Box py={1.75} display='flex' justifyContent={'center'}>
                  <Typography cate={'body_20'}>{mentorProfile?.data?.bankAccountName || '-'}</Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                display='flex'
                flexDirection='column'
                borderRight={'1px solid ' + theme.palette.main_grey.gray700}
              >
                <Box
                  py={1.5}
                  sx={{ backgroundColor: theme.palette.main_grey.gray700 }}
                  display='flex'
                  justifyContent={'center'}
                >
                  <Typography cate={'sub_title_20'}>은행</Typography>
                </Box>
                <Box py={1.75} display='flex' justifyContent={'center'}>
                  <Typography cate={'body_20'}>
                    {mentorProfile?.data?.bankName
                      ? listBankAccounts?.data?.banks?.find((i: IBank) => i.code == mentorProfile?.data?.bankName)?.name
                      : '-'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={4} display='flex' flexDirection='column'>
                <Box
                  py={1.5}
                  sx={{ backgroundColor: theme.palette.main_grey.gray700 }}
                  display='flex'
                  justifyContent={'center'}
                >
                  <Typography cate={'sub_title_20'}>계좌번호</Typography>
                </Box>
                <Box py={1.75} display='flex' justifyContent={'center'}>
                  <Typography
                    cate={'body_20'}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {mentorProfile?.data?.bankAccountNumber
                      ? formatPhoneNumber(mentorProfile?.data?.bankAccountNumber?.toString() || '0')
                      : '-'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </SectionBox>
        <UpdateBankAccountPopup
          bankAccountName={mentorProfile?.data?.bankAccountName || ''}
          bankName={mentorProfile?.data?.bankName || ''}
          bankAccountNumber={mentorProfile?.data?.bankAccountNumber || ''}
          open={bankAccountOpen}
          onSubmit={() => {
            refetchProfile()
            onCloseBankAccountDialog()
          }}
          onCancel={() => {
            onCloseBankAccountDialog()
          }}
        />
      </Box>
    </Box>
  )
}

export default PaymentStatistic
