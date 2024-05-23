import { ORDER_CATEGORIES } from './order.type'
import { TProductContent } from './product.type'
import { IUser } from './user.type'

export enum PAYMENT_TYPE {
  USER = 'USER',
  CONTENT = 'CONTENT',
  EVENT = 'EVENT',
  STARTUP_TALK = 'STARTUP_TALK',
  MENTORING = 'MENTORING',
  CERTIFICATION = 'CERTIFICATION',
  USER_PREMIUM = 'USER_PREMIUM'
}

interface Product {
  name: string
  quantity: number
  unitAmount: number
  currency: string
  description: string
}

interface Shipping {
  fullName?: string
  address?: Address
}

interface Address {
  country: string
  line1?: string
  line2?: string
  area1?: string
  area2: string
  postalCode?: string
}

interface EscrowProduct {
  id: string
  code: string
  name: string
  unitPrice: number
  quantity: number
}

export type MobileCarrier = 'KT' | 'LGU' | 'SKT' | 'HELLO' | 'KCT' | 'SK7'

interface PaymentMethodOptions {
  paypal?: {
    setTransactionContext: any
  }
}

interface BasePaymentInfo {
  orderId: string
  orderName: string
  customerEmail?: string
  customerName?: string
  appScheme?: string
  taxFreeAmount?: number
  taxExemptionAmount?: number
  cultureExpense?: boolean
  useEscrow?: boolean
  escrowProducts?: EscrowProduct[]
  customerMobilePhone?: string
  showCustomerMobilePhone?: boolean
  mobileCarrier?: MobileCarrier[]
  products?: Product[]
  shipping?: Shipping
  paymentMethodOptions?: PaymentMethodOptions
  useInternationalCardOnly?: boolean
}

export interface PaymentInfo extends BasePaymentInfo {
  successUrl?: string
  failUrl?: string
}

export interface Card {
  amount: number
  issuerCode: string
  acquirerCode: string
  number: string
  installmentPlanMonths: number
  isInterestFree: boolean
  interestPayer: any
  approveNo: string
  useCardPoint: boolean
  cardType: string
  ownerType: string
  acquireStatus: string
}

///=============================CREATE PAYMENT===============================

export interface CreatePaymentPayload {
  paymentInfo: PaymentInfo
  card: Card
  amount: number
  orderId: string
  orderName: string
  returnUrl: string
  flowMode: string
  easyPay?: string
  cardCompany?: string
  confirmationMethod?: 'MANUAL' | 'AUTOMATIC'
  appScheme?: string
}

export interface CreatePaymentResponse {
  mId: string
  lastTransactionKey: any
  paymentKey: string
  orderId: string
  orderName: string
  taxExemptionAmount: number
  status: string
  requestedAt: string
  approvedAt: any
  useEscrow: any
  cultureExpense: boolean
  card: any
  virtualAccount: any
  transfer: any
  mobilePhone: any
  giftCertificate: any
  cashReceipt: any
  cashReceipts: any
  discount: any
  cancels: any
  secret: any
  type: string
  easyPay: any
  country: string
  failure: any
  isPartialCancelable: boolean
  receipt: any
  checkout: Checkout
  currency: string
  totalAmount: number
  balanceAmount: number
  suppliedAmount: number
  vat: number
  taxFreeAmount: number
  method: any
  version: string
}

export interface Checkout {
  url: string
}

///=============================CONFIRM PAYMENT===============================

export interface ConfirmPaymentPayload {
  paymentKey: string
  orderId: string
  amount: number
}

export type TVirtualAccount = {
  accountNumber: string
  accountType: string
  bankCode: string
  customerName: string
  dueDate: string
  expired: boolean
  settlementStatus: string
  refundStatus: string
  refundReceiveAccount: string
}

export interface ConfirmPaymentTossResponse {
  mId: string
  version: string
  lastTransactionKey: string
  paymentKey: string
  orderId: string
  orderName: string
  currency: string
  method: string
  status: string
  requestedAt: string
  approvedAt: string
  useEscrow: boolean
  cultureExpense: boolean
  card: Card
  virtualAccount: TVirtualAccount
  transfer: any
  mobilePhone: any
  giftCertificate: any
  cashReceipt: any
  cashReceipts: any
  receipt: Receipt
  checkout: Checkout
  discount: any
  cancels: any
  secret: any
  type: string
  easyPay: any
  country: string
  failure: any
  totalAmount: number
  balanceAmount: number
  suppliedAmount: number
  vat: number
  taxFreeAmount: number
  taxExemptionAmount: number
}

export interface Receipt {
  url: string
}

export interface Checkout {
  url: string
}

///=============================CANCEL PAYMENT===============================

export interface CancelPaymentPayload {
  paymentKey: string
  orderId: string
  cancelReason: string
  cancelAmount: number
  refundReceiveAccount?: RefundReceiveAccount
  taxFreeAmount?: number
  currency?: number
  refundableAmount?: number
}

export interface RefundReceiveAccount {
  bank: string
  accountNumber: string
  holderName: string
}

export interface CancelPaymentTossReponse {
  mId: string
  version: string
  lastTransactionKey: string
  paymentKey: string
  orderId: string
  orderName: string
  currency: string
  method: string
  status: string
  requestedAt: string
  approvedAt: string
  useEscrow: boolean
  cultureExpense: boolean
  checkout: Checkout
  card: Card
  virtualAccount: any
  transfer: any
  mobilePhone: any
  giftCertificate: any
  cashReceipt: any
  cashReceipts: any
  discount: any
  cancels: Cancel[]
  secret: any
  type: string
  easyPay: string
  country: string
  failure: any
  totalAmount: number
  balanceAmount: number
  suppliedAmount: number
  vat: number
  taxFreeAmount: number
  taxExemptionAmount: number
}

export interface Checkout {
  url: string
}

export interface Cancel {
  cancelReason: string
  canceledAt: string
  cancelAmount: number
  taxFreeAmount: number
  taxExemptionAmount: number
  refundableAmount: number
  easyPayDiscountAmount: number
  transactionKey: string
  receiptKey: string
  cancelStatus: string
  cancelRequestId: any
}

///=============================UPGRADE-PACKAGE===============================

export enum PACKAGE_TYPE {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  DAY = 'DAY'
}

export type TUpgradePackagePayload = {
  quantity: number
  type: PACKAGE_TYPE
  orderId: number
}

///=============================APPROVE PAYMENT===============================

export interface ApproveOrderPayload {
  paymentKey: string
}

export enum PLAN_PERIOD {
  MONTH = 'PUMO',
  YEAR = 'PUYE'
}

export type TSubscriptionFeature = {
  content: string
  highlight: boolean
}

export enum PAYMENT_STATUS {
  WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
  DONE = 'DONE',
  DEPOSIT_DONE = 'DEPOSIT_DONE',
  REQUEST_CANCELED = 'REQUEST_CANCELED',
  CANCELED = 'CANCELED',
  PARTIAL_CANCELED = 'PARTIAL_CANCELED'
}

export type PaymentSuccessResponse = {
  status: PAYMENT_STATUS
  type: ORDER_CATEGORIES
  buyerName: string
  buyerEmail: string
  buyerPhoneNumber: string
  receipt: string
  TPG_orderId: string
  TPG_orderName: string
  TPG_lastTransactionKey: string
  TPG_paymentKey: string
  userId: number
  productId: number
  orderId: number
  quantity: number
  price: number
  totalAmount: number
  lastTotalAmount: number
  country: string
  currency: string
  payload: ConfirmPaymentTossResponse
  deletedAt: string
  postcode: string
  address: string
  addressDetail: string
  isWaitingForDeposit: boolean
  isRequestForRefund: boolean
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  productContent: TProductContent
  data: {
    data: any
  }
  meta?: {
    [k: string]: any
  }
}

export enum PAYMENT_TAB {
  SUBCRIPTION = 'SUBCRIPTION',
  HISTORY = 'HISTORY',
  COUPON = 'COUPON'
}

export enum CANCELLATION_REASONS {
  SERVICE_DISSATISFACTION = 'SERVICE_DISSATISFACTION',
  CHANGE_MY_MIND = 'CHANGE_MY_MIND',
  DIFFERENCE_PRODUCT_INFO = 'DIFFERENCE_PRODUCT_INFO',
  OTHER = 'OTHER'
}

////============================== Payment History ========================

export interface PaymentHistory {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  status: string
  statusRefund: string
  type: string
  buyerName: string
  buyerEmail: string
  buyerPhoneNumber: null
  postcode: null
  address: null
  addressDetail: null
  receipt: string
  isWaitingForDeposit: boolean
  TPG_orderId: string
  TPG_orderName: string
  TPG_lastTransactionKey: string
  TPG_paymentKey: string
  userId: number
  productId: number
  orderId: number
  quantity: number
  price: number
  totalAmount: number
  lastTotalAmount: number
  country: string
  currency: string
  payload: Payload
  isRequestForRefund: boolean
  cancelReason: string
  reasonNotRefund: null
  cancelAmount: null
  estimatedNonRefundAmount: number | null
  isRefundPossible: boolean
  product: ProductPaymentHistory
  user: IUser
  order: Order
  no: number
}

export interface ProductPaymentHistory {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  status: string
  type: string
  code: string
  name: string
  subName: string | null
  description: string | null
  price: number
  isSale: boolean
  hasSettlement: boolean
  userId: number
  productContents: ProductContent[]
  user: IUser
}

export interface ProductContent {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  type: string
  code: string
  productId: number
  eventId: number
  mentoringId: number | null
  courseId: number | null
  orderId: number | null
}

export interface Order {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  status: string
  type: string
  paymentMethod: string
  name: string
  email: string
  phoneNumber: null
  TPG_OrderId: string
  userId: number
  productId: number
  quantity: number
  price: number
  totalAmount: number
  totalAmountDiscount: number
  couponPayload: null
  lastTotalAmount: number
  couponId: null
  tax: null
  note: string
  code: string
  paymentKey: string
  postcode: null
  address: null
  addressDetail: null
  phSuccessId: number
  eventId: null
  eventApplicationsId: null
  courseId: number
  courseApplicationId: number
  mentoringId: null
  mentoringApplicationId: null
  productContentId: number
  fee: number
  feeAmount: number
  isUsed: boolean
  usedAt: Date
  meta: null
  coupon: null
}

export interface Payload {
  mId: string
  lastTransactionKey: string
  paymentKey: string
  orderId: string
  orderName: string
  taxExemptionAmount: number
  status: string
  requestedAt: Date
  approvedAt: Date
  useEscrow: boolean
  cultureExpense: boolean
  card: Card
  virtualAccount: VirtualAccount
  transfer: null
  mobilePhone: null
  giftCertificate: null
  cashReceipt: null
  cashReceipts: null
  discount: null
  cancels: null
  secret: string
  type: string
  easyPay: null
  country: string
  failure: null
  isPartialCancelable: boolean
  receipt: Checkout
  checkout: Checkout
  currency: string
  totalAmount: number
  balanceAmount: number
  suppliedAmount: number
  vat: number
  taxFreeAmount: number
  method: string
  version: Date
}

export interface VirtualAccount {
  accountNumber: string
  accountType: string
  bankCode: string
  customerName: string
  dueDate: Date
  expired: boolean
  settlementStatus: string
  refundStatus: string
  refundReceiveAccount: null
}

export type TAdditionalMeta = { meta?: { [k: string]: any } }

export enum PAYMENT_METHOD {
  CARD = '카드 결제',
  VIRTUAL_ACCOUNT = '가상계좌',
  EASY_PAY = '간편결제',
  MOBILE_PHONE = '휴대폰',
  TRANSFER = '계좌이체',
  GIFT_CERTIFICATE = '상품권',
  CASH_RECEIPT = '현금 영수증',
  CULTURE_GIFT_CERTIFICATE = '문화 상품권',
  BOOK_GIFT_CERTIFICATE = '도서문화상품권',
  GAME_GIFT_CERTIFICATE = '게임문화상품권'
}
