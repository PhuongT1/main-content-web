export type noticeType = 'GUIDE' | 'NOTICE' | 'ADVERTISEMENT'

export interface INotice {
  category: noticeType
  title: string
  content: string
  startDate: Date | string | null
  endDate: Date | string | null
  updatedAt: Date | string | null
  createdAt: Date | string
  no: number
  viewNumber: number
  files: {
    fileName: string
    fileUrl: string
    fileSize: string
    fileType: string
    uploadId: number
  }[]
}
