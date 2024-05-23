import { ENUM_LAYOUT } from '@/constants/common.constant'

export interface IConfigsColors {
  result: [
    {
      id: number
      colorCode: string
      colorValue: string
      colorName: string
    }
  ]
  metaData: {
    currentPage: number
    firstPage: number
    lastPage: number
    nextPage: number
    pageSize: number
    previousPage: number
    totalRecords: number
    totalPages: number
  }
}

export interface FontData {
  id: number
  fontCode: string
  fontName: string
  fileName: string
  fontUrl: string
  fontSize: string
}

export interface IConfigsFonts {
  data: FontData[]
}

export interface IDataPostEditIR {
  projectId: number
  colorId?: number
  fontId?: number
  layout?: string
}

export interface IDataPostEditIRResult {
  data?: {
    id: number
    createdAt: string
    updatedAt: string
    projectId: number
    colorId: number
    color: {
      id: number
      colorCode: string
      colorValue: string
      colorName: string
    }
    fontId: number
    font: {
      id: number
      fontCode: string
      fontName: string
      fileName: string
      fontUrl: string
      fontSize: string
    }
    layout: string
  }
  error?: any
}

export interface IConfigsIRDeckProject {
  id: number
  createdAt: string
  updatedAt: string
  projectId: number
  colorId: number
  color: {
    id: number
    colorCode: string
    colorValue: string
    colorName: string
  }
  fontId: number
  font: {
    id: number
    fontCode: string
    fontName: string
    fileName: string
    fontUrl: string
    fontSize: string
  }
  layout: keyof typeof ENUM_LAYOUT
}
