import yup from '@/services/yup.service'
import { PROJECT_REPORT_FEEDBACK } from '../enums'

export interface TFeedBacks {
  id: number
  no: number
  projectId: number
  totalReports: number
  userId: number
  content: string
  createdAt: string
  isReported: boolean
  updatedAt: string
  user: {
    id: number
    username: string
    nickname: string
    email: string
    avatarUrl?: string
  }
}

export const OPTION_REPORT_FEEDBACK = [
  {
    lable: '영리목적/홍보성',
    value: PROJECT_REPORT_FEEDBACK.COMMERCIAL_PURPOSE_PUBLICITY
  },
  {
    lable: '개인정보 노출',
    value: PROJECT_REPORT_FEEDBACK.PRIVACY_DISCLOSURE
  },
  {
    lable: '불법정보',
    value: PROJECT_REPORT_FEEDBACK.ILLEGAL_INFORMATION
  },
  {
    lable: '음란성/선정성',
    value: PROJECT_REPORT_FEEDBACK.OBSCENITY_SUGGESTIBILITY
  },
  {
    lable: '욕설/인신공격',
    value: PROJECT_REPORT_FEEDBACK.ABUSIVE_LANGUAGE_PERSONAL_ABUSE
  },
  {
    lable: '아이디/DB거래',
    value: PROJECT_REPORT_FEEDBACK.ID_DB_TRANSACTION
  },
  {
    lable: '같은 내용 반복(도배)',
    value: PROJECT_REPORT_FEEDBACK.REPEAT_SAME_CONTENT
  },
  {
    lable: '기타',
    value: PROJECT_REPORT_FEEDBACK.OTHER
  }
]

export interface TReportFeedbackForm {
  content?: string
  category: PROJECT_REPORT_FEEDBACK
}

export const ReportFeedbackYup = yup.object().shape({
  content: yup.string(),
  category: yup.string().required(' ').oneOf(Object.values(PROJECT_REPORT_FEEDBACK))
})
