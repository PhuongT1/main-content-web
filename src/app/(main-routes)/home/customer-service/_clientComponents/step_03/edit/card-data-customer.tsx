import GlassesIcon from '@/assets/icons/customer/glasses-icon'
import GlassesIcon2 from '@/assets/icons/customer/glasses-icon-2'
import HealthLeaveIcon from '@/assets/icons/customer/health-leave'
import RefreshVacationIcon from '@/assets/icons/customer/refresh-vacation'
import SmilingFaceWithSunglasses from '@/assets/icons/customer/smiling-face-with-sunglasses'
import SummerVacation from '@/assets/icons/customer/summer-vacation'
import VoluntaryVacationSystem from '@/assets/icons/customer/voluntary-vacation-system'
import WinterVacation from '@/assets/icons/customer/winter-vacation'
import { LiftStyle } from '@/types/customer-service.type'

const tabBrandCustomer = [
  { label: '전체', value: '전체' },
  { label: '음료/음식', value: '음료&음식' },
  { label: '의류/뷰티', value: '의류&뷰티' },
  { label: '여행', value: '여행' },
  { label: '전자/가전', value: '전자&가전' },
  { label: 'SNS', value: 'SNS' },
  { label: '이커머스', value: '이커머스' },
  { label: '온라인 서비스', value: '온라인 서비스' }
]

const PaymentMethodData = [
  { name: '현금', url: <GlassesIcon /> },
  { name: '체크카드', url: <GlassesIcon2 /> },
  { name: '신용카드', url: <GlassesIcon2 /> },
  { name: '모바일', url: <HealthLeaveIcon /> },
  { name: '계좌이체', url: <HealthLeaveIcon /> },
  { name: '가상화폐', url: <HealthLeaveIcon /> },
  { name: '상품권', url: <WinterVacation /> },
  { name: '포인트, 쿠폰', url: <WinterVacation /> }
] as LiftStyle[]

export { tabBrandCustomer, PaymentMethodData }
