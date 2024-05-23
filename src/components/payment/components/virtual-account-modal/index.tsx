'use client'
import { PaymentSuccessImg } from '@/assets/images'
import { BANKS } from '@/constants/common.constant'
import { MENTORING_COURSE_NAME } from '@/constants/community/mentoring.constant'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { BaseImage, DesignedPrimaryButton, Typography } from '@/elements'
import { PaymentSuccessResponse } from '@/types/payment.type'
import { formatCurrency } from '@/utils/string'
import { Box } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const PaymentInfo = ({ title, value, isPrice }: { title: string; value: string; isPrice?: boolean }) => (
  <Box
    py={1.5}
    border={0}
    borderTop={1}
    borderColor={'base_gray.600'}
    sx={{
      borderStyle: 'dotted'
    }}
    display={'flex'}
    justifyContent={'space-between'}
  >
    <Typography cate='body_30' plainColor='base_gray.200'>
      {title}
    </Typography>
    <Typography cate={isPrice ? 'sub_title_30' : 'body_30'} plainColor='base_gray.100'>
      {value}
    </Typography>
  </Box>
)

type TVirtualAccountModal = {
  paymentResponse?: PaymentSuccessResponse
  backUrl: string
}

const VirtualAccountModal = ({ paymentResponse, backUrl }: TVirtualAccountModal) => {
  const router = useRouter()
  const { lastTotalAmount = 0, createdAt = '', price = 0, productContent, payload } = paymentResponse || {}
  const { name = '' } = productContent?.product || {}
  const { accountNumber, bankCode = '', customerName } = payload?.virtualAccount || {}
  const paymentDate = moment(createdAt).format('YYYY.MM.DD hh:mm')
  const originalPrice = formatCurrency(price)
  const finalPrice = formatCurrency(lastTotalAmount)
  const bankName = BANKS.find((i) => i.code == bankCode)?.bankName
  const onNavigate = (url: string) => {
    window.history.replaceState(null, '', url)
    router.push(url)
  }

  const getProductName = () => {
    //Case: Expert mentoring
    if (Object.values(MENTOR_PRODUCT_TYPE).includes(name as MENTOR_PRODUCT_TYPE)) {
      const courseName = MENTORING_COURSE_NAME.get(name as MENTOR_PRODUCT_TYPE) || ''
      return `${courseName} 화상멘토링`
    }
    //Product content name
    return name
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box width={78} height={78} flexShrink={0}>
          <BaseImage
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 10
            }}
            src={PaymentSuccessImg}
            alt={`congratulation`}
          />
        </Box>
        <Typography mt={2} cate='title_70' plainColor='base_gray.100'>
          결제가 완료되었습니다.
        </Typography>
        <Box mt={2} textAlign={'center'}>
          <Typography cate='body_30' plainColor='base_gray.200'>
            아래 가상계좌로 입금 해 주시면 정상적으로
          </Typography>
          <Typography>결제 완료처리가 됩니다.</Typography>
        </Box>
      </Box>
      <Box>
        <Box py={3} borderTop={1} borderColor={'base_gray.600'}>
          <Typography cate='body_30' plainColor='base_gray.200'>
            주문정보
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography mt={2.5} cate='body_30' plainColor='blue.500'>
                이용권
              </Typography>
              <Typography mt={0.5} cate='sub_title_40' plainColor='base_gray.100'>
                {getProductName()}
              </Typography>
            </Box>
            <Typography cate='sub_title_30' plainColor='base_gray.100' alignSelf={'flex-end'}>
              {originalPrice}
            </Typography>
          </Box>
        </Box>
        <Box py={3} borderTop={1} borderColor={'base_gray.600'}>
          <Typography cate='body_30' plainColor='base_gray.200'>
            가상계좌 정보
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography mt={2.5} cate='body_30' plainColor='blue.500'>
                계좌 정보
              </Typography>
              <Typography mt={0.5} cate='body_30' plainColor='base_gray.100'>
                {bankName} {accountNumber}
              </Typography>
              <Typography mt={0.5} cate='body_30' plainColor='base_gray.100'>
                {customerName}
              </Typography>
            </Box>
          </Box>
        </Box>
        <PaymentInfo isPrice value={finalPrice} title='총 결제 금액' />
        <PaymentInfo value={paymentDate} title='거래 일시' />
      </Box>
      <DesignedPrimaryButton
        onClick={() => onNavigate(backUrl ? backUrl : '/')}
        sx={{ height: 44, width: 120, ml: 'auto' }}
        btnSize='designed-sm'
      >
        확인
      </DesignedPrimaryButton>
    </Box>
  )
}

export default VirtualAccountModal
