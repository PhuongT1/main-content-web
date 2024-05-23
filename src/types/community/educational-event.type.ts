import {
	EDUCATIONAL_EVENT_TYPE,
	EVENT_APPLICATION_TYPE,
	EVENT_STATUS,
	EVENT_STATUS_RECRUITMENT
} from '@/constants/community/educational-event.constant'
import { TOrder } from '../order.type'
import { TProductContent } from '../product.type'
import { Category, Hashtag, TImage } from '../types.type'
import { TUser } from '../user.type'

export interface EventList {
	id: number
	uuid: string
	createdAt: string
	updatedAt: string
	deletedAt: null
	type: string
	eventId: number
	nickname: string
	phoneNumber: string
	email: string
	companyName: null
	idea: null
	attachmentId: null
	cancelDate: string
	hasRequestCancel: boolean
	userId: number
	orderId: number
	event: TEvent
	order: TOrder
	attachment: TImage
	user: TUser
	typeFormat: string
	no: number
}

export type TEvent = {
	applicationType: EVENT_APPLICATION_TYPE
	id: number
	uuid: string
	createdAt: string
	updatedAt: string
	deletedAt: null
	status: EVENT_STATUS
	statusRecruitment: EVENT_STATUS_RECRUITMENT
	type: EDUCATIONAL_EVENT_TYPE
	code: string
	title: string
	categoryId: number
	startTime: string
	endTime: string
	startTimeRegistration: string
	endTimeRegistration: string
	hasLimitNumberAttendance: boolean
	hasCancelRequest: boolean
	numberAttendance: number
	hasWaitingStatus: boolean
	isFree: boolean
	price: number
	thumbnailId: number
	content: string
	url: string
	companyStatus: string
	totalBookmark: number
	isBookmark: boolean
	category: Category
	hashtags: Hashtag[]
	orders: TOrder[]
	thumbnail: TImage
	attachments: TImage[]
	numberOfParticipants: string
	deadlineDate: string
	no: number
	productContent: TProductContent
	statusRecruitmentFormat: string
}

export type TabValue = 'APPLICANT' | 'CANCEL'

export type TabLabel = '전체' | '신청' | '취소'

export interface IDataTab {
	label: TabLabel | string
	value: TabValue | string
}

export type TSupportEvent = {
	postsn: string
	biztitle: string
	supporttype: string
	title: string
	areaname: string
	organizationname: string
	posttarget: string
	posttargetage: string
	posttargetcomage: string
	startdate: string
	enddate: string
	insertdate: string
	viewcount: string
	detailurl: string
	prchCnadrNo: string
	sprvInstClssCdNm: string
	bizPrchDprtNm: string
	blngGvdpCdNm: null
	deadlineDate: string
	no: number
}
