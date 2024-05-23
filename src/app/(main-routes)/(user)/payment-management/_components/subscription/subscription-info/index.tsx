'use client'
import { SubscriptionBadgeImg } from '@/assets/images'
import { Card } from '@/components'
import { PREMIUM_FEATURES } from '@/constants/payment.constant'
import { BaseImage, DesignedPrimaryButton, DesignedSecondaryButton, Typography } from '@/elements'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getRemainDays, res2ui } from '@/utils/date'
import { Box } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import SubscriptionFeatures from '../subscription-features'

const SubscriptionInfo = () => {
  const { user } = useUserProfile()
  const router = useRouter()
  const { upgradePackageValidDate = '', upgradePackageStartDate = '' } = user || {}
  const remainDays = getRemainDays(moment(upgradePackageStartDate), moment(upgradePackageValidDate))

  // const onAgreeCancel = () => {
  //   onCloseCancel()
  //   onOpenRefund()
  // }

  // const onCancelPremium = () => {
  //   console.log('cancel')
  //   onCloseRefund()
  //   onOpenSuccess()
  // }

  return (
    <>
      <Box
        mt={{
          md: 0,
          xs: 1
        }}
        display={'flex'}
        flexDirection={{
          md: 'row',
          xs: 'column'
        }}
        gap={3}
      >
        <Card
          sx={{
            px: {
              md: 4.5,
              xs: 4
            },
            py: {
              md: 7.5,
              xs: 4
            },
            width: '100%',
            maxWidth: 576,
            height: 371,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box width={128} height={167} flexShrink={0}>
            <BaseImage
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 10
              }}
              src={SubscriptionBadgeImg}
              alt={`SubscriptionBadgeImg`}
            />
          </Box>
          <Box textAlign={'center'}>
            <Typography cate='title_50' plainColor={'base_gray.100'}>
              현재{' '}
              <Typography component={'span'} cate='title_50' plainColor={'blue.500'}>
                {"‘프리미엄'"}
              </Typography>{' '}
              이용권을 사용중입니다
            </Typography>
            <Box mt={1.5}>
              <Typography cate='body_30' plainColor='base_gray.100'>
                사용 기간: {res2ui(upgradePackageStartDate)} ~ {res2ui(upgradePackageValidDate)} ({remainDays}일 남음)
              </Typography>
            </Box>
          </Box>
        </Card>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          minHeight={{
            md: 371,
            xs: 464
          }}
          flexGrow={1}
          p={4}
          border={1}
          borderRadius={4}
          borderColor={'base_gray.600'}
          flexDirection={'column'}
        >
          <Box>
            <Typography cate='title_50' plainColor='base_gray.100'>
              프리미엄 이용권 사용 혜택
            </Typography>
            <SubscriptionFeatures
              sx={{
                mt: 4
              }}
              list={PREMIUM_FEATURES}
            />
          </Box>
          <Box
            display={'flex'}
            flexDirection={{
              md: 'row',
              xs: 'column'
            }}
            gap={2}
            mt={{
              md: 0,
              xs: 4
            }}
          >
            {/* TODO: Sprint 5 */}
            <DesignedSecondaryButton
              onClick={() => router.push('/startup/referent-room')}
              btnSize='designed-md'
              sx={{ height: 56 }}
              fullWidth
            >
              자료실 이용하기
            </DesignedSecondaryButton>
            <DesignedPrimaryButton link='/project-home' btnSize='designed-md' sx={{ height: 56 }} fullWidth>
              프로젝트 이용하기
            </DesignedPrimaryButton>
          </Box>
        </Box>
      </Box>
      {/* <Box mt={3} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
        <Typography>구독해지를원하시나요？</Typography>
        <DesignedLinkButton onClick={onOpenCancel} fitContent>
          구독 해지
        </DesignedLinkButton>
      </Box> */}
      {/* <Dialog
        PaperProps={{
          sx: {
            maxWidth: 560,
            width: '100%'
          }
        }}
        open={openCancel}
      >
        <CancelSubscriptionModal {...{ onAgreeCancel, onCloseCancel }} />
      </Dialog> */}
      {/* <Dialog
        PaperProps={{
          sx: {
            maxWidth: 560,
            width: '100%'
          }
        }}
        open={openRefund}
      >
        <ExpectedRefundModal {...{ onCancelPremium, onCloseRefund }} />
      </Dialog> */}
      {/* <TrashAlert
        title='이용권 해지가 완료되었습니다.'
        description={
          <>
            카드사에 따라 환불시기가 상이할 수 있으며,
            <br />
            업무일 기준 2주일 이내 환부됩니다.
          </>
        }
        onCancel={onCloseSuccess}
        onSubmit={onCloseSuccess}
        open={cancelSuccess}
        submitTxt='닫기'
        cancelTxt='내역 확인'
      /> */}
    </>
  )
}

export default SubscriptionInfo
